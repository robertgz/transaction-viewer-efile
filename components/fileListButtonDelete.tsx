import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import { useRxCollection } from "rxdb-hooks";

// import { addRxPlugin } from 'rxdb';
// import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
// addRxPlugin(RxDBQueryBuilderPlugin);

export default function FileListButtonDelete () {
  // const [disabled, setDisabled] = useState(false);
  const collection = useRxCollection('files');

  const memoizedDeleteCallback = useCallback(
    () => {
      // setDisabled(true);
      
      collection.find({
        selector: {
          selected: {
            $eq: true,
          }
        }
      }).remove()
      .then((result) => {
        console.log('memoizedDeleteCallback1', result);
        return result;
      });

      // collection.find().where('selected').equals(true).remove()
      // .then((result) => {
      //   console.log('memoizedDeleteCallback1', result);
      //   return result;
      // })

    }, [collection],
  );

  return (
    <>
      <Button color="error" onClick={memoizedDeleteCallback}>Delete</Button>
    </>
  );
}
