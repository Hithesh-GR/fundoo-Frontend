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
import "../App.css";
export default class forgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            snackBarMessage: "",
        };
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
                            //value={this.state.email}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div id="butt" >
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