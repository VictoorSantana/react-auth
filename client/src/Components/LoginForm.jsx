import React, { Component } from 'react';
import Api from '../Settings/Api';

class LoginForm extends Component {
    state = {        
        user: '',
        pass: '',
        auth: false        
     }

     constructor(props) {
         super(props);
     }

     handleChange = e => {
        this.setState({[e.target.name]: e.target.value });
     }

     handleSubmit = e => {                          
        const data = {
            user: this.state.user,
            pass: this.state.pass
        }        

        const isAuth = Api.tryLogin(data);        

        isAuth.then(auth => { 
            this.setState({auth});   
            this.props.history.push('/app');
        });

        e.preventDefault();   
     }

    render() { 
        let {user,pass} = this.state;
        return ( 
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="user" name="user" value={user} onChange={this.handleChange}></input>
                <input type="text" placeholder="pass" name="pass" value={pass} onChange={this.handleChange}></input>
               
                <button type="submit">Login</button>
            </form>
         );
    }
}
 
export default LoginForm;