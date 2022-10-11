import { Box, Button, ButtonGroup, List } from "@mui/material";
import React, { useCallback, useState } from "react";
import {useDropzone} from 'react-dropzone';
import { useRxDB } from "rxdb-hooks";
import { RxDatabaseBaseExtended } from "rxdb-hooks/dist/plugins";

import FileListItemAdd from "../fileListItemAdd";

import { addFileDD, setFileSoftware, uploadFiles2 } from "../../services/uploadFiles";
import FileListButtonDelete from "../fileListButtonDelete";
import FileListButtonLoad from "../fileListButtonLoad";
import FileListButtonUnload from "../fileListButtonUnload";
import FileListItemLoading from "../fileListItemLoading";
import { YearList } from "./yearList";
import CollectionDeleteSelectedButton from "../collection/collectionDeleteSelectedButton";
import { FileCollection, FileDocument } from "../../database/file-schema-types";
import { getEstimatedYear2 } from "../../services/loadWorkbooks";
import { SnackbarMessage, useSnackbar } from 'notistack';

export function YearFileUpload() {
  const db: RxDatabaseBaseExtended = useRxDB();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {

    const fileCollection: FileCollection = db.collections?.files;
    if (!fileCollection) return;

    const uploadedFiles: FileDocument[] = [];

    for (const file of acceptedFiles) {
      const result = await addFileDD(file, fileCollection);
      enqueueSnackbar(result.responseMessage);
      uploadedFiles.push(result.document);
    }

    for (const file of uploadedFiles) {
      const resultFile = await setFileSoftware(file);

      const year = await getEstimatedYear2(resultFile, resultFile.software);
      console.log({year});

      const changeDoc = (oldDOc) => {
        oldDOc.year = year;
        return oldDOc;
      };
      await resultFile.atomicUpdate(changeDoc);

    }

  }, [db, enqueueSnackbar]);

  const {getRootProps, getInputProps, isDragActive, open} = useDropzone({noClick: true, onDrop});

  return (
    <>
      <Box 
        sx={{ 
          width: '100%', maxWidth: 360,
          border: isDragActive ? '2px solid green' : '2px solid grey',
          bgcolor: isDragActive ? '#eeeeee' :'background.paper',
        }}
        {...getRootProps()}>
        <nav aria-label="uploaded files">
          <List>
            <input {...getInputProps()} />
            {isDragActive ? 
              <p>Drop the files here ...</p> :
              <div  onClick={open}>
                {/* <FileListItemAdd /> */}
              </div>
            }
          </List>
          <ButtonGroup 
            sx={{width: '90%'}}
            variant="contained"
            aria-label="outlined button group"
            fullWidth={true}
          >
            {/* <FileListButtonLoad /> */}
            {/* <FileListButtonUnload /> */}
            <CollectionDeleteSelectedButton collectionName="years" />
          </ButtonGroup>
          <YearList />
        </nav>
      </Box>
    </>
  );
}
