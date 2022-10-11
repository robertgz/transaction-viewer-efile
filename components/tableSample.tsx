import React from "react";
// import ReactDOM from "react-dom";

import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator, ColumnDefinition } from 'react-tabulator'
// import { TabulatorFull as Tabulator } from 'tabulator-tables';
 
const columns: ColumnDefinition[] = [
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
    { title: "Favourite Color", field: "col" },
    { title: "Date Of Birth", field: "dob", hozAlign: "center" },
    { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
    { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
  ];

const data = [
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  ];

export default function TableSample () {
  let ref = React.useRef<any>();

  // function doSomething() {
  //   console.log('Something')
  // }
  const rowClick = (e, row) => {
    console.log("rowClick: "); // this is the Tabulator table instance
    // console.log(`rowClick id: \${row.getData().id}`, row, e);
    // this.setState({ selectedName: row.getData().name });
  };

  return (
    <>
      <ReactTabulator
        onRef={(r) => (ref = r)}
        columns={columns}
        data={data}
        layout={"fitData"}
        events={{
          // cellClick: (e, cell) => doSomething(e, cell),
          // cellClick: () => {console.log('cell clicked')},
          // cellClick:  doSomething,
          // rowClick: rowClick,
          // rowClick: function () {
          //   console.log('row clicked');
          //   // return row;
          // },
          dataLoaded: function (data) {
            console.log('dataLoaded', data);
            return data; //return the response data to tabulator
          },
        }}
        options={{
          // height: "300px"
          selectable: "true",
        }}
      />
    </>
  );
}
