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
import ArchivedNavigator from "../components/sideNavigation/archivedNavigator"
import { getNotes, updateColor, deleteNoteForever, updateArchiveStatus } from '../services/noteServices';
// import { otherArray } from '../services/noteServices';
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

    deleteNote = (noteId) => {
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
                alert(error)
            });
    }

    displayNewCard(newCard) {
        // console.log("newCard", newCard.note);
        this.setState({
            notes: [...this.state.notes, newCard]
        })
    }
    render() {
        // let cardsView = this.props.noteProps ? "listCards" : "cards";
        if ((this.props.searchNote !== "" || this.state.label) && (!this.props.navigateArchived
            && !this.props.navigateReminder && !this.props.navigateTrashed)) {
            return (
                <ArchivedNavigator
                    // addLabelToNote={this.addLabelToNote}
                    // archiveArray={archiveArray(this.state.notes)}
                    // pinNote={this.pinNote}
                    // othersArray={otherArray}
                    // deleteLabelFromNote={this.deleteLabelFromNote}
                    // getColor={this.getColor}
                    // noteProps={this.props.noteProps}
                    // reminder={this.reminderNote}
                    // trashNote={this.trashNote}
                    archiveNote={this.archiveNote}
                // uploadImage={this.uploadImage} 
                />
            )
        }
        else {
            return (
                <div >
                    {
                        Object.keys(this.state.notes).slice(0).reverse().map((key) => {
                            // console.log("=====================", this.state.notes[0].color);
                            return (
                                <div>
                                    <Card id="CreateNote2" style={{ backgroundColor: this.state.notes[key].color }}>
                                        <div >
                                            <div>
                                                <b> {this.state.notes[key].title}</b>
                                            </div>
                                            <div>
                                                {this.state.notes[key].description}
                                            </div >

                                            <div id="displaycontentdiv">
                                                <Tools
                                                    createNotePropsToTools={this.getColor}
                                                    // deleteLabelFromNote={this.deleteLabelFromNote}
                                                    // collab={otherArr[key].collab}
                                                    // owner={otherArr[key].owner}
                                                    // addLabelToNote={this.addLabelToNote}
                                                    archiveNote={this.archiveNote}
                                                    noteID={this.state.notes[key]._id}
                                                    archiveStatus={this.state.notes[key].archive}
                                                // reminder={this.reminderNote}
                                                // note={otherArr[key].note}
                                                // trashNote={this.trashNote}
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



// import React, { Component } from 'react';
// import { Card, Chip, Tooltip, Avatar } from '@material-ui/core';
// import Tools from '../components/tools';
// import EditPin from '../components/editPin';
// import DialogBox from '../components/dialogBox';
// import PinAndOthers from '../components/notePin';
// import { getNotes, updateColor, updatePin, setReminder, isTrashed, updateArchiveStatus, deleteNoteForever, updateTitle, updateDescription, saveLabel, updateImages } from '../services/noteServices'
// import ArchivedNavigator from "../components/sideNavigation/archivedNavigator"
// import ReminderNavigator from '../components/sideNavigation/reminderNavigator';
// import TrashNavigator from '../components/sideNavigation/trashedNavigator';
// import { archiveArray, otherArray, trashArray, remiderArray, pinArray } from '../services/noteServices';
// import SearchedNotes from '../components/searchNote';
