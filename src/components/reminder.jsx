/*************************************************************************************************************
 *  @Purpose        : Here we have to create the reminder for setting the reminder for note.
 *  @file           : reminder.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 ***************************************************************************************************************/
import React, { Component } from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { Snackbar, IconButton } from '@material-ui/core';
import { MenuItem, Paper, Tooltip, ListItem, createMuiTheme, MuiThemeProvider, ClickAwayListener, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { askForPermissioToReceiveNotifications } from "../push-notification";
const theme = createMuiTheme({
    overrides: {
        MuiMenuItem: {
            root: {
                borderbottomrightradius: 0,
                bordertoprightradius: 0,
                height: "13px",
                marginTop: "8px",
                marginBottom: "8px",
                width: "268px",
                fontSize: "12px",
            }
        },
        MuiPaper: {
            root: {
                zIndex: "1"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class reminder extends Component {
    state = {
        anchorEl: null,
        open: false,
        placement: null,
        date: "",
        snak2open: false,
        title: "",
        description: ""

    };
    /**
     * @description:it handles the onclick on reminder event
     */
    handleClick = placement => event => {
        try {
            const { currentTarget } = event;
            this.setState(state => ({
                anchorEl: currentTarget,
                open: state.placement !== placement || !state.open,
                placement,
            }));
        } catch (err) {
            console.log("error at handleClick in reminder");
        }
    };
    /**
     * @description:it handles the close the current event
     */
    handleClose = () => {
        try {
            this.setState(state => ({ open: !state.open }))
        } catch (err) {
            console.log("error at handleClose in reminder");
        }
    }
    // setTodayReminder = () => {
    //     this.handleClose();
    //     let ampm = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
    //     var date = new Date().toDateString();
    //     var reminder1 = date + ", 8 " + ampm;
    //     console.log("today reminder data=====>", reminder1);
    //     this.props.reminder(reminder1, this.props.noteID)
    // }
    setTomorrowReminder = () => {
        this.handleClose();
        let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]
        var date = new Date().toDateString();
        date = date.replace(new Date().getDate().toString(), new Date().getDate() + 1);
        date = date.replace(days[new Date().getDay() - 1], days[new Date().getDay()]);
        var reminder1 = date + ", 8 AM";
        console.log("tomorow reminder data====>", reminder1);
        this.props.reminder(reminder1, this.props.noteID)
    }
    // setWeeklyReminder = () => {
    //     this.handleClose();
    //     var date = new Date().toDateString();
    //     date = date.replace(new Date().getDate().toString(), (new Date().getDate() + 7));
    //     var reminder1 = date + ", 8 AM";
    //     console.log("weekly reminder data=====>", reminder1);
    //     this.props.reminder(reminder1, this.props.noteID)
    // }
    handlesubmit = event => {
        event.preventDefault();
        this.handleClose();
        console.log("datedatedatedate", this.state.date);
        //console.log("notess in reminder==>", this.props.note);
        this.props.reminder(this.state.date, this.props.noteID);
    }
    componentDidUpdate() {
        console.log("reminder date in componentwillmount-->", this.props.date);
        if (this.props.date !== undefined && this.props.date !== "") {
            askForPermissioToReceiveNotifications(this.props.date, this.props.notetitle, this.props.notedescription)
                .then((diff) => {
                    console.log("difff in reminder-------", diff);
                    setTimeout(() => {
                        this.setState({ snak2open: true });
                        console.log("start----------->");
                        this.props.reminder("", this.props.noteID);
                    }, diff);
                })
                .catch((err) => {
                    console.log("error in set timeout reminder", err);
                })
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        //console.log("datedatedatedate", this.state.date);
    };
    handleClose1 = () => {
        this.setState({ snak2open: false });
    };
    render() {
        const setAMPM = this.props.parentToolsProps;
        const { anchorEl, open, placement } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Tooltip title="Remind me">
                        <img src={require('../assets/images/reminder.svg')}
                            // className="reminderIcon"
                            className="toolBtn"
                            onClick={this.handleClick('bottom-start')} alt="remider icon" />
                    </Tooltip>
                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{ zIndex: 9999 }}>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper id="reminderPopper">
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <div>
                                            <ListItem className="listRemindr" >Reminder:</ListItem>
                                            <MenuItem className="currentDate">
                                                <div>
                                                    <TextField
                                                        id="datetime-local"
                                                        type="datetime-local"
                                                        defaultValue="2019-04-10T10:28"
                                                        onChange={this.handleChange('date')}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </div>
                                                <div >
                                                    <Button onClick={this.handlesubmit} >
                                                        Save
                                                </Button>
                                                </div>
                                            </MenuItem>
                                            {/* <MenuItem className="currentDate" onClick={() => this.setTodayReminder()}>
                                            </MenuItem> */}
                                            <MenuItem className="currentDate" onClick={() => this.setTomorrowReminder()}>
                                                <div>Tomorrow</div>
                                                <div>8:00 AM</div>
                                            </MenuItem>
                                            {/* <MenuItem className="currentDate" onClick={() => this.setWeeklyReminder()}>
                                                <div>Next Week</div>
                                                <div>Mon, 8:00 AM</div>
                                            </MenuItem> */}
                                            <MenuItem className="currentDate">
                                                <div>Home</div>
                                                <div>Bangalore</div>
                                            </MenuItem>
                                            <MenuItem className="currentDate">
                                                <div>Work</div>
                                                <div>BridgeLabz Solutions LLP</div>
                                            </MenuItem>
                                        </div>
                                    </ClickAwayListener>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snak2open}
                        message={
                            <div>Reminder to Note :
                                {this.props.notetitle}
                            </div>
                        }
                        action={[
                            <Button key="undo" style={{ color: "#F1C40F" }} size="small" >
                                UNDO
                            </Button>,
                            <IconButton
                                onClick={this.handleClose1}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}
