/*****************************************************************************************************
 *  @Purpose        : 
 *  @file           : notes.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************************/
import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import Tools from '../components/tools';
import ArchivedNavigator from "../components/archivedNavigator";
import ReminderNavigator from "../components/reminderNavigator";
import TrashNavigator from '../components/trashedNavigator';
import { getNotes, updateColor, deleteNoteForever, updateArchiveStatus, setReminder, isTrashed } from '../services/noteServices';
import { otherArray, archiveArray, remiderArray, trashArray } from '../services/noteServices';
// import DialogBox from '../components/dialogBox'
import '../App.css';
export default class Cards extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            notes: [],
            label: false
        }
        this.cardsToDialogBox = React.createRef();
    }
    // async handleClick(note) {
    //     await this.setState({ open: true })
    //     this.cardsToDialogBox.current.getData(note);
    // }
    componentDidMount() {
        getNotes()
            .then((result) => {
                this.setState({
                    notes: result.data.data
                })
                console.log("getNotes result from back-end", result);
            })
            .catch((error) => {
                alert(error)
            });
    }

    getColor = (value, noteId) => {
        const color = {
            noteID: noteId,
            color: value
        }
        updateColor(color)
            .then((result) => {
                let newArray = this.state.notes;
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].color = result.data.data;
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

    archiveNote = (value, noteId) => {
        const isArchived = {
            noteID: noteId,
            archive: value
        }
        updateArchiveStatus(isArchived)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].archive = result.data.data;
                        newArray[i].pinned = false;
                        newArray[i].trash = false;
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

    reminderNote = (value, noteId) => {
        const reminder = {
            noteID: noteId,
            reminder: value
        }
        setReminder(reminder)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].reminder = result.data.data;
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

    trashNote = (noteId) => {
        const trash = {
            noteID: noteId
        }
        isTrashed(trash)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].trash = result.data.data;
                        newArray[i].pinned = false;
                        newArray[i].archive = false
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

    deleteNote = (noteId) => {
        const obj = {
            noteID: noteId,
        }
        deleteNoteForever('/deleteNote', obj)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === obj.noteID) {
                        newArray.splice(i, 1);
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
        let notesArray = otherArray(this.state.notes);
        if (this.props.navigateArchived) {
            return (
                <ArchivedNavigator
                    // addLabelToNote={this.addLabelToNote}
                    archiveArray={archiveArray(this.state.notes)}
                    // pinNote={this.pinNote}
                    othersArray={otherArray}
                    // deleteLabelFromNote={this.deleteLabelFromNote}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    reminder={this.reminderNote}
                    // trashNote={this.trashNote}
                    archiveNote={this.archiveNote}
                // uploadImage={this.uploadImage} 
                />
            )
        }
        else if (this.props.navigateReminder) {
            return (
                <ReminderNavigator
                    // addLabelToNote={this.addLabelToNote}
                    remiderArray={remiderArray(this.state.notes)}
                    // pinNote={this.pinNote}
                    othersArray={otherArray(this.state.notes)}
                    // deleteLabelFromNote={this.deleteLabelFromNote}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    reminder={this.reminderNote}
                // trashNote={this.trashNote}
                // uploadImage={this.uploadImage} 
                />
            )
        }
        else if (this.props.navigateTrashed) {
            return (
                <TrashNavigator
                    trashArray={trashArray(this.state.notes)}
                    // pinNote={this.pinNote}
                    // deleteLabelFromNote={this.deleteLabelFromNote}
                    othersArray={otherArray(this.state.notes)}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    trashNote={this.trashNote}
                    deleteNote={this.deleteNote}
                />
            )
        }
        else {
            let cardsView = this.props.noteProps ? "listCards" : "cards";
            return (
                <div className="CardsView"  >
                    {
                        Object.keys(notesArray).slice(0).reverse().map((key) => {
                            return (
                                <div key={key} id="cardsViewDiv">
                                    <Card className={cardsView} style={{ backgroundColor: notesArray[key].color, borderRadius: "10px", border: "1px solid #dadce0" }}>
                                        <div >
                                            {/* <div>
                                                {notesArray[key].image !== "" ?
                                                    <img style={{
                                                        maxWidth: "100%",
                                                        height: "auto"
                                                    }} src={notesArray[key].image} alt="cardImage"></img>
                                                    :
                                                    null}
                                            </div> */}
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <b> {notesArray[key].title}</b>
                                            </div>
                                            <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                                {notesArray[key].description}
                                            </div >
                                            {/* <DialogBox
                                                ref={this.cardsToDialogBox}
                                                parentProps={this.state.open}
                                                handleEdit={this.handleClick}
                                                closeEditBox={this.closeEditBox}
                                                note={notesArray[key].note}
                                                editTitle={this.editTitle}
                                                editDescription={this.editDescription}
                                                createNotePropsToTools={this.getColor}
                                            /> */}
                                            <div id="displaycontentdiv">
                                                <Tools
                                                    createNotePropsToTools={this.getColor}
                                                    // deleteLabelFromNote={this.deleteLabelFromNote}
                                                    // collab={noteArray[key].collab}
                                                    // owner={noteArray[key].owner}
                                                    // addLabelToNote={this.addLabelToNote}
                                                    archiveNote={this.archiveNote}
                                                    noteID={notesArray[key]._id}
                                                    archiveStatus={notesArray[key].archive}
                                                    reminder={this.reminderNote}
                                                    note={notesArray[key].note}
                                                    trashNote={this.trashNote}
                                                // uploadImage={this.uploadImage}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
            );
        }
    }
}

