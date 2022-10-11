import { read, utils, WorkBook } from 'xlsx';
import { YearFromWorkbook } from './software';

export function getYearFromWorkbook2(wb: WorkBook, workbookAccessor: YearFromWorkbook): string[] {
  const wa = workbookAccessor;

  const worksheet = wb.Sheets[wa.sheetName];
  const jsonData = utils.sheet_to_json(worksheet, { blankrows: false });

  const colValues: string[] = jsonData
    .map((row) => row[wa.columnName])
    .filter((date) => date) // skip undefined values
    .map((date) => wa.parseString(date));
  
  console.log({jsonData: jsonData[0]});
  console.log({colValues});
    
  return [...Array.from(new Set(colValues))];
}

export function getYearFromWorkbook(wb: WorkBook, sheet: string, column: string): string[] {
  const worksheet = wb.Sheets[sheet];
  const jsonData = utils.sheet_to_json(worksheet, { blankrows: false });

  const colValues: string[] = jsonData
    .map((row) => row[column])
    .filter((year) => year) // skip undefined values
    .map((year) => year?.slice(0, 4));

  return [...Array.from(new Set(colValues))];
}

export function getSheetNames(wb: WorkBook): string[] {
  // console.log('wb.SheetNames', wb.SheetNames);

  return wb.SheetNames;
}

export async function getWorkbookFromBlob(blob: Blob): Promise<WorkBook> {
  const buffer = await blob.arrayBuffer();
  return read(buffer, { type: 'buffer', cellDates: true});
}

export function getJsonFromSheetNumber(wb: WorkBook, sheet: number): any[] {
  const sheetName = wb.SheetNames[sheet];
  return getJsonFromSheetName(wb, sheetName);
}

export function getJsonFromSheetName(wb: WorkBook, sheet: string): any[] {
  const worksheet = wb.Sheets[sheet];
  const jsonData = utils.sheet_to_json(worksheet);
  return jsonData;
}

