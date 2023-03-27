import { useEffect, useState } from "react";
import Select from "react-select";

function Expiry({
    onDateChange, expires = [{value:'', label :''}]
}){
        
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() =>{
        if(!expires[0].value==''){
            setIsDisabled(false)}
    },[expires])

    const handlechange = (date) =>{
        onDateChange(date)
    }



    return(
        <div>
            <Select 
            options={expires}
            isDisabled={isDisabled}
            placeholder={'YYYY-MM-DD'}
            onChange={handlechange}
            // defaultValue={options[0].value}
            className='select'
            // styles={{
            //     control: (baseStyles, state) => ({
            //       ...baseStyles,
            //       marginBottom:'1.000vw',
            //     }),
            //   }}
            />
        </div>
    )
} export default Expiry;