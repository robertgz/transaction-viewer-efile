import React from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function FileListItemAdd() {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add File" />
        </ListItemButton>
      </ListItem>
    </>
  );
}
