import React, {Fragment} from "react";
import "./register.scss"
import hmacSHA512 from "crypto-js/hmac-sha512";
import axios from "axios";
import {Redirect} from "react-router-dom";

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            confirmPassword: null,
            dob: null,
            height: null,
            weight: null,
            register: false,
            redirect: null
        }
    }

    updateFirstNameValue(event){
        event.preventDefault();
        this.setState({
            firstName: event.target.value
        });
    }

    updateLastNameValue(event){
        event.preventDefault();
        this.setState({
            lastName: event.target.value
        });
    }
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

    updateConfirmPasswordValue(event){
        event.preventDefault();
        this.setState({
            confirmPassword: event.target.value
        });
    }

    updateDobValue(event){
        event.preventDefault();
        this.setState({
            dob: event.target.value
        });
    }

    updateHeightValue(event){
        event.preventDefault();
        this.setState({
            height: event.target.value
        });
    }

    updateWeightValue(event){
        event.preventDefault();
        this.setState({
            weight: event.target.value
        });
    }

    updateLastNameValue(event){
        event.preventDefault();
        this.setState({
            lastName: event.target.value
        });
    }

    onFormSubmit(event){
        event.preventDefault();
        if(this.state.password === this.state.confirmPassword){
            let bodyFormData = new FormData();
            bodyFormData.append("firstName", this.state.firstName);
            bodyFormData.append("lastName", this.state.lastName);
            bodyFormData.append("email", this.state.email);
            bodyFormData.append("password", hmacSHA512(this.state.password, "Shwetha's Secret Key"));
            bodyFormData.append("dob", this.state.dob);
            bodyFormData.append("height", this.state.height);
            bodyFormData.append("weight", this.state.weight);

            axios.post("http://localhost:8000/register", bodyFormData)
                .then( (response) =>{
                    if(response.data.msg){
                        this.setState({
                            register: 'Successfully registered'
                        })
                    } else {
                        this.setState({
                            register: 'Failed to register'
                        })
                    }
                })
                .catch( (error) => {
                    this.setState({
                        register:'API failed try again'
                    })
                });
        } else {
            this.setState(
                {register:'Passwords didn\'t match'}
            )

        }

    }

    render() {
        return (
                <Fragment>
                    <h3> Register</h3>
                    {this.state.register}
                    <form onSubmit={event => this.onFormSubmit(event)}>
                        <label className="first-name-border">
                            First Name:
                            <input type="text" value={this.state.firstName} onChange={evt => this.updateFirstNameValue(evt)} name="firstName"/>
                        </label>
                        <label className="last-name-border">
                            Last Name:
                            <input type="text" value={this.state.lastName} onChange={event => this.updateLastNameValue(event)} name="lastName"/>
                        </label>
                        <label className="email-border">
                            Email:
                            <input type="email" value={this.state.email} onChange={event => this.updateEmailValue(event)} name="email"/>
                        </label>
                        <label className="password-border">
                            Password:
                            <input type="password" value={this.state.password} onChange={event => this.updatePasswordValue(event)} name="password"/>
                        </label>
                        <label className="confirm-password-border">
                            Confirm Password:
                            <input type="password" value={this.state.confirmPassword} onChange={event => this.updateConfirmPasswordValue(event)} name="confirmPassword"/>
                        </label>
                        <label className="dob-border">
                            DOB:
                            <input type="date" value={this.state.dob} onChange={event => this.updateDobValue(event)} name="dob"/>
                        </label>
                        <label className="height-border">
                            Height:
                            <input type="number" value={this.state.height} onChange={event => this.updateHeightValue(event)} name="height" min="1" max="5"/>
                        </label>
                        <label className="weight-border">
                            Weight:
                            <input type="number" value={this.state.weight} onChange={event => this.updateWeightValue(event)} name="weight" max={500}/>
                        </label>

                        <input type="submit" value="Submit" />
                    </form>
                </Fragment>
            )
    }
}

export default Register;