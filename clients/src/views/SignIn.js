import React,{useState} from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom'


function SignIn() {
    let history = useHistory()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  

Axios.defaults.withCredentials = true

  const submit =(e)=>{
      e.preventDefault()
     Axios.post('http://localhost:9000/signin',{
         email:email,
         password:password
     }).then((response) =>{
         console.log(response.data)
         history.push('/')
     })


  }

    return (
        <div>
            <form onSubmit={submit}>
                <label>Email
                    <input type="text" placeholder = "email" name="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>Password
                <input type="password" placeholder = "Enter Password" name="password" onChange={e => setPassword(e.target.value)} />

                </label>
               
                <input type="submit" value="submit"/>
 
            </form>
        </div>
    )
}

export default SignIn
