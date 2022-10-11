import { createRxDatabase, addRxPlugin, dbCount } from 'rxdb';
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

export const createDatabase = async () => {
  const db: MyDatabase = await createDB();
  await createCollections(db);
  return db;
}

export async function removeCollections(db) {
  await db.collections.years?.find({}).remove();
  await db.collections.files?.find({}).remove();
  await db.collections.f460a?.find({}).remove();
}

const createDB = async (): Promise<MyDatabase> => {
  console.info('Creating database...');

  const db = await createRxDatabase<MyDatabaseCollections>({
    name: 'efiletransactionsdb',
    storage: getRxStoragePouch('idb'),
    ignoreDuplicate: true,
  });

  console.info('Database created.');
  return db;
}

async function createCollections(db: MyDatabase): Promise<MyDatabase> {
  console.info('Adding collections...');

  await db.addCollections(DBCollections);
  // seedFiles(db.collections.files);

  console.info('Collections added.');
  return db;
}
