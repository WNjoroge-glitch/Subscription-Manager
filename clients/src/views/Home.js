import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';


function Home() {
    const[items,setItems]=useState([])
    const [user,setUser]=useState("")
   

    


    const logout = () =>{
        Axios.post('http://localhost:9000/logout')
      
       
        .then((response) =>{
               console.log(response)
           })
        
      }
      useEffect(()=>{
        Axios.get('http://localhost:9000/home',{
            withCredentials:true
        })
        .then((response)=>{
            
            setItems(response.data)
            
        })

      },[])
      const getDate = () =>{
        for(let item of items){
            let billedToday = new Date(item.BilledOn)
            
            let difference = new Date().getTime() - billedToday.getTime()
            var Difference_In_Days = difference / (1000 * 3600 * 24);
             return Math.trunc(Difference_In_Days)

        }
    }
    
     
    
    // useEffect(() => {
    //     Axios.get('http://localhost:9000/options')
    //     .then((response)=>{
    //         setItems(response)
    //     })
    // }, [])
    return (
        <div>
             <h1>Subscriptions</h1>
             <Link to ="/list">Add</Link>
             {user}
             
             <button onClick={logout}>LOgout</button>
             {
items.map(item =>(
   

    <div>
    <p>{item.SubscriptionName}</p>

    <p>{item.Amount} /{item.cycle === 'monthly' ? 'month' : 'year'}</p>
    <p>{getDate()} days till next payment</p>
    </div>
))
             }

             

             
        </div>
    )
}

export default Home

