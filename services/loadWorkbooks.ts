
import { addRxPlugin } from 'rxdb';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
addRxPlugin(RxDBAttachmentsPlugin);
import { RxDatabaseBaseExtended } from "rxdb-hooks/dist/plugins";
import { v4 as uuidv4 } from 'uuid';
import { SheetTableMap } from "./sheetTableMap";
import { FileCollection, FileDocument } from "../database/file-schema-types";
import { getJsonFromSheetName, getSheetNames, getWorkbookFromBlob, getYearFromWorkbook, getYearFromWorkbook2 } from "./xlsxProcessing";
import { FilingSoftware } from './software';

export function loadWorkbooks(collection: FileCollection, db: RxDatabaseBaseExtended) {
  getSelectedFiles(collection).then((files) => {

    const fileList = files.slice(0, 1);
    return processFiles(fileList);
  });

}

export async function getEstimatedYear2(fileDoc: FileDocument, software: string): Promise<string> {
  const found = FilingSoftware.find((fSoftware) => fSoftware.name === software);
  if (!found) return;

  const yearAccess = found.year;

  const attachment = fileDoc.getAttachment(fileDoc.attachmentId);
  const fileData = (await attachment.getData()) as Blob;

  const wb = await getWorkbookFromBlob(fileData);

  const workbookYears = getYearFromWorkbook2(wb, yearAccess);
  if (workbookYears.length === 1) return workbookYears[0];

  const fileYears = getYearFromName(fileDoc.fileName);
  if (fileYears.length === 1) return fileYears[0];

  return '';
}

export async function getEstimatedYear(file: File): Promise<string> {
  const wb = await getWorkbookFromBlob(file);

  const workbookYears = getYearFromWorkbook(wb, 'F460-A-Contribs', 'Rcpt_Date');
  const fileYears = getYearFromFileName(file);

  // console.log({workbookYears, fileYears});

  if (workbookYears.length === 1) return workbookYears[0];

  if (fileYears.length === 1) return fileYears[0];

  return '';
}

function getYearFromName(name: string) {
  return name.match(/\d+/g);
}

function getYearFromFileName(file: File) {
  return file.name.match(/\d+/g);
}

async function processSheet(workbook, sheetName: string, fileId: string, database) {
  const foundSheet = SheetTableMap
    .find((item) => item.sheetName === sheetName);

  if (!foundSheet) return;

  const jsonData = getJsonFromSheetName(workbook, sheetName);
  jsonData.forEach((row) => {
    row.id = uuidv4();
    row.fileId = fileId;
    row.lastModified = Date.now();
  });
// split function here?
  const collection = database.collections[foundSheet.tableName];
  await collection.bulkInsert(jsonData);
}

async function processFiles(files: FileDocument[]) {
  for await (const file of files) {
    const attachment = file.getAttachment(file.fileName);
    const fileData = (await attachment.getData()) as Blob;

    const wb = await getWorkbookFromBlob(fileData);

    const firstSheetName = getSheetNames(wb)[0];
  
    const action = SheetTableMap
      .find((item) => item.sheetName === firstSheetName);

    var jsonData = getJsonFromSheetName(wb, firstSheetName);
    
    console.log('file', file);
    console.log('file.collection', file.collection);
    console.log('file.collection.database', file.collection.database);
    console.log('file.collection.database.collections.f460a', file.collection.database.collections.f460a);

    console.log('action.tableName', action.tableName);

    // const f460a = file.collection.database.collections.f460a;
    const f460a = file.collection.database.collections[action.tableName];

    console.log('file.id', file.id);

    const row = jsonData[0] as any;

    await f460a.insert({
      ...row,
      id: uuidv4(),
      fileId: file.id,
      lastModified: Date.now(),
    });

    const changeFile = (oldFile) => {
      oldFile.loaded = true;
      return oldFile;
    };
    await file.atomicUpdate(changeFile);

  }
}

export function getSelectedFiles(collection: FileCollection): Promise<FileDocument[]> {

  return collection.find({
    selector: {
      selected: {
        $eq: true,
      }
    }
  }).exec();

}
