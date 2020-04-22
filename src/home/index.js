import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import './index.scss';
import Login from "./login/login";
import Register from "./register/register";
import {Redirect} from 'react-router-dom';


class Home extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        if(localStorage.getItem('isShwethaRaoLoggedIn')){
            return <Redirect to='profile' />
        } else {
            return(
                <div className="container container-border">
                    <div className="row row-border">
                        <div className="col-6 layout-border">
                            <Login/>
                        </div>
                        <div className="col-6 layout-border">
                            <Register/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Home;