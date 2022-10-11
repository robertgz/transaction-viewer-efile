import { read, utils, writeFileXLSX } from 'xlsx';

function parseSheet(file: ArrayBuffer, sheetNumber: number = 0) {

  const workBook = read(file);
  const workSheet = workBook.Sheets[workBook.SheetNames[sheetNumber]];

  const data = utils.sheet_to_json(workSheet); // generate objects

  return data;
}



const data = 'abc123';

export {
  data,
  parseSheet,
}
