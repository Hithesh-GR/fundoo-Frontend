/********************************************************************************
 *  @Purpose        : Create a registration page to register the users .
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
import { userRegister } from "../services/userServices";
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
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
        this.baseState = this.state;
    }
    /**
    * @description:Takes the firstname
    */
    handleuserfirstNameChange = event => {
        const firstName = event.target.value;
        this.setState({ firstName: firstName });
    };
    /**
     * @description:takes the lastname
     */
    handleuserlastNameChange = event => {
        const lastName = event.target.value;
        this.setState({ lastName: lastName });
    };
    /**
     * @description:takes the email
     */
    handleuserEmailChange = event => {
        const email = event.target.value;
        this.setState({ email: email });
    };
    /**
    * @description:takes the password
    */
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleEnter=event=>{
        if(event.key==='Enter'){
            event.preventDefault();
            this.handleSubmit(event);
        }
    };
    /**
     * @description:it will submit the registration page, after all field are filled and checks the all the conditions
     */
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.firstName === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "firstName cannot be empty..!"
            });
        } else if (this.state.lastName === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "lastName cannot be empty..!"
            });
        } else if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "email cannot be empty..!"
            });
        } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Invalid email..!"
            });
        } else if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "password cannot be empty..!"
            });
        } else if (this.state.password.length < 6) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "password must be of atleast 6 characters long..!"
            });
        } else if (this.state.confirm === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Confirm password cannot be empty..!"
            });
        } else if (this.state.password !== this.state.confirm) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "password and confirm password must be same..!"
            });
        } else {
            var data = {
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            userRegister(data)
                .then((response) => {
                    console.log("response==>", response);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Registered Successfully!!"
                    });
                    this.props.history.push("/login");
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Register Failed"
                    });
                });
        }
    };
    /**
     * @description:it will redirect to loginpage
     */
    loginclick = event => {
        event.preventDefault();
        this.props.history.push("/login");
    };
    /**
     * @description:use to auto close snackBar
     */
    handleSnackClose = () => {
        this.setState({
            openSnackBar: false
        })
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
                            id="firstName"
                            //type="textField"
                            value={this.state.firstName}
                            onKeyPress={this.handleEnter}
                            onChange={this.handleuserfirstNameChange}
                            autoComplete="firstname"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Last name"
                            id="lastName"
                            //type="textField"
                            value={this.state.lastName}
                            onKeyPress={this.handleEnter}
                            onChange={this.handleuserlastNameChange}
                            autoComplete="lastname"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div id="outlined-email-input">
                        <TextField
                            label="Email"
                            id="email"
                            type="email"
                            value={this.state.email}
                            onKeyPress={this.handleEnter}
                            onChange={this.handleuserEmailChange}
                            autoComplete="Email"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div id="outlined-adornment-password">
                        <TextField
                            variant="outlined"
                            id="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            onKeyPress={this.handleEnter}
                        />
                        <TextField
                            variant="outlined"
                            id="confirm"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Confirm"
                            value={this.state.confirm}
                            onChange={this.handleChange('confirm')}
                            onKeyPress={this.handleEnter}
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
                            onClick={this.loginclick}>
                            Sign in
                        </Button>
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
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleSnackClose}
                            >
                                <CloseIcon />
                            </IconButton>
                    ]}
                />
            </div>
        );
    }
}
export { registration };