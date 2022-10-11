import { Container, Card, CardContent, Box, Typography } from '@mui/material'
import React, {useCallback, useContext, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { data, parseSheet } from '../../services/readSheets';
// import FileList from './FileList';

// import { DBContext, DBProvider } from '../services/db-provider';


function Upload() {
  // const databaseContext: any = useContext(DBContext);

  const [fileName, setFileName] = useState([]); 

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    // add each uploaded file to the database
    console.log('Files dropped')
    console.log(acceptedFiles)

    if (acceptedFiles?.length > 0) {
      console.log(data)

      const file = acceptedFiles[0];

      setFileName(acceptedFiles[0].name);
      
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result as ArrayBuffer;
        console.log(parseSheet(binaryStr)[0])
      }
      reader.readAsArrayBuffer(file);

      
      const doInsert = async () => {
        // const result = await databaseContext?.files.insert({
        //   fileName: fileName,
        //   uploadedAt: Date.now().toString(),
        // });

        // console.log('doInsert', result);
      }

      doInsert().catch(console.error);
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const files = [ 'FileA', 'FileB', 'FileC', ];

  return (
    <Container >
      {/* <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}> */}

        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography  variant="h6">
              {
                isDragActive ?
                  <React.Fragment>Drop the files here ...</React.Fragment> :
                  <React.Fragment>Drag n drop some files here, or click to select files</React.Fragment>
              }
              </Typography> 
            </div>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              File name: {fileName}
            </Typography>
          </CardContent>
        </Card>

      {/* <FileList></FileList> */}
      {/* </Box> */}
    </Container>
  )
}

export default Upload;
