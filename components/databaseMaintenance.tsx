import { Button, List } from "@mui/material";
import { useCallback } from "react";
import { useRxDB } from "rxdb-hooks";
import { removeCollections } from "../database/initialize";

export default function DatabaseMaintenance() {
  const db = useRxDB();

  const onDBRemove = useCallback(async () => {
    await db.remove();
    window.location.reload();
  }, [db]);

  const onDBResetCollections = useCallback(async () => {
    await removeCollections(db);
  }, [db]);

  return (
    <>
    <List>
      <Button variant="contained" onClick={onDBRemove}>Reset & Reload DB</Button>
      <Button variant="contained" onClick={onDBResetCollections}>Empty out collections</Button>
    </List>
    </>
  );
}
