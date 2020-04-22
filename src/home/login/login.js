import React, {Fragment} from "react";
import "./login.scss";
import axios from "axios";
import hmacSHA512 from 'crypto-js/hmac-sha512';
import {Redirect} from 'react-router-dom';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            login: false,
            redirect: null
        };
    };

    updateEmailValue(event){
        event.preventDefault();
        this.setState({
            email: event.target.value
        });
    }

    updatePasswordValue(event){
        event.preventDefault();
        this.setState({
            password: event.target.value
        });
    }

    onFormSubmit(event){
        event.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append("email", this.state.email);
        bodyFormData.append("password", hmacSHA512(this.state.password, "Shwetha's Secret Key"));
        axios.post("http://localhost:8000/login", bodyFormData)
            .then( (response) =>{
                if(response.data.msg){
                    this.setState({
                        redirect:'profile'
                    })
                    localStorage.setItem('isShwethaRaoLoggedIn', true);
                } else {
                    this.setState({
                        redirect:'loginFailed'
                    })
                }
            })
            .catch(function (error) {
                this.setState({
                    redirect:'loginFailed'
                })
            });
    }
    render() {
        if(this.state.redirect === 'profile'){
            return <Redirect to={this.state.redirect} />

        } else if(this.state.redirect === 'loginFailed'){
            return (
                <Fragment>
                    <h3> Login Failed</h3>
                    <form onSubmit={event => this.onFormSubmit(event)}>
                        <label className="email-border">
                            Email:
                            <input type="text" value={this.state.email} onChange={evt => this.updateEmailValue(evt)} name="email"/>
                        </label>
                        <label className="password-border">
                            Password:
                            <input type="password" value={this.state.password} onChange={event => this.updatePasswordValue(event)} name="password"/>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </Fragment>

            )
        } else {
            return (
                <form onSubmit={event => this.onFormSubmit(event)}>
                    <label className="email-border">
                        Email:
                        <input type="text" value={this.state.email} onChange={evt => this.updateEmailValue(evt)} name="email"/>
                    </label>
                    <label className="password-border">
                        Password:
                        <input type="password" value={this.state.password} onChange={event => this.updatePasswordValue(event)} name="password"/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            );
        }

    }
}

export default Login;