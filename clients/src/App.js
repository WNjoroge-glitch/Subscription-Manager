import './App.css';
import React,{useState} from 'react';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Home from './views/Home';
import List from './views/List';
import Form from './views/Form';
import Preferences from './views/Preferences';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';


function App() {





  return (
    <Router>
    <div className="App">
    
   
     <Switch>
       <Route exact path = "/">
       <Home/>
       </Route>
       <Route path ="/list/:id">
         <Form/>
       </Route>

     
     <Route path = "/signup" >
     <SignUp/>
     </Route>
     <Route path = "/signin">
     <SignIn/>
     </Route>
     <Route path ="/list">
       <List/>
     </Route>
     <Route path ="/preferences">
       <Preferences/>
     </Route>
   
     </Switch>
     
    </div>
    </Router>
  );
}

export default App;
