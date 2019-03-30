import React, { Component } from 'react';
import { Card, Chip } from '@material-ui/core';
import EditPin from '../components/editPin';
import Tools from '../components/tools';
export default class SearchedNotes extends Component {
    render() {
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <div>
                <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "660px" }}>SEARCHED NOTES</label>
                <div className="CardsView" >
                    {this.props.searchNote.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0" }} >
                                <div>
                                    <div>
                                        {key.image !== "" ?
                                            <img style={{
                                                maxWidth: "100%",
                                                height: "auto"
                                            }} src={key.image} alt="cardImage"></img>
                                            : null}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>
                                        <EditPin
                                            cardPropsToPin={this.props.pinNote}
                                            noteID={key._id}
                                            pinStatus={key.pinned}
                                        />
                                    </div>
                                    <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                        {key.description}
                                    </div>
                                    {key.reminder ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={() => this.props.reminder("", key._id)} />
                                        :
                                        null}
                                </div>
                                <div id="displaycontentdiv">
                                    <Tools
                                        createNotePropsToTools={this.props.getColor}
                                        note={key}
                                        noteID={key._id}
                                        reminder={this.props.reminderNote}
                                        trashNote={this.props.trashNote}
                                        archiveNote={this.props.archiveNote}
                                        archiveStatus={key.archive}
                                        uploadImage={this.props.uploadImage}
                                    />

                                </div>

                            </Card>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}
