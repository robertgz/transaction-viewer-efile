import React from "react";
// import ReactDOM from "react-dom";

import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { ReactTabulator, ColumnDefinition } from 'react-tabulator'
import { useRxData } from "rxdb-hooks";
import { FileDocument } from "../database/file-schema-types";
// import {InteractionModule} from 'tabulator-tables';
// import {ResizeColumnsModule} from 'tabulator-tables';

export default function TableFile () {
  let ref = React.useRef<any>();
  const { result: files, isFetching: isFetchingFiles } = useRxData<FileDocument>(
    'files',
    collection => collection.find(),
  );

  const filesData = files.map((file) => ({
    id: file.id,
    name: file.fileName,
    year: file.year,
    lastModified: new Date(file.lastModified),
    // lastModified: file.lastModified,
    uploadedAt: file.uploadedAt,
    size: file.size,
    software: file.software,
  }));

//   cellClick:function(e, cell){
//     //e - the click event object
//     //cell - cell component
// },

function doSomething(e, cell) {
  console.log('Something')
}

  const fileColumns: ColumnDefinition[] = [
    // { title: "Software", field: "software" },
    { title: "Year", field: "year", },
    { title: "Name", field: "name", resizable:true },
    { title: "Last Modified", field: "lastModified", width: 200, sorter:"date" },
    { title: "Upload At", field: "uploadedAt", width: 150, sorter:"date" },
    { title: "Size", field: "size" },
  ];

  return (
    <>
      <ReactTabulator
        onRef={(r) => (ref = r)}
        data={filesData}
        columns={fileColumns}
        layout={"fitData"}
        options={{
          // height: "300px"
          groupBy: ["software"],
          selectable: "true",
        }}
        events={{
          // cellClick: (e, cell) => doSomething(e, cell),
          // cellClick: (e, cell) => {console.log('Something')},
          // rowClick:  () => {console.log('Something')},
        }}
      />
    </>
  );
}
