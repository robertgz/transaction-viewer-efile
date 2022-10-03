
import {
  RxCollection,
  RxJsonSchema,
  RxDocument,
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
} from 'rxdb';

const filesSchemaLiteral = {
  title: 'files schema',
  description: 'uploaded spread sheet files',
  version: 0,
  // keyCompression: true,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 50, // <- the primary key must have set maxLength
    },
    fileName: {
      type: 'string',
    },
    year: {
      // examples: 2018, 2020
      type: 'string',
      length: 4,
    },
    size: {
      type: 'number',
    },
    ready: { // should be false until after attachment has been added 
      type: 'boolean',
      default: false,
    },
    selected: {
      type: 'boolean',
      default: false,
    },
    loaded: {
      type: 'boolean',
      default: false,
    },
    lastModified: {
      type: 'number',
    },
    uploadedAt: {
      "type": "string",
      "format": "date-time"
      // https://opis.io/json-schema/2.x/formats.html#date-time
    },
  },
  attachments: {
    encrypted: false,
  },
  required: [
    'id',
    'fileName',
    'uploadedAt',
  ],
  // indexes: []
} as const;

const schemaTyped = toTypedRxJsonSchema(filesSchemaLiteral);

// aggregate the document type from the schema
export type FileDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const fileSchema: RxJsonSchema<FileDocType> = filesSchemaLiteral;

type FileDocMethods = {};

export type FileDocument = RxDocument<FileDocType, FileDocMethods>;


type FileCollectionMethods = {}

export type FileCollection = RxCollection<FileDocType, FileDocMethods, FileCollectionMethods>;
