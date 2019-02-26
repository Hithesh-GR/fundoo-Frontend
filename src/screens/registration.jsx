/********************************************************************************
*  @Purpose         : Create a registration page to register the users .
 *  @file           : registration.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *********************************************************************************/
import React from "react";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import "../App.css";
export default class registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirm: "",
            snackBarMessage: "",
            showPassword: false
        };
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        return (
            <div>
                <div className="form">
                    <div>
                        <p>
                            <span id="font-F">F</span>
                            <span id="font-u">u</span>
                            <span id="font-n">n</span>
                            <span id="font-d">d</span>
                            <span id="font-O">o</span>
                            <span id="font-o">o</span>
                        </p>
                    </div>
                    <div id="font">
                        <h2>Create your Fundoo Account</h2>
                    </div>
                    <div id="outlined-text-input">
                        <TextField
                            label="First name"
                            //type="textField"
                            //value={this.state.firstName}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Last name"
                            //type="textField"
                            //value={this.state.lastName}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div id="outlined-email-input">
                        <TextField
                            label="Email"
                            type="email"
                            // value={this.state.email}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div id="outlined-adornment-password">
                        <TextField
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                        />
                        <TextField
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Confirm"
                            value={this.state.confirm}
                            onChange={this.handleChange('confirm')}
                        />
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                        >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </div>
                    <div id="font1">
                        Use 6 or more characters with a mix of letters, numbers & symbols
                        </div>
                    <div id="buttn" >
                        <Button
                            color="primary"
                            title="click on sign in"
                            onClick={this.signIn}>
                            Sign in
                        </Button>
                        <Button
                            variant="contained"
                            title="click on submit"
                            color="primary"
                            onClick={this.loginclick}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
} 