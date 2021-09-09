import React ,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {CookieContext} from '../CookieContext';

function List() {

  

    Axios.get('http://localhost:9000/list',{
        withCredentials:true
    }).then((response)=>{
        console.log(response)
    })


    return (
        <div>
            <h1>Add new subscription</h1>

           
            <p>Select from the list</p>
            <ul>
                <li>
                    <Link to ="/list/id?name=netflix">Netflix</Link>
                </li>
                <li>
                    <Link to ="/list/id?name=aws">AWS</Link>
                </li>
                <li>
                    <Link to ="/list/id?name=apple music">Apple Music</Link>
                </li>
                <li>
                    <Link to ="/list/id?name=spotify">Spotify</Link>
                </li>
                <li>
                    <Link to ="/list/id?name=dropbox">DropBox</Link>
                </li>
                
            </ul>
            <Link to ="/list/id?name=custom">Custom make yours</Link>
        </div>
    )
}

export default List
