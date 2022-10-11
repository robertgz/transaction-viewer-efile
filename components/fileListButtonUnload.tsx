import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { useRxCollection } from "rxdb-hooks";

export default function FileListButtonUnload () {
  const collection = useRxCollection('files');
  
  const memoizedUnloadCallback = useCallback(
    () => {
      collection.find({
        selector: {
          selected: {
            $eq: true,
          }
        }
      }).update({
        $set: {
          loaded: false,
        },
      })
      .then((result) => {
        console.log('memoizedUnloadCallback', result);
        return result;
      });
    }, [collection],
  );

  return (
    <>
      <Button color="success" variant="outlined" onClick={memoizedUnloadCallback}>Unload</Button>
    </>
  );
}
