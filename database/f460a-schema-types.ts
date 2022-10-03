
import {
  RxCollection,
  RxJsonSchema,
  RxDocument,
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
} from 'rxdb';

const f460aSchemaLiteral = {
  title: 'f460a schema',
  description: 'F460-A-Contributions transactions',
  version: 0,
  // keyCompression: true,
  primaryKey: 'id',
  type: 'object',
  properties: {
    Amount: {
      type: 'string', // decimal number within a string
    },
    // BakRef_TID and several other types could not be determined from existing data
    BakRef_TID: {type: 'string',}, 
    Cmte_ID: {
      type: 'string',
    },
    Cmtte_Type: {
      type: 'string',
    },
    Ctrib_Adr1: {
      type: 'string',
    },
    Ctrib_Adr2: {
      type: 'string',
    },
    Ctrib_City: {
      type: 'string',
    },
    Ctrib_Dscr: {
      type: 'string',
    },
    Ctrib_Emp: {
      type: 'string',
    },
    Ctrib_NamF: {
      type: 'string',
    },
    Ctrib_NamL: {
      type: 'string',
    },
    Ctrib_NamS: {
      type: 'string',
    },
    Ctrib_NamT: {
      type: 'string',
    },
    Ctrib_Occ: {
      type: 'string',
    },
    Ctrib_ST: {
      type: 'string',
    },
    Ctrib_Self: {
      type: 'boolean',
    },
    Ctrib_ZIP4: {
      type: 'string',
    },
    Cum_YTD: {
      type: 'string', // decimal number within a string
    },
    Date_Thru: {
      type: 'string',
    },
    Elect_Date: {
      type: 'string', // date in the form YYYYMMDD
    },
    Entity_Cd: {
      type: 'string',
    },
    Filer_ID: {
      type: 'string',
    },
    Filer_NamL: {
      type: 'string',
    },
    Form_Type: {
      type: 'string',
    },
    From_Date: {
      type: 'string', // date in the form YYYYMMDD
    },
    Int_CmteId: {
      type: 'string',
    },
    Int_Rate: {type: 'string',},
    Intr_Adr1: {
      type: 'string',
    },
    Intr_Adr2: {
      type: 'string',
    },
    Intr_City: {
      type: 'string',
    },
    Intr_Emp: {
      type: 'string',
    },
    Intr_NamF: {
      type: 'string',
    },
    Intr_NamL: {
      type: 'string',
    },
    Intr_NamS: {
      type: 'string',
    },
    Intr_NamT: {
      type: 'string',
    },
    Intr_Occ: {
      type: 'string',
    },
    Intr_Self: {
      type: 'boolean',
    },
    Intr_ST: {
      type: 'string',
    },
    Intr_ZIP4: {
      type: 'string',
    },
    Memo_Code: {
      type: 'boolean',
    },
    Memo_RefNo: {
      type: 'string',
    },
    Rcpt_Date: {
      type: 'string', // date in the form YYYYMMDD
    },
    Rec_Type: {
      type: 'string',
    },
    Report_Num: {
      type: 'string', // numbers starting at 000 then 001, 002, ...
    },
    Rpt_Date: {
      type: 'string', // date in the form YYYYMMDD
    },
    Thru_Date: {
      type: 'string', // date in the form YYYYMMDD
    },
    Tran_ID: {
      type: 'string',
    },
    Tran_Type: {
      type: 'string',
    },
    Tres_Adr1: {
      type: 'string',
    },
    Tres_Adr2: {type: 'string',},
    Tres_City: {type: 'string',},
    Tres_NamF: {type: 'string',},
    Tres_NamL: {type: 'string',},
    Tres_NamS: {type: 'string',},
    Tres_NamT: {type: 'string',},
    Tres_ST: {type: 'string',},
    Tres_ZIP4: {type: 'string',},
    XRef_Match: {type: 'string',},
    XRef_SchNm: {type: 'string',},

    e_filing_id: {
      type: 'string',
    },
    orig_e_filing_id: {
      type: 'string',
    },

    // Fields below are not part of the uploaded spreadsheet
    // id should be a generated uuid
    id: {
      type: 'string',
      maxLength: 50 // <- the primary key must have set maxLength
    },
    // fileId is used to identify which uploaded spreadsheet file
    // a transaction is from
    fileId: {
      type: 'string',
    },
    lastModified: {
      type: 'number',
    },
  },
  required: [
    'id',
    'fileId',
    'Filer_NamL',
  ],
  // indexes: []
} as const;

const schemaTyped = toTypedRxJsonSchema(f460aSchemaLiteral);

// aggregate the document type from the schema
export type F460ADocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

export const f460aSchema: RxJsonSchema<F460ADocType> = f460aSchemaLiteral;

type F460ADocMethods = {};

export type F460Document = RxDocument<F460ADocType, F460ADocMethods>;


type F460ACollectionMethods = {};

export type F460ACollection = RxCollection<F460ADocType, F460ADocMethods, F460ACollectionMethods>;
