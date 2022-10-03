
import {
  RxDatabase,
} from 'rxdb';

import { MyDatabaseCollections } from './collections-types';

export type MyDatabase = RxDatabase<MyDatabaseCollections>;
