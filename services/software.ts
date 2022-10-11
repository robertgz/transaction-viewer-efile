
export interface YearFromWorkbook {
  sheetName: string;
  columnName: string;
  parseString: (s: string) => string,
}

interface Software {
  name: string;
  identifyingSheet: string;
  year: YearFromWorkbook,
  // year: {
  //   sheetName: string;
  //   columnName: string;
  //   parseString: (s: string) => string,
  // }, 
  sheets: {
    sheetName: string;
    tableName: string;
  } [];
}

const EFILEMAP: Software = {
  name: 'EFILE',
  identifyingSheet: 'F460-A-Contribs',
  year: {
    sheetName: 'F460-A-Contribs',
    columnName: 'Rcpt_Date',
    parseString: (s: string) => s.slice(0, 4),
  },
  sheets: [
    {
      sheetName: 'F460-A-Contribs',
      tableName: 'f460a',
    },
    // {
    //   sheetName: 'F460-C-Contribs',
    //   tableName: 'f460c',
    // },
    // {
    //   sheetName: 'F460-I-MiscCashIncs',
    //   tableName: 'f460i',
    // },
    // {
    //   sheetName: 'F496-P3-Contribs',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'F460-D-ContribIndepExpn',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'F460-E-Expenditures',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'F460-G-AgentPayments',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'F460-F-UnpaidBills',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'F460-B1-Loans',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'F460-B2-LoanGuarantees',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'F460-H-LoansMade',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'F460-Summary',
    //   tableName: '',
    // },
    // {
    //   sheetName: '"S496"',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'S497',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'TEXT',
    //   tableName: '',
    // },
  ],
}

const NETFILEMAP: Software = {
  name: 'NETFILE',
  identifyingSheet: 'A-Contributions',
  year: {
    sheetName: 'A-Contributions',
    columnName: 'Tran_Date',
    parseString: (s: string) => new Date(s).getFullYear().toString(),
  },
  sheets: [
    // {
    //   sheetName: 'A-Contributions',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'C-Contributions',
    //   tableName: '',
    // },
    // {
    //   sheetName: 'I-Contributions',
    //   tableName: '',
    // },
  ],
}

export const FilingSoftware: Software[] = [
  EFILEMAP,
  NETFILEMAP,
]
