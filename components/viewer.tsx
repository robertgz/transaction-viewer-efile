import { Paper } from '@mui/material';
import React, {useCallback, useContext, useState} from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FileList } from './fileList';
import DatabaseMaintenance from './databaseMaintenance';
import { YearFileUpload } from './year/yearFileUpload';
import DynamicFileTable from './fileTableDynamic';
import TableSample from './tableSample';


const Item = styled(Paper)(({ theme }) => ({
  p: 1,
  m: 1,
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Viewer() {
  return (
    <React.Fragment>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
       }}>
        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Item sx={{ flexGrow: 1 }}>
            Files List
            <FileList />
          </Item>
          <Item sx={{ flexGrow: 1 }}>
            Upload files for Years
            <YearFileUpload />
          </Item>
          <Item sx={{ flexGrow: 1 }}>Sheets List</Item>
          <Item sx={{ flexGrow: 1 }}>Committees List</Item>
          <Item sx={{ flexGrow: 1 }}>
            Database Maintenance
            <DatabaseMaintenance />
          </Item>
        </Box>
        <Item sx={{ flexGrow: 5 }}>
          Table of Files
          <DynamicFileTable />
          {/* <TableSample /> */}
        </Item>
        {/* <Item sx={{ flexGrow: 5 }}>
          Table of Transactions
        </Item> */}
      </Box>
    </React.Fragment>
  );
}

