
import type { F460ACollection } from './f460a-schema-types';
import type { FileCollection } from './file-schema-types';

import { fileSchema } from './file-schema-types';
import { f460aSchema } from './f460a-schema-types';

export type { FileDocType, FileDocument, FileCollection } from './file-schema-types';

export type MyDatabaseCollections = {
  files: FileCollection,
  f460a: F460ACollection,
}

export const DBCollections = {
  files: {
    schema: fileSchema,
  },
  f460a: {
    schema: f460aSchema,
  },
}
