import React, { Component } from 'react';
import { Dialog, Input, Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Tools from '../components/tools';
import EditPin from '../components/editPin';
const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paper: {
                borderRadius: "20px",
                boxShadow: "0 3px 5px rgba(0, 0, 0, 0.20)",
                overflowY: "inherit"
            }
        },
        MuiBackdrop:
        {
            root: {
                backgroundColor: "rgba(11, 11, 11, 0.18)"
            }
        },
        MuiInputBase:
        {
            multiline: {
                padding: "9px 30px 7px"
            }

        }
    },
     typography: {
        useNextVariants: true,
    },
})
export default class DialogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
            title: "",
            description: "",
            color: "",
            _id: "",
        }
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handleDescClick = this.handleDescClick.bind(this);
    }
    async handleTitleClick(evt) {
        await this.setState({ title: evt.target.value })
    }
    async handleDescClick(evt) {
        await this.setState({ description: evt.target.value })
    }
    async handleToggle(e) {
        console.log("this.state.title==>", this.state.title);
        console.log("this.state.description==>", this.state.description);
        await this.props.editTitle(this.state.title, this.state.note._id)
        await this.props.editDescription(this.state.description, this.state._id)
        this.props.closeEditBox(e);
    }
    getData = (note) => {
        console.log("note in dialog==>", note.title);
        if (note.title !== undefined || note.description !== undefined) {
            this.setState({
                note: note,
                title: note.title,
                color: note.color,
                description: note.description,
                _id: note._id,
            })
        }
    }
    closeDialogPopper = (e) => {
        this.props.closeEditBox(e);
    }
    render() {
        // console.log("note on dialog----", this.state.color);
        return (
            <MuiThemeProvider theme={theme}>
                <Dialog
                    aria-labelledby="responsive-dialog-title"
                    open={this.props.parentProps}
                    noteID={this.props.noteID}
                >
                    <div id="dialogbox" style={{ backgroundColor: this.state.color }} >
                        <div>
                            <Input
                                className="dialogInputBase"
                                disableUnderline={true}
                                placeholder="edit title"
                                multiline
                                value={this.state.title}
                                onChange={this.handleTitleClick}
                            />
                            <EditPin
                            />
                        </div>

                        <Input
                            className="dialogInputBase"
                            disableUnderline={true}
                            placeholder="edit note"
                            multiline
                            value={this.state.description}
                            onChange={this.handleDescClick}
                        />

                        <div className="cardToolsDialog">
                            <Tools
                                createNotePropsToTools={this.props.getColor}
                                // note={key}
                                // noteID={key._id}
                                reminder={this.props.reminder}
                                trashNote={this.props.trashNote}
                                // archiveStatus={key.archive}
                                archiveNote={this.props.archiveNote}
                            />
                            <Button id="doneButton" onClick={this.handleToggle.bind(this)}>Close</Button>
                        </div>
                    </div>
                </Dialog>
            </MuiThemeProvider>
        )
    }
}
