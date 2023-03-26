import '../css/base.scss'
import Examples from '../components/Examples';
import Expiry from '../components/Expiry'
import { useEffect, useState } from 'react';
import axios from 'axios';




function Base(){

    const [expires, setExpires] = useState([{value:'', label :''}])
    const [option, setOption] = useState('');
    const [price, setPrice] = useState('');

    const handleChildResponse = (value, response) =>{
        setExpires(response);
        setOption(value);
        getPrice(value);
        // console.log(value)
    }

    const getPrice = (option) =>{
        axios.get(`http://127.0.0.1:5000/finance/getPrice?name=${option}`)
            .then((response) =>{
                console.log(response)
                setPrice(response.data);
            })
    }

    // useEffect(() =>{
    //     if(option == null){
    //         axios.get(`http://127.0.0.1:5000/finance/getPrice?name=${option}`)
    //         .then((response) =>{
    //             setPrice(response);
    //             console.log(response)
    //         })
    //     }
    // },[option])

    return(
    <div className="basepage">
        <div className='header'>
            <div className='header big_header'>Options Modeling</div>
            <div className='header small_header'>using Black-Scholes</div>


        </div>
        <div className='options_row'>
            <div id='options'>Price: {price}</div>
            <div id='options' className='expiry_content'>
                <div>Expiry Dates</div>
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