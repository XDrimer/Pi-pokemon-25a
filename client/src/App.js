import React from 'react';
import './App.css';
import {Route,Router,Switch} from "react-router-dom";
import Home from "./components/Home"
import LandingPage from "./components/LandingPage";
import Form from "./components/Form"
import Detailed from "./components/Detailed"

function App() {
  return (
    <div className='App'>
      <Switch>
      <Route exact path={"/"}>
          <LandingPage/>
      </Route >
      <Route path={"/home/:id"} children={<Detailed/>}/>
      <Route path={"/home"}>
          <Home/>
      </Route>
      <Route exact path={"/create"}>
          <Form/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;

