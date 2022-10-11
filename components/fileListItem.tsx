import React, { useCallback, useEffect, useState } from "react";
import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRxDocument } from "rxdb-hooks";

interface FileListItemProps {
  id: string,
}

import { addRxPlugin } from 'rxdb';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { FileDocument } from "../database/file-schema-types";
addRxPlugin(RxDBUpdatePlugin);

export default function FileListItem({id}: FileListItemProps) {
  const [disabledDelete, setDeleteDisabled] = useState(false);

  const { result: resultFile, isFetching } = useRxDocument<FileDocument>('files', id, { idAttribute: 'id' });

  const memoizedDeleteCallback = useCallback(
    () => {
      setDeleteDisabled(true);
      console.log('removing ', resultFile);
      resultFile.remove();
    }, [resultFile],
  );

  const memoizedUpdateCallback = useCallback(
    () => {
      const changeFile = (oldFile) => {
        oldFile.selected = !oldFile.selected;
        return oldFile;
      };
      resultFile.atomicUpdate(changeFile);

    }, [resultFile],
  );

  const [color, setColor] = useState('unset');
  useEffect(() => {
    const color = resultFile?.loaded 
      ? '#cdedcf'
      : 'unset';
    setColor(color);
  }, [resultFile, resultFile?.loaded])

  if (isFetching || !resultFile) return <></>;
  
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={memoizedDeleteCallback}
            disabled={disabledDelete}
          >
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton
          
          onClick={() => memoizedUpdateCallback()} 
          sx={{ backgroundColor: color}}
        > 
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={resultFile.selected}
              tabIndex={-1}
              disableRipple
              // inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          {/* <ListItemText primary={file.fileName} /> */}

          <Tooltip title={resultFile.fileName}>
            <Typography noWrap={true}>
              {resultFile.fileName.slice(0, 20)}
            </Typography>
          </Tooltip>
        </ListItemButton>
      </ListItem>
    </>
  );
}
