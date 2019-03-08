/****************************************************************************************
 *  @Purpose        : Here we have to create the user profile.
 *  @file           : userProfile.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react'
import Popper from '@material-ui/core/Popper';
import { IconButton, MenuItem, Paper, Avatar } from '@material-ui/core'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: true,
            open: false
        };
    }
    /**
     * @description:it will toggle or reback the event
     */
    handleToggle1 = () => {
        this.setState(state => ({ open: !state.open }));
    };
    /**
     * @description:it will close the current action event
     */
    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false });
    };
    /**
    * @description:it will redirect to registration page
    */
    registrationclick = e => {
        e.preventDefault();
        // this.props.history.push('/registration');
        window.location.href = "/registration";
    };
    /**
     * @description:it will redirect to login page
     */
    loginclick = e => {
        e.preventDefault();
        // this.props.props.history.push('/login');
        window.location.href = "/login";
    };
    render() {
        const { open } = this.state;
        return (
            <div>
                <div className="iconButton">
                    <IconButton
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        aria-owns={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle1}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={require("../assets/images/hithu.jpg")}
                            title="Fundoo Account:Hithesh G R"
                        />
                    </IconButton>
                </div>
                <Popper
                    open={open}
                    anchorEl={this.anchorEl}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === "top"
                                        ? "center top"
                                        : "center top"
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem onClick={this.registrationclick}>
                                            Add account
                                            </MenuItem>
                                        <MenuItem onClick={this.loginclick}>
                                            Logout
                                            </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>

        )

    }
}




















// import React, { Component } from 'react'
// import Popper from '@material-ui/core/Popper';
// import { IconButton, MenuItem, Paper, Tooltip, Avatar } from '@material-ui/core'
// import Fade from '@material-ui/core/Fade';


// class UserProfile extends Component {
//     privateNote(e) {
//         e.preventDefault();
//         localStorage.clear();
//         window.location.href = '/registration';
//     }
//     state = {
//         anchorEl: null,
//         open: false,
//         placement: null,
//         profilePic: ""
//     };

//     handleClick = placement => event => {
//         const { currentTarget } = event;

//         this.setState(state => ({
//             anchorEl: currentTarget,
//             open: state.placement !== placement || !state.open,
//             placement,
//         }));
//     };

//     triggerInputFile() {
//         this.fileInput.click();
//     }
//     componentDidMount() {
//         if (localStorage.getItem("profilePic") !== 'undefined') {
//             this.setState({
//                 profilePic: localStorage.getItem("profilePic")
//             })
//         }
//     }

//     render() {
//         const { anchorEl, open, placement } = this.state;
//         const userDetails = localStorage.getItem('username');
//         const initial = userDetails.substring(0, 1)                                                                                                                                                                                                                                                                                                      
//         if (localStorage.getItem('token1') !== "true")
//             return (
//                 window.location.href = '/'
//             )
//         else {
//             return (
//                 <div>
//                     <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
//                         {({ TransitionProps }) => (
//                             <Fade {...TransitionProps} timeout={350}>
//                                 <Paper>

//                                     <div style={{ width: "250px", padding: "10px" }}>
//                                         <div className="userProfileDetails">
//                                             <IconButton id="avatar">
//                                                 <Tooltip title="Change Profile">
//                                                     <Avatar style={{ width: "80px", height: "80px", backgroundColor: "#002884" }}
//                                                         onClick={() => { this.triggerInputFile() }}>
//                                                         {this.state.profilePic !== "" ?
//                                                             <img style={{
//                                                                 width: "80px", height: "80px"
//                                                             }} src={this.state.profilePic} alt="change Profile pic"></img>
//                                                             :
//                                                             <b style={{ fontSize: "33px" }}>{initial}</b>
//                                                         }

//                                                         <input ref={fileInput => this.fileInput = fileInput}
//                                                             type="file" style={{ 'display': 'none' }}
//                                                             className="uploadImage"
//                                                             onChange={(evt) => this.uploadImage(evt)}
//                                                         />
//                                                     </Avatar>
//                                                 </Tooltip>
//                                             </IconButton>


//                                             <div style={{ marginTop: "10px", marginLeft: "5px" }}>
//                                                 <p style={{ marginBottom: "0px" }}>{userDetails}</p>

//                                             </div>
//                                         </div>
//                                         <MenuItem style={{
//                                             borderBottomRightRadius: "0px",
//                                             borderTopRightRadius: "0px"
//                                         }}
//                                             onClick={this.privateNote}>Logout</MenuItem>

//                                     </div>
//                                 </Paper>
//                             </Fade>
//                         )}
//                     </Popper>

//                     <IconButton id="userProfileIcon">


//                             <Avatar style={{ width: "40px", height: "40px", backgroundColor: "#002884" }} onClick={this.handleClick('bottom-end')} >
//                                 {this.state.profilePic !== "" ?
//                                     <img style={{
//                                         width: "40px", height: "40px"
//                                     }} src={this.state.profilePic} alt="change Profile pic"></img>
//                                     :
//                                     initial
//                                 }
//                             </Avatar>

//                     </IconButton>

//                 </div>

//             )
//         }
//     }
// }
// export default UserProfile;