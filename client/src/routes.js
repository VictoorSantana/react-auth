import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import  Api  from './Settings/Api';
import LoginForm from './Components/LoginForm';


const PrivateRoute = ({ component: Component, ... rest }) => (
    <Route 
    { ... rest}
    render={props => 
        Api.isAuthenticated() ? (
            <Component { ... props} />
        ): (
            <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
        )
    }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={(props) => <LoginForm  {...props}></LoginForm>}></Route>
            <PrivateRoute path="/app" component={() => <h2>you are authenticated</h2>}></PrivateRoute>    
        </Switch>
    </BrowserRouter>
);

export default Routes;