import React, {useEffect} from "react";
import './App.css';

import {
    Switch,
    BrowserRouter,
    Route
}   from "react-router-dom";

import About from './components/About.js';
import Contact from './components/Contact.js';
import Navigation from './components/Navigation.js';
import Login from './components/Login.js';
import SignUp from './components/Signup.js';
import Chat from "./components/Chat.js";
import Home from "./components/Home.js";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="Navbar">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>  
           <Route path="/chatpage">
            <Chat/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}



export default App;
