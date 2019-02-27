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
        const email = event.target.value;
        this.setState({ email: email });
    };
    /**
     * @description:it will submit the forgotPasswordPage and checks all the conditions
     */
    handleSubmit = event => {
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
                snackBarMessage: " Not found email..!"
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
    };
    /**
     * @description:use to auto close snackBar
     */
    handleSnackClose = () => {
        this.setState({
            openSnackBar: false
        })
    }
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
                            type="emaill"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div id="butt" >
                        <Button
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