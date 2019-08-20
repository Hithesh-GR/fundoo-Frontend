/******************************************************************************
 *  @Purpose        : Here will import all the pages by using specific path.
 *  @file           : App.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 ******************************************************************************/
import React from 'react';
import { BrowserRouter as Router, Route, Redirect,Switch } from "react-router-dom";
import registration from "./screens/registration.jsx";
import forgotPassword from "./screens/forgotPassword.jsx";
import resetPassword from "./screens/resetPassword.jsx";
import Login from './screens/login.jsx';
import DashBoard from './screens/dashBoard.jsx';

/*This will rename our component to Component so that we can use it to render because React 
requires components to be capitalized otherwise it will treat it as a normal HTML element.*/
export const PrivateRoute = ({ component: Component, ...rest }) => (
  /**
  * We need to use a render prop here because now that we have matched a route we need to do some logic 
  * to determine whether or not we should render the component that was passed in or redirect the user to
  * another location.
  */
 <Switch>
  <Route {...rest} render={props => (
    localStorage.getItem('token') ? (
      <Component {...props}/>
    ) : (
      //If user isn't logged in then we can redirect to a login page.
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
  </Switch>
)

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
          <Switch>
            <Route path="/registration" component={registration}></Route>
            <Route path="/" exact component={Login}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/forgotPassword" component={forgotPassword}></Route>
            <Route path="/resetPassword" component={resetPassword}></Route> 
            <PrivateRoute path="/dashBoard" component={DashBoard}></PrivateRoute>
          </Switch>
          </div>
        </Router>
      </div>  
    );
  }
}