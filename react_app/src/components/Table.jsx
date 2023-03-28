/*
ask price
bid price
callPrice -  Black scholes
contractSymbol
volatility
openInterest
strike
*/
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";

function Table({options_data}){

    const [rows, setRows] = useState({})

    useEffect(() =>{
        if(options_data!=null){
            createRows()
        }

    },[options_data])

    function createRows(){
        const currentRows = [];
        // console.log("Inside use effect")
        const options_length = Object.keys(options_data.contractSymbol).length;
        for(let i = 0; i < options_length;i++){
            currentRows.push(createOption(
                options_data.contractSymbol[i],
                options_data.ask[i],
                options_data.bid[i],
                options_data.strike[i],
                options_data.openInterest[i],
                options_data.impliedVolatility[i],
                options_data.callPrice[i]
            ))
        }
        setRows(currentRows);

    }

    function createOption(
        contractSymbol,
        ask,
        bid,
        strike,
        openInterest,
        impliedVolatility,
        callPrice){
            return {        
                contractSymbol,
                ask,
                bid,
                strike,
                openInterest,
                impliedVolatility,
                callPrice}
        }



    const columns = [
        { 
            field: 'contractSymbol', 
            headerName: 'Contract', 
            headerAlign: 'center',
            flex: 1.5,
        },
        { 
            field: 'ask',
            headerName: 'Ask Price',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
        },
        { 
            field: 'bid',
            headerName: 'Bid Price',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
        },
        {
            field: 'strike',
            headerName: 'Strike Price',
            headerAlign: 'center',
            type: 'number',
            flex: 1,
        },
        {
            field: 'openInterest',
            headerName: 'Open Interest',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
        },
        {
            field: 'impliedVolatility',
            headerName: 'Volatility',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
        },
        {
            field: 'callPrice',
            headerName: 'Call Price',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
        },
      ];

      return (
        <div style={{ height: '30vw', width: '80%' }}>
          <DataGrid
            getRowId={(row) => row.contractSymbol}
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            className='tables'
            sx={{
                fontFamily:'Poppins',
                fontWeight:'300',
                bgcolor: 'black',
                borderRadius: 2,

            }}
          />
        </div>
      );

}
export default Table;