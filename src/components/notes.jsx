
import React, { Component } from 'react';
import { Card, Chip, MuiThemeProvider, createMuiTheme, Tooltip, Avatar } from '@material-ui/core';
import Tools from '../components/tools';
import { getNotes, updateColor, updatePin, setReminder, isTrashed, updateArchiveStatus, deleteNoteForever, updateTitle, updateDescription } from '../services/noteServices';
import EditPin from '../components/editPin';
import ClockIcon from '../components/clockIcon';
import { otherArray } from '../services/noteServices';
import DialogBox from '../components/dialogBox';
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            elevation1: {
                boxShadow: "0px"
            }
        },
        MuiChip: {
            root: {
                fontSize: 10,
                marginTop: 15,
                height: 20,
                backgroundColor: "rgba(0, 0, 0, 0.10)",
                padding: 2
            },
            deleteIcon: {
                width: 20,
                height: 20,

            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class Notes extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            notes: [],
            label: false
        }
        this.cardsToDialogBox = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.getColor = this.getColor.bind(this);
        this.pinNote = this.pinNote.bind(this);
        this.reminderNote = this.reminderNote.bind(this);
        this.trashNote = this.trashNote.bind(this);
        this.archiveNote = this.archiveNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.editTitle = this.editTitle.bind(this);
        this.editDescription = this.editDescription.bind(this);
        this.closeEditBox = this.closeEditBox.bind(this);
    }
    async handleClick(note) {
        await this.setState({ open: true })
        this.cardsToDialogBox.current.getData(note);
    }
    closeEditBox() {
        this.setState({ open: false })
    }
    componentDidMount() {
        getNotes()
            .then((result) => {
                this.setState({
                    notes: result
                })
                console.log("get notes", result);
            })
            .catch((error) => {
                alert(error)
            });
    }
    getColor(value, noteId) {
        const color = {
            noteID: noteId,
            color: value
        }
        updateColor('/updateColor', color)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.color = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }
    editTitle(value, noteId) {
        const title = {
            noteID: noteId,
            title: value
        }
        updateTitle('/editTitle', title)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.title = result.data.data;
                        this.setState({
                            notes: newArray
                        })

                    }
                }

            })
    }
    editDescription(value, noteId) {
        const description = {
            noteID: noteId,
            description: value
        }
        updateDescription('/editDescription', description)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.description = result.data.data;
                        this.setState({
                            notes: newArray
                        })

                    }
                }
            })
    }
    trashNote(noteId) {
        const trash = {
            noteID: noteId
        }
        isTrashed('/isTrashed', trash)
            .then((result) => {
                let newArray = this.state.notes

                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.trash = result.data.data;
                        newArray[i].note.pinned = false;
                        newArray[i].note.archive = false
                        this.setState({
                            notes: newArray,

                        })
                    }

                }

            })
            .catch((error) => {
                alert(error)
            });
    }
    deleteNote(noteId) {
        const obj = {
            noteID: noteId,
        }
        deleteNoteForever('/deleteNote', obj)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === obj.noteID) {
                        newArray.splice(i, 1);
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }
    pinNote(value, noteId) {
        const isPinned = {
            noteID: noteId,
            pinned: value
        }
        updatePin('/isPinned', isPinned)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.archive = false;
                        newArray[i].note.trash = false;
                        newArray[i].note.pinned = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }

            })
            .catch((error) => {
                alert(error)
            });
    }
    reminderNote(value, noteId) {
        const reminder = {
            noteID: noteId,
            reminder: value
        }
        setReminder('/reminder', reminder)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.reminder = result.data.data;

                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }
    archiveNote(value, noteId) {
        const isArchived = {
            noteID: noteId,
            archive: value
        }
        updateArchiveStatus('/isArchived', isArchived)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.archive = result.data.data;
                        newArray[i].note.pinned = false;
                        newArray[i].note.trash = false;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }
    displayNewCard(newCard) {
        this.setState({
            notes: [...this.state.notes, newCard]
        })
    }
    render() {
        let cardsView = this.props.noteProps ? "cards" : "listCards";
        let otherArr = otherArray(this.state.notes);
        return (
            <MuiThemeProvider theme={theme}>
                <div className="CardsView">
                    {Object.keys(otherArr).map((key) => {
                        console.log("otherArr", otherArr[key].note);
                        return (
                            <div key={key} id="cardsViewDiv">
                                <Card className={cardsView}
                                    style={{ backgroundColor: otherArr[key].note.color, borderRadius: "10px", border: "1px solid #dadce0" }}
                                >
                                    <div >
                                        <div>
                                            {otherArr[key].note.image !== "" ?
                                                <img style={{
                                                    maxWidth: "100%",
                                                    height: "auto"
                                                }} src={otherArr[key].note.image} alt="cardImage"></img>
                                                : null}
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <b onClick={() => this.handleClick(otherArr[key].note)} >
                                                {otherArr[key].note.title}
                                            </b>

                                            <EditPin cardPropsToPin={this.pinNote}
                                                noteID={otherArr[key].note._id}
                                                pinStatus={otherArr[key].note.pinned}
                                            />
                                        </div>

                                        <DialogBox
                                            ref={this.cardsToDialogBox}
                                            parentProps={this.state.open}
                                            handleEdit={this.handleClick}
                                            closeEditBox={this.closeEditBox}
                                            note={otherArr[key].note}
                                            editTitle={this.editTitle}
                                            editDescription={this.editDescription}
                                            createNotePropsToTools={this.getColor}

                                        />

                                        <div onClick={this.handleClick}>
                                            {otherArr[key].note.description}
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            {otherArr[key].collab.length > 0 ?
                                                // eslint-disable-next-line
                                                otherArr[key].collab.map((collabKey, index) => {
                                                    if (otherArr[key].owner.firstName !== "") {

                                                        return (
                                                            <div style={{ margin: "3px" }} key={index} >
                                                                {collabKey.userName !== localStorage.getItem('emailId') && otherArr[key].owner !== undefined ?
                                                                    <Tooltip title={collabKey.firstName + " " + collabKey.lastName + " (" + collabKey.userName + ")"}>
                                                                        <Avatar style={{ height: "30px", width: "30px", backgroundColor: "rgb(0,0,0,.10)" }}>
                                                                            {collabKey.firstName.substring(0, 1)}
                                                                        </Avatar>
                                                                    </Tooltip>
                                                                    : <Tooltip title={otherArr[key].owner.firstName + " " + otherArr[key].owner.lastName + " (" + otherArr[key].owner.userName + ")"}>
                                                                        <Avatar style={{ height: "30px", width: "30px", backgroundColor: "rgb(0,0,0,.10)" }}>
                                                                            {otherArr[key].owner.firstName.substring(0, 1)}
                                                                        </Avatar>
                                                                    </Tooltip>
                                                                }
                                                            </div>
                                                        )
                                                    }

                                                })
                                                : null
                                            }
                                        </div>

                                        {otherArr[key].note.reminder ?
                                            <Chip icon={<ClockIcon />}
                                                label={otherArr[key].note.reminder}
                                                onDelete={() => this.reminderNote('', otherArr[key].note._id)}
                                            />
                                            :
                                            null}
                                    </div>

                                    <div className="noteicons">
                                        <Tools createNotePropsToTools={this.getColor}
                                            collab={otherArr[key].collab}
                                            owner={otherArr[key].owner}
                                            archiveNote={this.archiveNote}
                                            noteID={otherArr[key].note._id}
                                            archiveStatus={otherArr[key].note.archive}
                                            reminder={this.reminderNote}
                                            note={otherArr[key].note}
                                            trashNote={this.trashNote}
                                        />
                                    </div>

                                </Card>
                            </div>
                        )
                    })}

                </div>
            </MuiThemeProvider>
        )
    }
}