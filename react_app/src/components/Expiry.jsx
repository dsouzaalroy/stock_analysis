import { useEffect, useState } from "react";
import Select from "react-select";

function Expiry({
    onDateChange, setIsLoading, isLoading, expires = [{value:'', label :''}]
}){
        
    const [date, setDate] = useState(true);

    const handlechange = (date) =>{
        onDateChange(date)
        setDate(date)
    }
    
    useEffect(() =>{
        setDate('')
        onDateChange('')
    }, [expires])


    return(
        <div>
            <Select 
            options={expires}
            value={date}
            isDisabled={isLoading}
            isLoading={isLoading}
            placeholder={'YYYY-MM-DD'}
            onChange={handlechange}
            className='select'
            styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isDisabled ? '#808080': 'black',
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
                }),
              }}
            />
        </div>
    )
} export default Expiry;