
import { RxDatabaseBaseExtended } from 'rxdb-hooks/dist/plugins';
import { YearCollection, YearDocument } from '../database/year-schema-types';


export async function loadYearWorkbooks(db: RxDatabaseBaseExtended) {  
  const yearsDocs = await getSelectedYears(db.collections.year);

  const yearList = yearsDocs.slice(0, 1);

  // return processFiles(yearList);
}


export function getSelectedYears(collection: YearCollection): Promise<YearDocument[]> {

  return collection.find({
    selector: {
      selected: {
        $eq: true,
      }
    }
  }).exec();

}