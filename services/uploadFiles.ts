
import { addRxPlugin } from 'rxdb';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
addRxPlugin(RxDBAttachmentsPlugin);
import { RxDatabaseBaseExtended } from "rxdb-hooks/dist/plugins";
import { FileCollection, FileDocument } from "../database/file-schema-types";
import { v4 as uuidv4 } from 'uuid';
import { getEstimatedYear } from './loadWorkbooks';
import { YearDocument } from '../database/year-schema-types';
import { getSheetNames, getWorkbookFromBlob } from './xlsxProcessing';
import { FilingSoftware } from './software';


export async function uploadFiles2(uploadedFiles: File[], db: RxDatabaseBaseExtended) {
  console.info('uploadFiles2');
  const software = 'EFile';
  const statusMessages = [];

  const yearsCollection = db.collections.years

  if (!yearsCollection) return;

  for (const file of uploadedFiles) {
    const year = await getEstimatedYear(file);

    // console.info({year});
    if (!year) return;

    let yearDoc: YearDocument = await yearsCollection.findOne({
      selector: {
        year: {
          $eq: year,
        },
        software: {
          $eq: software,
        },
      }
    }).exec();

    if (!yearDoc) {
      yearDoc = await yearsCollection.atomicUpsert({
        year,
      })
    }

    // console.info({yearDoc})
    // console.info({yearsCollection})

    const documentFiles = await yearDoc.files;
    // console.info({ documentFiles });

    const lastModifiedList = documentFiles.map((file) => file.lastModified);
    // console.info({ lastModifiedList });
    const mostRecentFile = Math.max(...lastModifiedList);

    // console.info('max', console.log(mostRecentFile));

    if (file.lastModified < mostRecentFile) {
      const statusMessage = `Older file uploaded then existing files. Please delete year ${year} and upload again.`;
      // `Older files for ${year} are ignored. To upload an older file delete ${year} first. }`
      console.info({statusMessage});
      statusMessages.push(statusMessage);

      const changeDoc = (oldDOc) => {
        oldDOc.ready = true;
        return oldDOc;
      };
      await yearDoc.atomicUpdate(changeDoc);

      return;
    }
    
    // return;
    const uploadedFileID: string = uuidv4();

    await yearDoc.update({
      $push: {
        files: {
          id: uploadedFileID,
          name: file.name,
          size: file.size,
          lastModified: file.lastModified,
          uploadedAt: Date.now().toString(),
        },
      },
    });

    await yearDoc.putAttachment({
      id: uploadedFileID,
      data: file,
      type: file.type,
    });

    const changeDoc = (oldDOc) => {
      oldDOc.ready = true;
      return oldDOc;
    };
    await yearDoc.atomicUpdate(changeDoc);
    // const found = await yearsCollection.find({}).exec()
    // console.info('found', found);

    // const doc = await addFile(file, collection);
    // fileDocs.push(doc);
  }

  return statusMessages;
}

export async function addFileDD(file: File, fileCollection: FileCollection) {

  let fileDoc: FileDocument = await fileCollection.findOne({
    selector: {
      fileName: {
        $eq: file.name,
      },
      size: {
        $eq: file.size,
      },
      lastModified: {
        $eq: file.lastModified,
      },
    }
  }).exec();

  if (fileDoc) {
    return { 
      document: fileDoc,
      responseMessage: 'Existing file found. Upload Ignored.',
    }
  }

  fileDoc = await fileCollection.atomicUpsert({
    id: uuidv4(),
    fileName: file.name,
    size: file.size,
    lastModified: file.lastModified,
    uploadedAt: Date.now().toString(),
  });

  const attachmentID = uuidv4();
  // console.log({attachmentID});

  await fileDoc.putAttachment({
    id: attachmentID,
    data: file,
    type: file.type,
  });

  const changeFile = (oldFile) => {
    oldFile.attachmentId = attachmentID;
    oldFile.ready = true;
    return oldFile;
  };
  await fileDoc.atomicUpdate(changeFile);

  return { document: fileDoc, responseMessage: 'File uploaded.' }
}

export async function setFileSoftware(uploadedFile: FileDocument) {
  const changeDoc1 = (oldDOc) => {
    oldDOc.ready = false;
    return oldDOc;
  };
  await uploadedFile.atomicUpdate(changeDoc1);

  const id = uploadedFile.attachmentId;
  // console.log({id});

  const attachment = uploadedFile.getAttachment(id);

  // console.log({attachment});
  if (!attachment) return uploadedFile;

  const fileData = (await attachment.getData()) as Blob;
  const wb = await getWorkbookFromBlob(fileData);

  const sheetNames = getSheetNames(wb);

  let software = null;

  for (const fSoftware of FilingSoftware) {
    const sheet = fSoftware.identifyingSheet;
    const found = sheetNames.includes(sheet);

    if (found) {
      software = fSoftware.name;
      break;
    }
  }

  if (!software) return uploadedFile;

  const changeDoc = (oldDOc) => {
    oldDOc.software = software;
    oldDOc.ready = true;
    return oldDOc;
  };
  await uploadedFile.atomicUpdate(changeDoc);

  return uploadedFile;
}
