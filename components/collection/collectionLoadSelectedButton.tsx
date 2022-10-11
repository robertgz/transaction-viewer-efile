import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { useRxCollection, useRxDB } from "rxdb-hooks";
// import { loadWorkbooks } from "../services/loadWorkbooks";
import { RxDatabaseBaseExtended } from "rxdb-hooks/dist/plugins";
import { YearCollection } from "../../database/year-schema-types";
import { loadWorkbooks } from "../../services/loadWorkbooks";
import { loadYearWorkbooks } from "../../services/loadWorkbooksFromYears";

interface CollectionLoadSelectedButtonProps {
  collectionName: string,
}

export default function CollectionLoadSelectedButton ({collectionName} : CollectionLoadSelectedButtonProps) {
  // const collection: YearCollection = useRxCollection(collectionName);
  const db: RxDatabaseBaseExtended = useRxDB();
  
  const memoizedLoadCallback = useCallback(
    async () => {
      await loadYearWorkbooks(db)
    }, [db],
  );

  return (
    <>
      <Button color="success" onClick={memoizedLoadCallback}>Load</Button>
    </>
  );
}
