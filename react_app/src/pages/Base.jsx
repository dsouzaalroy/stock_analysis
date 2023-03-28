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
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonStyle, setButtonStyle] = useState({});

    const handleExampleResponse = (value, response) =>{
        setExpires(response);
        setOption(value);
        getPrice(value);
    }

    const getPrice = async (option) =>{
        await axios.get(`https://dsouzaalroy.pythonanywhere.com/finance/getPrice?name=${option}`)
            .then((response) =>{
                setPrice(response.data);
            })
    }

    const getOptionsAnalysis = async () =>{
        setIsLoading(true)
        await axios.get(`https://dsouzaalroy.pythonanywhere.com/finance/optionsAnalysis?name=${option}&date=${date}`)
        .then((response) =>{
            console.log(response)
            setCalls(response.data.calls)
            setPuts(response.data.puts)
        })
        setIsLoading(false)
    }

    const handleExpiryResponse = (date) =>{
        setDate(date.value);
    }
    
    const handleIsLoading = (load) =>{
        setIsLoading(load);
    }

    useEffect(() =>{
        setButtonDisabled(date=='' || date==null ? true : false)
    }, [date])

    return(
    <div className="basepage">
        <div className='header'>
            <div className='header big_header'>Options Modeling</div>
            <div className='header small_header'>using Black-Scholes</div>
        </div>
        <div className='options_row'>
            <div id='options' className='price'> {price.price} {price.currency}</div>
            <div id='options' className='expiry_content'>
                <div >Expiry Dates</div>
                <Expiry 
                isLoading={isLoading}
                setIsLoading={handleIsLoading} 
                onDateChange={handleExpiryResponse} 
                expires={expires}/>
            </div>
            <div id='options'>
                <Examples
                isLoading={isLoading}
                setIsLoading={handleIsLoading} 
                onChildResponse={handleExampleResponse}/>
            </div>
            <div id='options'>
                <button 
                disabled={buttonDisabled} 
                onClick={getOptionsAnalysis} 
                className='compute_button'
                >Compute</button>
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