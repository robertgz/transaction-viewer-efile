import React, { createRef, forwardRef } from "react";
import ReactDOM from "react-dom";

import { ReactTabulator, ColumnDefinition } from "react-tabulator";
// import { Tabulator } from "tabulator-tables";

import {TabulatorFull as Tabulator} from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet

export default function TabF (props) {
  // const tableRef = createRef();
  const {forwardedRef, ...rest} = props;
  const tableRef = forwardedRef;

  const columns = [
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
    { title: "Favourite Color", field: "col" },
    { title: "Date Of Birth", field: "dob", hozAlign: "center" },
    { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
    { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
  ];

  var data = [
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  ];
  
  // var table = new Tabulator("#example-table", {
  //   // ajaxURL:"http://www.getmydata.com/now", //ajax URL
  // });

  // table.setData(data);

  // if ((tableRef.current) && (tableRef.current.table)) {
  //    tableRef.current.table.setData();
  // }

  return (
    <ReactTabulator
      ref={tableRef}
      columns={columns}
      layout="fitColumns"
      data={data}
      // options={options}
    />
);
}
