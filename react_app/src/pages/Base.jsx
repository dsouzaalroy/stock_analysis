import '../css/base.scss'
import Examples from '../components/Examples';
import Expiry from '../components/Expiry'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';

function Base(){

    const [expires, setExpires] = useState([{value:'', label :''}])
    const [date, setDate] = useState('')
    const [calls, setCalls] = useState(null);
    const [puts, setPuts] = useState(null);
    const [option, setOption] = useState('');
    const [price, setPrice] = useState('');

    const handleExampleResponse = (value, response) =>{
        setExpires(response);
        setOption(value);
        getPrice(value);
    }

    const getPrice = (option) =>{
        axios.get(`http://dsouzaalroy.pythonanywhere.com/finance/getPrice?name=${option}`)
            .then((response) =>{
                setPrice(response.data);
            })
    }

    const getOptionsAnalysis = async () =>{
        await axios.get(`http://dsouzaalroy.pythonanywhere.com/finance/optionsAnalysis?name=${option}&date=${date}`)
        .then((response) =>{
            console.log(response)
            setCalls(response.data.calls)
            setPuts(response.data.puts)
        })
    }

    const handleExpiryResponse = (date) =>{
        setDate(date.value);
    }

    return(
    <div className="basepage">
        <div className='header'>
            <div className='header big_header'>Options Modeling</div>
            <div className='header small_header'>using Black-Scholes</div>
        </div>
        <div className='options_row'>
            <div id='options'>Price: {price.price} {price.currency}</div>
            <div id='options' className='expiry_content'>
                <div >Expiry Dates</div>
                <Expiry onDateChange={handleExpiryResponse} expires={expires}/>
            </div>
            <div id='options'>
                <Examples onChildResponse={handleExampleResponse}/>
            </div>
            <div></div>
            <div id='options'>
                <button  onClick={getOptionsAnalysis} className='compute_button'>Compute</button>
            </div>
        </div>
        <div className='table calls'>
            <div className='call_put'>Calls</div>
            <Table options_data={calls}/>
        </div>
        <div className='table puts'>
            <div className='call_put'>Puts</div>
            <Table options_data={puts}/>
        </div>


    </div>
    )

}
export default Base