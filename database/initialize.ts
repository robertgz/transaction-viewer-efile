import { createRxDatabase, addRxPlugin } from 'rxdb';
import { isRxDatabase } from 'rxdb';
import { MyDatabase } from './database-types';
import { DBCollections, MyDatabaseCollections } from './collections-types';
import { seedFiles } from './seed';

import {
  getRxStoragePouch,
  addPouchPlugin
} from 'rxdb/plugins/pouchdb';
addPouchPlugin(require('pouchdb-adapter-idb'));

import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
addRxPlugin(RxDBAttachmentsPlugin);

let rxDB: MyDatabase = null;

export const createDatabase = async () => {

  if (!isRxDatabase(rxDB)) {
    console.info('Creating database...');
    rxDB = await createDB();
    console.info('Database created.');
  } else {
    console.info('Using existing database.');
  }

  console.info('Adding collections...');
  await rxDB.addCollections(DBCollections);
  // seedFiles(rxDB.collections.files);
  console.info('Collections added.');

  return rxDB;
}

const createDB = async (): Promise<MyDatabase> => {
  return await createRxDatabase<MyDatabaseCollections>({
    name: 'efiletransactionsdb',
    storage: getRxStoragePouch('idb'),
    ignoreDuplicate: true,
  });
}
