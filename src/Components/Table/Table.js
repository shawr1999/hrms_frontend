import React, { useEffect, useRef } from "react"
import $ from 'jquery'
 
export function Table() {
 
$.DataTable = require('datatables.net')
const tableRef = useRef()
// console.log(tableRef)
const tableName = "table1"
 
useEffect(() => {
    console.log(tableRef.current)
    const table = $(`#${tableName}`).DataTable(
        {
            data: [
    ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
    ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"]
  ],
                columns: [
                    { title: "Name"},
                    { title: "Position"},
                    { title: "Office"},
                    { title: "Extn."},
                    { title: "Start data"},
                    { title: "Salary"}
            ],
                
                destroy: true,  // I think some clean up is happening here
                searching: false
        }
    )
    // Extra step to do extra clean-up.
    return function() {
        console.log("Table destroyed")
        table.destroy()
    }
},[])
    return (
        <div>
            <table className="display" width="100%" id={tableName} ref={ tableRef }></table>
        </div>
         
    )
}