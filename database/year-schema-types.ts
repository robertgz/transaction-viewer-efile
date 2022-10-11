
import {
  RxCollection,
  RxJsonSchema,
  RxDocument,
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
} from 'rxdb';

const yearsSchemaLiteral = {
  title: 'years schema',
  description: 'each year of data from a spreadsheet',
  version: 0,
  primaryKey: 'year',
  type: 'object',
  properties: {
    year: {
      type: 'string',
      maxLength: 5,
    },
    software: {
      type: 'string',
      default: ''
    },
    files: {
      "type": "array",
      default: [],
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          size: {
            type: 'number',
          },
          lastModified: {
            type: 'number',
          },
          uploadedAt: {
            "type": "string",
            "format": "date-time",
            // https://opis.io/json-schema/2.x/formats.html#date-time
          },
        },
      },
      // required: []
    },
    ready: { // should be false while an attachment is being added 
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
    loadedFileAttachmentId: {
      type: 'string',
      default: null,
    },
  },
  attachments: {
    encrypted: false,
  },
  required: [
    'year',
    'software',
    // 'uploadedAt',
  ],
} as const;

const schemaTyped = toTypedRxJsonSchema(yearsSchemaLiteral);

// aggregate the document type from the schema
type YearDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const yearSchema: RxJsonSchema<YearDocType> = yearsSchemaLiteral;

type YearDocMethods = {};

export type YearDocument = RxDocument<YearDocType, YearDocMethods>;


type YearCollectionMethods = {}

export type YearCollection = RxCollection<YearDocType, YearDocMethods, YearCollectionMethods>;
