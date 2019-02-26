/********************************************************************************
*  @Purpose         : Create a registration page to register the users .
 *  @file           : registration.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *********************************************************************************/
import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { userLogin } from "../services/userServices";
import Snackbar from '@material-ui/core/Snackbar';
import "../App.css";
export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            snackBarMessage: "",
            showPassword: false,
        };
    }
    /**
     * Takes the registered user emailID
     */
    handleEmailChange = event => {
        const email = event.target.value;
        this.setState({ email: email });
    }
    /**
     * Takes the registered user password 
     */
    handlePasswordChange = event => {
        const password = event.target.value;
        this.setState({ password: password });
    }
    /**
     * it will submit the login page and checks all the conditions
     */
    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.email) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "email cannot be empty..!"
            });
        } else if (!this.state.password) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "password cannot be empty..!"
            });
        } else if (
            !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)
        ) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Invalid email..!"
            });
        } else if (this.state.password.length < 6) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "password must be of atleast 6 characters long..!"
            });
        } 
        else {
            var data = {
                email: this.state.email,
                password: this.state.password
            }
            userLogin(data)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Login Successfull!!"
                    });
                    localStorage.setItem('Sender', this.state.email);
                    this.props.history.push('/dashBoard');
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Login failed!!"
                    });
                });
        }
    };
    /**
     * redirect or trigger to forgotPasswordPage
     */
    forgotPasswordPage = e => {
        e.preventDefault();
        this.props.history.push('/forgotPassword');
    };
    /**
     * redirect to registerpage
     */
    registrationclick = e => {
        e.preventDefault();
        this.props.history.push('/registration');
    };
    /**
     * use to auto close snackBar
     */
    handleSnackClose = () => {
        this.setState({
            openSnackBar: false
        })
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    render() {
        return (
            <div>
                <div className="form1">
                    <div id="fontt">
                        <p>
                            <span id="font-F">F</span>
                            <span id="font-u">u</span>
                            <span id="font-n">n</span>
                            <span id="font-d">d</span>
                            <span id="font-O">o</span>
                            <span id="font-o">o</span>
                        </p>
                    </div>
                    <div id="fontt">
                        <h2>Sign in</h2>
                        <p>with your Fundoo Account</p>
                    </div>
                    <div id="outlined-email-input1">
                        <TextField
                            label="Email"
                            type="email1"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div id="outlined-adornment-password1">
                        <TextField
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Enter your password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div id="buttn1">
                        <Button
                            size="small"
                            color="primary"
                            onClick={this.forgotPasswordPage}>
                            Forgot password?
                        </Button>
                    </div>
                    <div id="buttn1" >
                        <Button
                            size="small"
                            color="primary"
                            title="click on create account"
                            onClick={this.registrationclick}>
                            Create account
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            title="click on submit"
                            color="primary"
                            value="click me"
                            onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.openSnackBar}
                    autoHideDuration={6000}
                    onClose={this.handleSnackClose}
                    variant="error"
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id"> {this.state.snackBarMessage} </span>}
                    action={[
                        <div >
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleSnackClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    ]}
                />
            </div>
        );
    }
}
export { login };