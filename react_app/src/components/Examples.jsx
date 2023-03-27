import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

function Examples(props){
    
    const [isLoading, setIsLoading] = useState(false)


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
        { value: 'MSFT', label: 'MSFT' },
        { value: 'AAPL', label: 'AAPL' },
        { value: 'TSLA', label: 'TSLA' }
    ];

    useEffect(() =>{
        handlechange(options[0])
    }, [])


    const handlechange = async option =>{
        await axios.get(`http://127.0.0.1:5000/finance/getExpiry?name=${option.value}`)
        .then((response)=>{
            props.onChildResponse(option.value, createExpiryOptions(response.data))
        })

    }
    

    return(
        <div>
            <Select 
            defaultValue={options[0]}
            options={options}
            onChange={handlechange}
            isLoading={isLoading}
            className='select'
            // styles={{
            //     control: (baseStyles, state) => ({
            //       ...baseStyles,
            //       marginTop:'5vw',
            //     }),
            //   }}
            />
        </div>
    )

}
export default Examples;