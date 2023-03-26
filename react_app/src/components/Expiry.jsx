import { useEffect, useState } from "react";
import Select from "react-select";

function Expiry({
    currentOption, expires = [{value:'', label :''}]
}){
        
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() =>{
        if(!expires[0].value==''){
            setIsDisabled(false)}
    },[expires])

    return(
        <div>
            <Select 
            options={expires}
            isDisabled={isDisabled}
            // onChange={handlechange}
            // defaultValue={options[0].value}
            className='select'
            />
        </div>
    )
} export default Expiry;