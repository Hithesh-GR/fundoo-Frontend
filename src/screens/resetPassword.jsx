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
import "../App.css";
export default class resetPassword extends React.Component {
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
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleClickShowPassword1 = () => {
        this.setState(state => ({ showPassword1: !state.showPassword1 }));
    };
    /**
     * it will resets the page or form if we entered wrong fields
     */
    resetForm = () => {
        this.setState(this.baseState);
    };
    /**
     * use to auto close snackBar
     */
    handleSnackClose = () => {
        this.setState({
            openSnackBar: false
        })
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
                    <div id="outlined-adornment-password2">
                        <TextField
                            variant="outlined"
                            type={this.state.showPassword1 ? 'text' : 'password'}
                            label="Confirm new"
                            value={this.state.newPassword}
                            onChange={this.handleChange('newPassword')}
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
                            variant="outlined"
                            color="primary"
                            title="click on reset"
                            onClick={this.resetForm}>
                            reset
                        </Button>
                        <Button
                            size="medium"
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