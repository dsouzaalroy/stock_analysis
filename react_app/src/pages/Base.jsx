import '../css/base.scss'
import Examples from '../components/Examples';
import Expiry from '../components/Expiry'
import { useEffect, useState } from 'react';




function Base(){

    const [expires, setExpires] = useState([{value:'', label :''}])
    const [option, setOption] = useState('')

    const handleChildResponse = (value, response) =>{
        setExpires(response);
        setOption(value);
    }

    useEffect(() =>{
        console.log(expires)
    })

    return(
    <div className="basepage">
        <div className='header'>
            <div className='header big_header'>Options Modeling</div>
            <div className='header small_header'>using Black-Scholes</div>


        </div>
        <div className='options_row'>
            <div id='options'>Price</div>
            <div id='options' className='expiry_content'>
                <a >Expiry Dates</a>
                <Expiry currentOption={option} expires={expires}/>
            </div>
            <div id='options'>
                <Examples onChildResponse={handleChildResponse}/>
            </div>
            <div id='options'>Search</div>
        </div>
        <div>Table</div>



    </div>
    )

}
export default Base