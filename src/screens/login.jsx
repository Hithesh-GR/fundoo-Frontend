/********************************************************************************
 *  @Purpose        : To create a login page for login to the registered account.
 *  @file           : login.jsx        
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
import Snackbar from '@material-ui/core/Snackbar';
import { userLogin } from "../services/userServices";
import "../App.css";
const jwt = require('jsonwebtoken');
export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            snackBarMessage: "",
            showPassword: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /**
     * @description:Takes the registered user emailID
     */
    handleEmailChange = event => {
        try {
            const email = event.target.value;
            this.setState({ email: email });
        } catch (err) {
            console.log("error at handleEmailChange in login");
        }
    }
    /**
     * @description:Takes the registered user password 
     */
    handleChange = prop => event => {
        try {
            this.setState({ [prop]: event.target.value });
        } catch (err) {
            console.log("error at handleChange in login");
        }
    };
    /**
     * @description:it will displays the entered password 
     */
    handleClickShowPassword = () => {
        try {
            this.setState(state => ({ showPassword: !state.showPassword }));
        } catch (err) {
            console.log("error at handleClickShowPassword in login");
        }
    };
    /**
     * @description:it handles the enter button from keyboard
     */
    handleEnter = event => {
        try {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSubmit(event);
            }
        } catch (err) {
            console.log("error at handleEnter in login");
        }
    };
    /**
     * @description:it will submit the login page and checks all the conditions
     */
    handleSubmit = event => {
        try {
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
                        console.log("login response from back-end====>", response);
                        jwt.verify(response.data, 'secretkey-auth', (err, decoded) => {
                            if (err) {
                                console.log("token invalid--->");
                            } else {
                                console.log("decoded data==>", decoded.payload);
                                localStorage.setItem('username', decoded.payload.username);
                                localStorage.setItem('email', decoded.payload.email);
                                localStorage.setItem('userId', decoded.payload.user_id);
                                localStorage.setItem('token', response.data);
                                this.setState({
                                    openSnackBar: true,
                                    snackBarMessage: "Login Successfull!!"
                                });
                                this.props.history.push("/dashBoard");
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: "Login failed!!"
                        });
                    });
            }
        } catch (err) {
            console.log("error at handleSubmit in login");
        }
    };
    /**
     * @description:redirect or trigger to forgotPasswordPage
     */
    forgotPasswordPage = e => {
        try {
            e.preventDefault();
            this.props.history.push('/forgotPassword');
        } catch (err) {
            console.log("error at forgotPasswordPage in login");
        }
    };
    /**
     * @description:redirect to registerpage
     */
    registrationclick = e => {
        try {
            e.preventDefault();
            this.props.history.push('/registration');
        } catch (err) {
            console.log("error at registrationclick in login");
        }
    };
    /**
     * @description:use to auto close snackBar
     */
    handleSnackClose = () => {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in login");
        }
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
                            id="email"
                            variant="outlined"
                            label={" Enter your email"}
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            onKeyPress={this.handleEnter}
                            autoComplete="email"
                        />
                    </div>
                    <div id="outlined-adornment-password1">
                        <TextField
                            variant="outlined"
                            id="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Enter your password"
                            value={this.state.password}
                            onKeyPress={this.handleEnter}
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
                            id="sentenceCase"
                            size="small"
                            color="primary"
                            onClick={this.forgotPasswordPage}>
                            Forgot password?
                        </Button>
                    </div>
                    <div id="buttn1" >
                        <Button
                            id="sentenceCase"
                            size="small"
                            color="primary"
                            title="click on create account"
                            onClick={this.registrationclick}>
                            Create account
                        </Button>
                        <Button
                            id="sentenceCase"
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
                        vertical: 'bottom',
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


