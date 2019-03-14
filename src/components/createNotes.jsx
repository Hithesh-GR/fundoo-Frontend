/****************************************************************************************
 *  @Purpose        : Here we have to create the new Notes.
 *  @file           : createNotes.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import { Input, Card, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import Tools from './tools';
import { Button } from '@material-ui/core';
import { createNote } from '../services/noteServices';
import EditPin from '../components/editPin';
import UploadImage from './uploadImage';
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: "15px",
            },
            elevation1: {
                boxShadow: "0 3px 5px rgba(0,0,0,0.20)"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class createNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            title: "",
            description: "",
            reminder: "",
            color: "rgb(255, 255, 255)",
            pinned: false,
            image: "",
            archive: false,
            trash: false,
            newNote: {}
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
        this.handleReminder = this.handleReminder.bind(this);
        this.handlePinned = this.handlePinned.bind(this);
    }
    /**
     * @description:it will handle the title event
     * @param {*event for title} evt 
     */
    handleTitle(evt) {
        try {
            this.setState({ title: evt.target.value })
        } catch (err) {
            console.log("error at handleTitle in createNotes");
        }
    }
    /**
     * @description:it will handle the description event
     * @param {*event for description} evt 
     */
    handleDescription(evt) {
        try {
            this.setState({ description: evt.target.value })
        } catch (err) {
            console.log("error at handleDescription in createNotes");
        }
    }
    /**
     * @description:it will handle the reminder event
     * @param {*value for reminder} value 
     */
    handleReminder(value) {
        try {
            this.setState({ reminder: value })
        } catch (err) {
            console.log("error at handleReminder in createNotes");
        }
    }
    handleColor(value) {
        this.setState({ color: value });
    }

    handleArchive(value) {
        this.setState({ archive: value });
    }

    handlePinned(value) {
        this.setState({ pinned: value });
    }
    /**
     * @description:it will handle the creating a new note
     */
    handleToggle() {
        try {
            this.setState({ openNote: !this.state.openNote });
            console.log("pinned", this.state.openNote);
            if (this.state.title !== '' || this.state.description !== '' || this.state.color !== "rgb(255, 255, 255)") {
                const note = {
                    userId:localStorage.getItem('userId'),
                    title: this.state.title,
                    description: this.state.description,
                    reminder: this.state.reminder,
                    color: this.state.color,
                    image: this.state.image,
                    archive: this.state.archive,
                    pinned: this.state.pinned,
                    trash: this.state.trash,
                }
                createNote(note)
                    .then((result) => {
                        console.log("result from back-end====>",result);
                        
                        this.setState({
                            newNote: result.data.data
                        })
                        // this.props.getNewNote(this.state.newNote)
                    })
                    .catch((error) => {
                        alert(error);
                    })
                this.setState({
                    title: "",
                    description: "",
                    reminder: "",
                    color: "rgb(255, 255, 255)",
                    image: "",
                    archive: false,
                    pinned: false,
                    trash: false
                })
            }
        } catch (err) {
            console.log("error at handleToggle in createNotes");
        }
    }
    render() {
        return (!this.state.openNote ?
            <MuiThemeProvider theme={theme}>
                <div id="createNoteParent">
                    <Card className="createNote">
                        <div className="staticCreateNote">
                            <Input
                                className="noteInputBase1"
                                multiline
                                disableUnderline={true}
                                placeholder="Take a note ...."
                                readOnly={true}
                                onClick={this.handleToggle}
                                value=""
                            />
                            <UploadImage/>
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
            :
            <MuiThemeProvider theme={theme}>
                <div id="createNoteParent">
                    <Card className="createNote1" style={{ backgroundColor: this.state.color }}>
                        <div className="createNotePinIcon">
                            <Input
                                className="noteInputBase"
                                multiline
                                disableUnderline={true}
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleTitle}
                            />
                            <EditPin
                                pinStatus={this.state.pinned}
                                cardPropsToPin={this.handlePinned}
                            />
                        </div>
                        <Input
                            className="noteInputBase"
                            multiline
                            disableUnderline={true}
                            placeholder="Take a note..."
                            value={this.state.description}
                            onChange={this.handleDescription}
                        />
                        <div className="cardToolsClose" >
                            <Tools
                                createNotePropsToTools={this.handleColor}
                                archiveNote={this.handleArchive}
                                archiveStatus={this.state.archive}
                            />
                            <Button onClick={this.handleToggle}>Close</Button>
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}

