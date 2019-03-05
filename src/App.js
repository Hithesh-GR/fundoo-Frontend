/******************************************************************************
 *  @Purpose        : Here will import all the pages by using specific path.
 *  @file           : App.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 ******************************************************************************/
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import login from "../src/screens/login";
import registration from "../src/screens/registration";
import forgotPassword from "../src/screens/forgotPassword";
import resetPassword from "../src/screens/resetPassword";
import dashBoard from "../src/screens/dashBoard";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Redirect from="/" to="login"/>
            <Route path="/registration" component={registration}></Route>
            <Route path="/login" component={login}></Route>
            <Route path="/forgotPassword" component={forgotPassword}></Route>
            <Route path="/resetPassword" component={resetPassword}></Route> 
            <Route path="/dashBoard" component={dashBoard}></Route>  
          </div>
        </Router>
      </div>  
    );
  }
}