import {useEffect, useState} from 'react'
import { useRxData } from 'rxdb-hooks';
import { UploadedFile } from '../components/files';

import { addRxPlugin } from 'rxdb';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
addRxPlugin(RxDBAttachmentsPlugin);

export function useFileList() {

  const [files, setFiles] = useState<UploadedFile[]>([]);

  const { result: resultFiles, isFetching } = useRxData(
    'files',
    collection => collection.find()
  );

  useEffect(() => {
    const updatedFiles: UploadedFile[] = resultFiles.map((file) => ({
      fileName: file['fileName'],
      id: file['id'],
      checked: file['selected'],
      ready: file['ready'],
    }));

    setFiles(updatedFiles);

    if (updatedFiles.length < 1 || !updatedFiles[0]) return;

  }, [resultFiles, isFetching]);

  return { files, isFetching };
}

export default useFileList;
