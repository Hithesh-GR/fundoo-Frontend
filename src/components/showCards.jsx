
import React, { Component } from 'react';
import { Input, Card, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import Tools from '../components/tools';
import { Button } from '@material-ui/core';
import { createNote } from '../services/noteServices'
import EditPin from '../components/editPin';
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: "10px",
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
class CreateNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            title: "",
            description: "",
            color: "rgb(255, 255, 255)",
            reminder: "",
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
    handleToggle() {
        this.setState({ openNote: !this.state.openNote });
        console.log("pinned", this.state);

        if (this.state.title !== '' || this.state.description !== '' || this.state.color !== "rgb(255, 255, 255)") {
            const note = {
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
                    this.setState({
                        newNote: result.data.data
                    })
                    this.props.getNewNote(this.state.newNote)
                })

                .catch((error) => {
                    alert(error);
                })

            this.setState({
                title: "",
                description: "",
                reminder:"",
                color: "rgb(255, 255, 255)",
                image: "",
                archive: false,
                pinned: false,
                trash: false,
            })

        }

    }

    handleTitle(evt) {
        this.setState({ title: evt.target.value })
    }

    handleDescription(evt) {
        this.setState({ description: evt.target.value })
    }

    handleReminder(value) {
        this.setState({ reminder: value })
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
   

    render() {
        return (!this.state.openNote ?

            <MuiThemeProvider theme={theme}>
                <div id="createNoteParent">
                    <Card className="createNote">
                        <div className="staticCreateNote">
                            <Input
                                className="noteInputBase"
                                multiline
                                disableUnderline={true}
                                placeholder="Take a Note ...."
                                readOnly={true}
                                onClick={this.handleToggle}
                                value=""
                            />
                            <img src={require('../assets/images/imageUpload.svg')} alt="upload pic icon" />
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
                                className="titleInput"
                                disableUnderline={true}
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleTitle}
                            />
                            <div>
                                <EditPin
                                    pinStatus={this.state.pinned}
                                    cardPropsToPin={this.handlePinned} />
                            </div>
                        </div>

                        <Input
                            className="noteInputBase"
                            multiline
                            disableUnderline={true}
                            placeholder="Take a Note ...."
                            value={this.state.description}
                            onChange={this.handleDescription}
                        />
                        <div className="cardToolsClose" >
                            <Tools
                                createNotePropsToTools={this.handleColor}
                                archiveNote={this.handleArchive}
                                archiveStatus={this.state.archive} />
                            <Button onClick={this.handleToggle}>Close</Button>
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default CreateNotes;