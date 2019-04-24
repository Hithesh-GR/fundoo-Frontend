
import React, { Component } from 'react';
import {
    Tooltip, Input, Popper, Fade, ClickAwayListener, Paper,
    MenuItem, Avatar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    Dialog, DialogTitle, Divider, DialogContent, DialogActions,
    Button, createMuiTheme, MuiThemeProvider
} from '@material-ui/core';
import { black } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';
import { searchList, } from '../services/noteServices';
/**
* import required files
*/
const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                width: "600px",
                height: "280px",
                margin: "0px",
            },
        },
        MuiPaper: {
            root: {
                margin: "0px",
                zIndex: "1"
            },
            rounded: {
                borderRadius: "8px"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
const styles = {
    text: {
        backgroundColor: white,
        color: black,
    },
};
export class CollaboratorDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: 'paper',
            word: '',
            anchorEl: null,
            open: false,
            placement: null,
            firstName: '',
            lastName: '',
            email: '',
            userId: '',
            list: [],
        }
    }
    /**
    * @description:it will open the more options event and in that
                    we can select add the labels and delete notes operations
    * @param {*open the more options event} event
    */
    handleClick = (event) => {
        try {
            const { currentTarget } = event;
            this.setState(state => ({
                anchorEl: currentTarget,
                open: !state.open,

            }));
        } catch (err) {
            console.log("error at clickMoreOptions in moreOptions");
        }
    }
    /**
    * it will toggle or reback the event
    */
    handleToggle = () => {
        try {
            this.setState(state => ({ open: !state.open }));
        } catch (error) {
            console.log(error.message);
        }
    };
    /**
    * it will close the current action event
    */
    handleClosePopper = event => {
        // if (this.anchorEl.contains(event.target)) {
        // return;
        // }
        try {
            this.setState({ open: false });
        } catch (error) {
            console.log(error.message);
        }
    };
    /**
    * handles search of user list
    */
    handleSearch = (word) => {
        try {
            const data = {
                searchWord: word
            }
            searchList(data)
                .then(res => {
                    console.log(res);
                    this.setState({
                        list: res.data.data.details,
                        firstName: res.data.data.details.firstName,
                        lastName: res.data.data.details.lastName,
                        email: res.data.data.details.email,
                        userId: res.data.data.details.userId
                    })
                }).catch(err => {
                    console.log(err.message);
                })
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
    * to display selected email
    */
    setCollab = (val) => {
        try {
            this.setState({
                word: val.email,
                firstName: val.firstName,
                lastName: val.lastName,
                email: val.email,
                userId: val.userId
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
    * to add collaborator
    */
    addCollab = () => {
        try {
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                userId: this.state.userId,
            }
            console.log(data);
            this.props.addCollabNotes(data, this.props.noteId);
            this.setState({
                word: ''
            })
        } catch (error) {
            console.log(error.message);
        }

    }
    /**
    * to add collaborator and exit
    */
    saveCollab = () => {
        try {
            console.log("ghjgj");
            if (this.state.word === '') {
                this.props.close();
            } else {
                const data = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    userId: this.state.userId,
                }
                this.props.addCollabNotes(data, this.props.noteId);
                this.setState({
                    word: ''
                })
                this.props.close();
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
    * to remove collaborator
    */
    removeCollab = (noteId, collabId, collabUser) => {
        try {
            const id = [noteId];
            const cuserId = [collabId];
            this.props.handleRemoveCollab(id, cuserId, collabUser);
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
    * handles close
    */
    handleClose = () => {
        try {
            this.props.close();
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
    * displays collaborator dialog
    */
    render() {
        // console.log("list", this.state.list);
        // console.log("note", this.props.note);

        const { classes, close, collabData, addCollabNotes, note, noteId,
            handleRemoveCollab, ...other } = this.props;
        const { anchorEl, open } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <Dialog
                    scroll={this.state.scroll}
                    onClose={this.handleClose}
                    {...other}
                >
                    <DialogTitle>Collaborators</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <div id="collabContent">
                            <Avatar id="collabIcon" style={{ backgroundColor: "#003366" }} >
                                D
                            </Avatar>
                            <div id="userInfo">
                                <div>
                                    {localStorage.getItem('userName')}(Owner)
                            </div>
                                <div id="userId">
                                    {localStorage.getItem('email-id')}
                                </div>
                            </div>
                        </div>
                        {note === undefined ?
                            null
                            :
                            Object.keys(note.collaborators).map(key => (
                                <div id="userContent" key={key}>
                                    <Avatar id="collabIcon" style={{ backgroundColor: '#003366' }}>
                                        {note.collaborators[key].firstName.substring(0, 1).toUpperCase()}
                                    </Avatar>
                                    <div id="userInfo">
                                        <div>
                                            {note.collaborators[key].firstName}
                                            {note.collaborators[key].lastName}
                                        </div>
                                        <div id="userId">{note.collaborators[key].email}</div>
                                    </div>
                                    <div id="removeIcon" onClick={() => this.removeCollab(note.id,
                                        note.collaborators[key].userId, note.collaborators[key])}>
                                        <img src={require('../assets/images/clear.svg')} alt="" style={{
                                            opacity: '0.5', cursor: 'pointer'
                                        }} />
                                    </div>
                                </div>
                            ))
                        }
                        <div id="AddUsersToCollab">
                            <Avatar id="collabIcon" style={{
                                backgroundColor: '#fff', border: '1px solid #555'
                            }}>
                                < img src={require('../assets/images/add-person.svg')} alt="" style={{
                                    opacity: '0.5'
                                }} />
                            </Avatar>
                            <Input
                                className="AddUser"
                                disableUnderline={true}
                                name="collab"
                                type="text"
                                placeholder="Person or email to share with"
                                onKeyUp={() => { this.handleSearch(this.state.word) }}
                                value={this.state.word}
                                onClick={this.handleClick}
                                onChange={(event) => this.setState({ word: event.target.value })}
                            />
                            <div id="doneIcon" onClick={() => this.addCollab()}>
                                <img src={require('../assets/images/done.svg')} alt="" style={{
                                    opacity: '0.5', cursor: 'pointer'
                                }} />
                            </div>
                        </div>
                        <Popper open={open} anchorEl={anchorEl} placement={'bottom-start'}
                            transition style={{ zIndex: 1500 }}>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={0}>
                                    <ClickAwayListener onClickAway={() => this.handleClosePopper()}>
                                        <Paper style={{ width: "300px", maxHeight: 200, overflow: 'auto' }} >
                                            <div >
                                                {this.state.list.map((val, i) => (
                                                    <MenuItem key={i}
                                                        onClick={() => this.setCollab(val)}>{val.email}</MenuItem>
                                                ))}
                                            </div>
                                        </Paper>
                                    </ClickAwayListener>
                                </Fade>
                            )}
                        </Popper>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.saveCollab}>Save</Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider >
        )
    }
}
const CollaboratorDialogWrapped = withStyles(styles)(CollaboratorDialog);
class Collaborator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

        }
    }
    /**
    * handles open
    */
    handleOpen = () => {
        try {
            this.setState({ open: true })
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
    * handles close
    */
    handleClose = () => {
        try {
            this.setState({ open: false })
        } catch (error) {
            console.log(error.message);
        }
    }
    /**
    * displays collaborator icon
    */
    render() {
        return (
            <div>
                <Tooltip title="Collaborator" onClick={this.handleOpen}>
                    <img src={require('../assets/images/collaborator.svg')} alt=""
                        style={{
                            opacity: "0.75", cursor: "pointer", height:
                                "28px", marginTop: '8px'
                        }} />
                </Tooltip>
                <CollaboratorDialogWrapped
                    open={this.state.open}
                    close={this.handleClose}
                    addCollabNotes={this.props.addCollabNotes}
                    note={this.props.note}
                    noteId={this.props.noteId}
                    handleRemoveCollab={this.props.handleRemoveCollab}
                />
            </div>
        )
    }
}
export default Collaborator;
