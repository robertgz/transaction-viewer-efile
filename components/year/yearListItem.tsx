import React, { useCallback, useEffect, useState } from "react";
import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { YearDocument } from "../../database/year-schema-types";
import { FileDocument } from "../../database/file-schema-types";

interface YearListItemProps {
  year: FileDocument,
}

export default function YearListItem({year}: YearListItemProps) {
  const [disabledDelete, setDeleteDisabled] = useState(false);

  const memoizedDeleteCallback = useCallback(
    () => {
      setDeleteDisabled(true);
      console.log('removing ', year);
      year.remove();
    }, [year],
  );

  const memoizedUpdateCallback = useCallback(
    () => {
      const changeYear = (oldYear) => {
        oldYear.selected = !oldYear.selected;
        return oldYear;
      };
      year.atomicUpdate(changeYear);

    }, [year],
  );

  const [color, setColor] = useState('unset');
  useEffect(() => {
    console.log({year})
    const color = year?.loaded 
      ? '#cdedcf'
      : 'unset';
    setColor(color);
  }, [year, year?.loaded])

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
              checked={year.selected}
              tabIndex={-1}
              disableRipple
              // inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          {/* <ListItemText primary={file.fileName} /> */}

          <Tooltip title={year.year}>
            <Typography noWrap={true}>
              {/* {year.year.slice(0, 20)} */}
              { `Year ${year.year} Transactions` }
            </Typography>
          </Tooltip>
        </ListItemButton>
      </ListItem>
    </>
  );
}

