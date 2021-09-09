import React,{useState} from 'react';
import Axios from 'axios';


function SignUp() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

Axios.defaults.withCredentials = true

  const submit =(e)=>{
      e.preventDefault()
     Axios.post('http://localhost:9000/signup',{
         names:name,
         email:email,
         password:password,
         confirmPassword:confirmPassword
     }).then((response) =>{
         console.log(response)
     })


  }

    return (
        <div>
            <form onSubmit={submit}>
            <label>Name
                    <input type="text" placeholder = "Name" name="names" onChange={e => setName(e.target.value)} />
                </label>
                <label>Email
                    <input type="text" placeholder = "email" name="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>Password
                <input type="password" placeholder = "Enter Password" name="password" onChange={e => setPassword(e.target.value)} />

                </label>
                <label>Confirm Password
                <input type="password" placeholder = "Confirm Password" name="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />

                </label>
                <input type="submit" value="submit"/>
 
            </form>
        </div>
    )
}

export default SignUp
