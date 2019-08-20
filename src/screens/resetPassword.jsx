/******************************************************************************
 *  @Purpose        : Create a resetPassword page to reset the new password.
 *  @file           : resetPassword.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { resetPassword } from "../services/userServices.js";
import "../App.css";
export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            newPassword: "",
            snackBarMessage: "",
            showPassword: false,
            showPassword1: false
        };
        this.baseState = this.state;
    }
    /**
     * @description:it handles to change the states
     */
    handleChange (prop,event) {
        try {
            this.setState({ [prop]: event.target.value });
        } catch (err) {
            console.log("error at handleChange in resetPassword");
        }
    };
    /**
     * @description:it will displays the entered password 
     */
    handleClickShowPassword () {
        try {
            this.setState(state => ({ showPassword: !state.showPassword }));
        } catch (err) {
            console.log("error at handleClickShowPassword in resetPassword");
        }
    };
    /**
     * @description:it will displays the entered password 
     */
    handleClickShowPassword1 () {
        try {
            this.setState(state => ({ showPassword1: !state.showPassword1 }));
        } catch (err) {
            console.log("error at handleClickShowPassword1 in resetPassword");
        }
    };
    /**
     * @description:it handles the enter button from keyboard
     */
    handleEnter (event) {
        try {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSubmit(event);
            }
        } catch (err) {
            console.log("error at handleEnter in resetPassword");
        }
    };
    /**
    * @description:it will submit the entered password and checks the all the conditions
    */
    handleSubmit (event) {
        try {
            event.preventDefault();
            if (this.state.password === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "password cannot be empty"
                });
            } else if (this.state.newPassword === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Confirm Password cannot be empty"
                });
            } else if (this.state.password.length < 6) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "password must be of atleast 6 characters long"
                });
            } else if (this.state.newPassword.length < 6) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Confirm Password must be of atleast 6 characters long"
                });
            } else if (this.state.password !== this.state.newPassword) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Password and Confirm password must be same"
                });
            } else {
                event.preventDefault();
                let current_url = window.location.pathname;
                let verify_user_token = current_url.substr(19);
                console.log(verify_user_token);
                console.log("current ", current_url);
                resetPassword(this.state.password, verify_user_token)
                    .then((response) => {
                        console.log(response);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: "Password changed successfully"
                        });
                        this.props.history.push("/login");
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: "Please Try Again.."
                        });
                    });
            }
        } catch (err) {
            console.log("error at handleSubmit in resetPassword");
        }
    };
    /**
     * @description:it will resets the page or form if we entered wrong fields
     */
    resetForm () {
        try {
            this.setState(this.baseState);
        } catch (err) {
            console.log("error at resetForm in resetPassword");
        }
    };
    /**
     * @description:use to auto close snackBar
     */
    handleSnackClose () {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in resetPassword");
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
                        <h2>Reset your password</h2>
                        <p>Create a new password</p>
                    </div>
                    <div id="outlined-adornment-password2">
                        <TextField
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            onKeyPress={this.handleEnter}
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
                    <div id="outlined-adornment-password2">
                        <TextField
                            variant="outlined"
                            type={this.state.showPassword1 ? 'text' : 'password'}
                            label="Confirm new"
                            id="newPassword"
                            value={this.state.newPassword}
                            onChange={this.handleChange('newPassword')}
                            onKeyPress={this.handleEnter}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword1}
                                        >
                                            {this.state.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div id="butn" >
                        <Button
                            id="sentenceCase"
                            color="primary"
                            title="click on reset"
                            onClick={this.resetForm}>
                            Reset
                        </Button>
                        <Button
                            id="sentenceCase"
                            size="medium"
                            variant="contained"
                            title="click on submit"
                            color="primary"
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
export { ResetPassword };