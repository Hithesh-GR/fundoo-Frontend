/****************************************************************************************
 *  @Purpose        : Here we have to create the user profile.
 *  @file           : userProfile.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import '../App.css';
/**
* @description:This method is used to Logout ui.. 
*/
export default class Logout extends Component {

    state = {
        anchorEl: null,
        open: false,
        placement: null,
        profilePic: ""
    };
    /**
    * @description:it will toggle or reback the event
    */
    handleToggle = () => {
        try {
            this.setState(state => ({ open: !state.open }));
        } catch (err) {
            console.log("error at handleToggle1 in userProfile");
        }
    };
    /**
     * @description:it will close the current action event
     */
    handleClose = event => {
        try {
            if (this.anchorEl.contains(event.target)) {
                return;
            }
            this.setState({ open: false });
        } catch (err) {
            console.log("error at handleClose in userProfile");
        }
    };
    /**
    * @description:it will redirect to registration page
    */
    handlelogout = event => {
        try {
            event.preventDefault();
            this.props.props.props.history.push("/login");
        } catch (err) {
            console.log("error at registrationclick in userProfile");
        }
    };
    /**
     * @description:it will redirect to login page
     */
    handleregister = event => {
        try {
            event.preventDefault();
            this.props.props.props.history.push("/registration");
        } catch (err) {
            console.log("error at loginclick in userProfile");
        }
    };
    triggerInputFile() {
        this.fileInput.click();
    }
    handleClick = placement => event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement,
        }));
    };
    render() {
        const { anchorEl, open, placement } = this.state;
        // const { classes } = this.props;
        const userDetails = localStorage.getItem('username');
        const initial = userDetails.substring(0, 1);
        return (
            <div>
                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper id="papperlogout">
                                <ClickAwayListener onClickAway={this.handleToggle}>
                                    <div style={{ width: "280px", padding: "15px", marginTop: "13px" }}>
                                        <div id="userProfileDetails">
                                            <IconButton id="avatar">
                                                <Tooltip title="Change Profile">
                                                    <Avatar style={{ width: "80px", height: "80px", backgroundColor: "blur" }}
                                                        onClick={() => { this.triggerInputFile() }}>
                                                        {this.state.profilePic !== "" ?
                                                            <img style={{
                                                                width: "80px", height: "80px"
                                                            }} src={this.state.profilePic} alt="change Profile pic"></img>
                                                            :
                                                            <b style={{ fontSize: "33px" }}>{initial}</b>
                                                        }
                                                        <input ref={fileInput => this.fileInput = fileInput}
                                                            type="file" style={{ 'display': 'none' }}
                                                            className="uploadImage"
                                                            onChange={(evt) => this.uploadImage(evt)}
                                                        />
                                                    </Avatar>
                                                </Tooltip>
                                            </IconButton>
                                            <span style={{ marginTop: "-1px", marginLeft: "20px" }}>
                                                <p style={{ marginBottom: "0px" }}>{userDetails}<br></br> </p>
                                                <small style={{ marginBottom: "0px" }}>{localStorage.getItem('email')} </small>
                                            </span>
                                        </div>
                                        <Divider />
                                        <div id="profilebutton">
                                            <Button
                                                onClick={this.handleregister}>Add account</Button>
                                            <Button
                                                onClick={this.handlelogout}>Sign out</Button>
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
                <div className="iconButton">
                    <IconButton id="userProfileIcon">
                        <Tooltip
                           title={"Fundoo Account   :" + localStorage.getItem('username')}>
                            <Avatar style={{ width: "40px", height: "40px", backgroundColor: "blur" }} onClick={this.handleClick('bottom-end')} >
                                {this.state.profilePic !== "" ?
                                    <img style={{
                                        width: "40px", height: "40px"
                                    }} src={this.state.profilePic} alt="change Profile pic"></img>
                                    :
                                    initial
                                }
                            </Avatar>
                        </Tooltip>
                    </IconButton>
                </div>
            </div>
        );
    }
}


