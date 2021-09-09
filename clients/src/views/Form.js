import React,{useState} from 'react';
import Axios from 'axios';
import {useParams,useLocation} from 'react-router-dom';

function Form() {
    let paramName = new URLSearchParams(useLocation().search).get('name')
    
  

    const [channel,setChannel] = useState(paramName !== 'custom' ? paramName : '')
    const [billed,setBilled] = useState('')
    const [amount,setAmount] = useState('')
    const [reminder,setReminder] = useState('')
    const [cycle,setCycle] = useState('')



    const submit = (e) =>{
        e.preventDefault()
        Axios.post('http://localhost:9000/create',{
            channel:channel,
            billed:billed,
            amount:amount,
            reminder:reminder,
            cycle:cycle
        }).then((response)=>{
            console.log(response)
        })
    }

    

    return (
        <div>
            {
                paramName === 'custom' ? <h1>Add  custom subscription</h1> : <h1>Add new subscription</h1>
            }
            
            <form onSubmit={submit}>
                <label>
                    <input type="text" name="channel" id="name"
                     onChange={ e => paramName !== 'custom' ? setChannel(paramName) : setChannel(e.target.value)} 
                    value = {channel}/>
                </label>
                <label>Billed On
                    <input type="date" name="date" id="date" onChange={e => setBilled(e.target.value)}/>
                </label>
                <label>Amount Charged
                    <input type="number" min = "1" step="any" name="amount" id="amount" onChange={e => setAmount(e.target.value)}/>
                </label>
                <label>Remind me
                    <select name="reminder" id="reminder" onChange={e => setReminder(e.target.value)}>
                        <option selected> </option>
                        <option value = "1">1 day before</option>
                        <option value = "3">3 days before</option>
                        <option value = "5">5 days before</option>
                        <option value = "7">1 week before</option>

                    </select>
                </label>
                <label>
                    <select name="cycle" onChange={e => setCycle(e.target.value)}>Payment Cycle
                        <option selected>Choose</option>
                        <option value="monthly">MOnthly</option>
                        <option value="monthly">Yearly</option>
                    </select>
                    
                
                </label>

                <input type="submit" value="save"/>
                <button>Cancel</button>
            </form>
        </div>
    )
}

export default Form
