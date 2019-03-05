/*************************************************************************************
 *  @Purpose        : To create dashboard for displaying chatMessages and users list.
 *  @file           : dashboard.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 ************************************************************************************/
import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { MenuItem } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import SideNavigation from "../components/sideNavigation";
import "../App.css";
export default class dashBoard extends React.Component {
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
    handleToggle = () => {
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
        this.props.history.push('/registration');
    };
    /**
     * @description:it will redirect to login page
     */
    loginclick = e => {
        e.preventDefault();
        this.props.history.push('/login');
    };
    render() {
        const { open } = this.state;
        return (
            <div>
                <div className="root">
                    <AppBar position="fixed" color="inherit">
                        <Toolbar>
                        <SideNavigation />
                            <div className="keepImage">
                                <img src={require("../assets/images/keep_48dp.png")}
                                    alt="" />
                            </div>
                            <div className="fundoTitle">
                                <span>Fundoo</span>
                            </div>
                            <div className="search">
                                <div className="searchIcon">
                                    <SearchIcon />
                                </div>
                                <div className="searchField">
                                    <InputBase placeholder="Search" className="inputRoot" />
                                </div>
                            </div>
                            <div className="appList">
                                <img
                                    src={require("../assets/images/grid.svg")}
                                    alt=""
                                    title="List View"
                                />
                            </div>
                            <div>
                                <div className="iconButton">
                                    <IconButton
                                        buttonRef={node => {
                                            this.anchorEl = node;
                                        }}
                                        aria-owns={open ? "menu-list-grow" : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleToggle}
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
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}
export { dashBoard };