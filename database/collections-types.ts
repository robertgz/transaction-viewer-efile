
import { YearCollection, yearSchema } from './year-schema-types';
import { FileCollection, fileSchema } from './file-schema-types';
import { F460ACollection, f460aSchema } from './f460a-schema-types';

export type MyDatabaseCollections = {
  years: YearCollection,
  files: FileCollection,
  f460a: F460ACollection,
}

export const DBCollections = {
  years: {
    schema: yearSchema,
  },
  files: {
    schema: fileSchema,
  },
  f460a: {
    schema: f460aSchema,
  },
}
