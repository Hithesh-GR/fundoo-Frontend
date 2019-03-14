/****************************************************************************************
 *  @Purpose        : To create a forgot password page for recover the password
                      using mail.
 *  @file           : forgotPassword.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { forgotPassword } from "../services/userServices";
import "../App.css";
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            snackBarMessage: "",
            openSnackBar: false,
        };
    }
    /**
     * @description:it will takes the forgot password user email
     */
    handleEmailChange = event => {
        try {
            const email = event.target.value;
            this.setState({ email: email });
        } catch (err) {
            console.log("error at handleEmailChange in forgotPassword");
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
            console.log("error at handleEnter in forgotPassword");
        }
    };
    /**
     * @description:it will submit the forgotPasswordPage and checks all the conditions
     */
    handleSubmit = event => {
        try {
            event.preventDefault();
            if (this.state.email === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Email  empty..!"
                });
            } else if (
                !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)
            ) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: " Not valid email..!"
                });
            }
            else {
                var data = {
                    email: this.state.email
                }
                forgotPassword(data)
                    .then((response) => {
                        console.log(response);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: " Please check your email.."
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: " User Not Found.."
                        });
                    });
            }
        } catch (err) {
            console.log("error at handleSubmit in forgotPassword");
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
            console.log("error at handleSnackClose in forgotPassword");
        }
    }
    /**
     * @description:it will redirect to loginpage
     */
    loginclick = event => {
        try {
            event.preventDefault();
            this.props.history.push("/login");
        } catch (err) {
            console.log("error at loginclick in forgotPassword");
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
                        <h2>Find your email</h2>
                        <p>Enter your recovery email</p>
                    </div>
                    <div id="outlined-email-inputt">
                        <TextField
                            label="Email"
                            id="email"
                            type="emaill"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            onKeyPress={this.handleEnter}
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div id="butt" >
                        <Button
                            id="sentenceCase"
                            color="primary"
                            title="click on sign in"
                            onClick={this.loginclick}>
                            Sign in
                        </Button>
                        <Button
                            id="sentenceCase"
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
export { ForgotPassword };