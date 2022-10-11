import { Box, Button, ButtonGroup, List } from "@mui/material";
import React, { useCallback, useState } from "react";
import useFileList from "../hooks/useFileList";

import FileListItem from "./fileListItem";
import FileListItemAdd from "./fileListItemAdd";

import {useDropzone} from 'react-dropzone';
import { addFileDD, setFileSoftware, uploadFiles2 } from "../services/uploadFiles";
import FileListButtonDelete from "./fileListButtonDelete";
import FileListButtonLoad from "./fileListButtonLoad";
import FileListButtonUnload from "./fileListButtonUnload";
import FileListItemLoading from "./fileListItemLoading";
import { useRxData, useRxDB } from "rxdb-hooks";
import { RxDatabaseBaseExtended } from "rxdb-hooks/dist/plugins";
import { YearList } from "./year/yearList";
import { FileCollection, FileDocument } from "../database/file-schema-types";
import { getEstimatedYear2 } from "../services/loadWorkbooks";

export function FileList() {
  const db: RxDatabaseBaseExtended = useRxDB();

  const onDropCallback = useCallback(async (acceptedFiles: File[]) => {
    // console.log('onDrop2');

    const fileCollection: FileCollection = db.collections?.files;
    if (!fileCollection) return;
      
    const uploadedFiles: FileDocument[] = [];

    // do uploads for all files
    for (const file of acceptedFiles) {
      const result = await addFileDD(file, fileCollection);
      // console.log('onDrop2', result.responseMessage)
      uploadedFiles.push(result.document);
    }
    // console.log({uploadedFiles});

    // do year and software detection for all uploaded files
    for (const file of uploadedFiles) {
      console.log({file});
      // set status of file
      // get software from file attachment
      const resultFile = await setFileSoftware(file);
      console.log({resultFile});

      // get year from file attachment
      const year = await getEstimatedYear2(resultFile, resultFile.software);
      console.log({year});
      // log result
    }

  }, [db]);

  const {getRootProps, getInputProps, isDragActive, open} = useDropzone({noClick: true, onDrop: onDropCallback});

  const { files, isFetching } = useFileList();

  const list = files.map((file) => 
    <React.Fragment key={file.id}>
      {(file.ready === true)
        ? <FileListItem id={file.id}/>
        : <FileListItemLoading />
      }
    </React.Fragment>
  );

  return (
    <React.Fragment>
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
                <FileListItemAdd />
              </div>
            }
          </List>
          <ButtonGroup 
            sx={{width: '90%'}}
            variant="contained"
            aria-label="outlined button group"
            fullWidth={true}
          >
            <FileListButtonLoad />
            <FileListButtonUnload />
            <FileListButtonDelete />
          </ButtonGroup>
          { isFetching 
            ? 'Locating files in database...' 
            : <List>{list}</List>
          }
        </nav>
      </Box>
    </React.Fragment>
  );
}
