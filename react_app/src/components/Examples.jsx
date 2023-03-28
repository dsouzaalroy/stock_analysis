import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

function Examples({onChildResponse, setIsLoading, isLoading}){
    
    // const [isLoading, setIsLoading] = useState(false)


    function createExpiryOptions(expiryDates){
        const expiryOptions= [];
        
        for(const date in expiryDates){
            const dict = {}

            dict['value'] = expiryDates[date];
            dict['label'] = expiryDates[date];

            expiryOptions.push(dict)
        }
        return expiryOptions
    }
    const options = [
        { value: 'BCS', label: 'BCS' },
        { value: 'AAPL', label: 'AAPL' },
        { value: 'TSLA', label: 'TSLA' },
    ];

    useEffect(() =>{
        handlechange(options[0])
    }, [])


    const handlechange = async option =>{
        setIsLoading(true)
        await axios.get(`http://dsouzaalroy.pythonanywhere.com/finance/getExpiry?name=${option.value}`)
        .then((response)=>{
            onChildResponse(option.value, createExpiryOptions(response.data))
        })
        setIsLoading(false)

    }
    

    return(
        <div>
            <Select 
            // defaultValue={options[0]}
            placeholder='Ticker'
            options={options}
            onChange={handlechange}
            isLoading={isLoading}
            isDisabled={isLoading}
            className='select'
            styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor:state.isDisabled ? '#808080': 'black',
                }),
                option: (baseStyles, state) =>({
                    ...baseStyles,
                    backgroundColor:state.isFocused ? 'white': 'black',
                    color:state.isFocused ? 'black': 'white'
                }),
                singleValue: (baseStyles, state) =>({
                    ...baseStyles,
                    // backgroundColor:'black',
                    color:'white'
                }),
                menu: (baseStyles, state) =>({
                    ...baseStyles,
                    backgroundColor: 'black',
                    // color:state.isFocused ? 'black': 'white'
                }),
              }}
            />
        </div>
    )

}
export default Examples;