import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { useRxCollection, useRxDB } from "rxdb-hooks";
import { loadWorkbooks } from "../services/loadWorkbooks";
import { RxDatabaseBaseExtended } from "rxdb-hooks/dist/plugins";
import { FileCollection } from "../database/file-schema-types";

export default function FileListButtonLoad () {
  const collection: FileCollection = useRxCollection('files');
  const db: RxDatabaseBaseExtended = useRxDB();
  
  const memoizedLoadCallback = useCallback(
    () => {
      loadWorkbooks(collection, db)
    }, [collection, db],
  );

  return (
    <>
      <Button color="success" onClick={memoizedLoadCallback}>Load</Button>
    </>
  );
}
