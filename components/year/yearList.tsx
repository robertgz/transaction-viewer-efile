
import { Box, Button, ButtonGroup, List } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useRxData, useRxDB } from "rxdb-hooks";
import { FileDocument } from "../../database/file-schema-types";
import { YearDocument } from "../../database/year-schema-types";
import FileListItemLoading from "../fileListItemLoading";
import YearListItem from "./yearListItem";
import 'core-js/actual'; // <- at the top of your entry point

export function YearList() {
  const { result: years, isFetching: isFetchingYears } = useRxData<FileDocument>(
    'files',
    // collection => collection.find()
    collection => collection.find({
      selector: {
        software: 'EFILE',
        // software: {
        //   $eq: 'EFILE',
        // }
      },
    })
  );

  const { result: years2, isFetching: isFetchingYears2 } = useRxData<FileDocument>(
    'files',
    collection => collection.find()
    // collection => collection.find({
    //   selector: {
    //     software: 'EFILE',
    //     software: {
    //       $eq: 'EFILE',
    //     }
    //   },
    // })
  );

  
  // @ts-ignore: Array.group polyfilled by core.js
  const groupByYear = years2.group(({software}) => software)
  console.log({groupByYear})
  
  // @ts-ignore: Array.group polyfilled by core.js
  const groupBySoftware = years2.group(({software}) => software)
  console.log({groupBySoftware})
  // console.log(Object.entries(groupBySoftware));
  // console.log(Array.from(groupBySoftware));

  // @ts-ignore: Array.group polyfilled by core.js
  // const groupBySoftwareYear = groupBySoftware.forEach((softwareGroup) => softwareGroup.group(({year}) => year));

  // console.log({groupBySoftwareYear})


  const list = years.map((year, i) => 
    <React.Fragment key={year.year + `${i}`}>
      {(year.ready === true)
        ? <YearListItem year={year}/>
        : <FileListItemLoading />
      }
    </React.Fragment>
  );

  return (
    <>
      {
        isFetchingYears 
          ? 'Locating year from database...' 
          : <List>{list}</List>
      }
    </>
  );
}