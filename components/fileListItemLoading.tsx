import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';

export default function FileListItemLoading() {

  return (
    <>
      <LoadingButton 
        sx={{ width: '90%'}}
        loading
        loadingIndicator="Loading file ..."
        variant="outlined"
      >
        Uploading
    </LoadingButton>
    </>
  );
}
