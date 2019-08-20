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
import { uploadProfilePic } from "../services/userServices.js";
import { NotificationManager } from 'react-notifications';
import '../App.css';
import  {deletePushToken}  from '../pushnotification.js';

/**
* @description:This method is used to Logout ui.. 
*/
export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
            profilePic: ""
        };
    }
    /**
    * @description:it will toggle or reback the event
    */
    handleToggle () {
        try {
            this.setState(state => ({ open: !state.open }));
        } catch (err) {
            console.log("error at handleToggle1 in userProfile");
        }
    };
    /**
     * @description:it will close the current action event
     */
    handleClose (event) {
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
    * @description:it will redirect to login page
    */
    handlelogout (event) {
        try {
            event.preventDefault();
            deletePushToken();

            localStorage.clear();
            this.props.props.props.history.push("/login");
        } catch (err) {
            console.log("error at registrationclick in userProfile");
        }
    };
    // handlelogout = event => {
    //     event.preventDefault();
    //     var data = {
    //         email: localStorage.getItem('email'),
    //         userId: localStorage.getItem('userId')
    //     }
    //     console.log("data in logout-->", data);
    //     deleteredis(data)
    //         .then((result) => {
    //             console.log("result at handlelogout in userprofile", result);
    //             localStorage.clear();
    //             this.props.props.props.history.push("/login");
    //         }).catch((err) => {
    //             console.log("error at registrationclick in userProfile", err);
    //         })
    // }
    /**
     * @description:it will redirect to registration page
     */
    handleregister (event) {
        try {
            event.preventDefault();
            this.props.props.props.history.push("/registration");
        } catch (err) {
            console.log("error at loginclick in userProfile");
        }
    };
    /**
     * @description:it trigger the event and enter into our file
     */
    triggerInputFile ()  {
        try {
            this.fileInput.click();
        } catch (err) {
            console.log("error at triggerInputFile in userProfile");
        }
    }
    componentDidMount() {
        if (localStorage.getItem("profilePic") !== 'undefined') {
            this.setState({
                profilePic: localStorage.getItem("profilePic")
            })
        }
    }
    /**
     * @description:it will upload the image
     * @param {*} e
     */
    uploadImage (e)  {
        let data = new FormData();
        console.log("image:------------", e.target.files[0]);
        data.append('image', e.target.files[0]);
        uploadProfilePic(data)
            .then((result) => {
                console.log("profile", result.data.data);
                localStorage.setItem('profilePic', result.data.data);
                this.setState({
                    profilePic: result.data.data
                })
            }).catch((error) => {
                NotificationManager.error(error);
                // alert(err);
            })
    }
    /**
     * @description:it will open the userProfile
     */
    handleClick (placement,event) {
        try {
            const { currentTarget } = event;
            this.setState(state => ({
                anchorEl: currentTarget,
                open: state.placement !== placement || !state.open,
                placement,
            }));
        } catch (err) {
            console.log("error at handleClick in userProfile");
        }
    };
    render() {
        const { anchorEl, open, placement } = this.state;
        const userDetails = localStorage.getItem('username');
        // const userDetails = localStorage.getItem('email');
        const initial = userDetails.substring(0, 1);
        return (
            <div>
                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper style={{ width: "100%", marginLeft: "10%" }}>
                                <ClickAwayListener onClickAway={this.handleToggle}>
                                    <div style={{ width: "280px", padding: "15px", marginTop: "5px" }}>
                                        <div id="userProfileDetails">
                                            <Tooltip title="Change Profile">
                                                <Avatar style={{ width: "100px", height: "100px", marginTop: "8px", backgroundColor: "blur" }}
                                                    onClick={() => { this.triggerInputFile() }}>
                                                    {this.state.profilePic !== "" ?
                                                        <img style={{
                                                            width: "-webkit-fill-available",
                                                            height: "-webkit-fill-available"
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
                                            <span style={{ marginTop: "10%", marginLeft: "12%" }}>
                                                <b>   {userDetails}   </b>
                                                {localStorage.getItem('email')}
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
                            <Avatar style={{ width: "35px", height: "35px", backgroundColor: "blur" }} onClick={this.handleClick('bottom-end')} >
                                {this.state.profilePic !== "" ?
                                    <img style={{
                                        width: "-webkit-fill-available",
                                        height: "-webkit-fill-available"
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
