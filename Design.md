Data Input
* Drag and drop xlsx file into drop zone to upload file into browser
  * (alt) Fetch file from eFile using a fetch request
* Process the xlsx file using SheetJS into a json data
* Bring the json data into RxDB buy updating a transaction/filing
* Use Tabulator and RxDB queries to view subsets of data. For example all transactions for a committee

Packages:
* SheetJS
* RxDB
* Tabulator

Workbook (transactions) viewer
* Load xlsx file
* Have a view xlsx page
  * list each sheet name and an ALL where each can be toggled: include/exclude
  * show a list of committees found in the selected sheets (maybe on the left side)
  * have a table with columns for all sheet types but with most hidden
  
Todo - 10/2/2022
Ignore duplicate file uploads
  duplicates will have the same: file name, last modified date, and size 

How should be done with duplicate transactions?
  duplicate transactions are those with the same: committee name, form type?, From_Date and	Thru_Date, Report_Num

No more than one file for each year should be loaded into the database at a time.

How should the year for each file be determined?
  combination of filename, Rcpt_Date of transactions in F460-A-Contribs sheet, Expn_Date of transactions in F460-D-ContribIndepExpn sheet 

Idea:
File list item will show: Year 2020 Transactions 
tooltip or subtitle will show file name

IF a user drops in a file if there is an existing file for the same year then the previous year will be unloaded and removed then the new file will be used.

If the file is a duplicate then notify the user and then ignore the uploaded file.

The last modified data should be checked and if the dropped file is newer then take a set of actions while if it is older then take another.

User uploads file
1. read xlsx data and determine the year
2. create a year or update an existing year
