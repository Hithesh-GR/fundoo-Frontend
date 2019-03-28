import React, { Component } from 'react';
import { Card, Chip } from '@material-ui/core';
import Tools from '../components/tools';
import EditPin from '../components/editPin';
export default class PinAndOthers extends Component {
    render() {
        let cardsView = this.props.noteProps ? "cards" : "listCards";
        return (
            <div>
                <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>PINNED</label>
                <div className="CardsView" style={{ marginBottom: "30px" }}>
                    {this.props.pinArray.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0" }} >
                                <div>
                                    <div>
                                        {/* {key.note.img !== "" ?
                                            <img style={{
                                                maxWidth: "100%",
                                                height: "auto"
                                            }} src={key.note.img} alt="cardImage"></img>
                                            : null} */}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>
                                        <EditPin cardPropsToPin={this.props.pinNote}
                                            noteID={key._id}
                                            pinStatus={key.pinned}
                                        />
                                    </div>
                                    <div>
                                        {key.description}
                                    </div>
                                    {key.reminder ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={() => this.props.reminder("", key._id)}
                                        />
                                        :
                                        null}
                                    {/* {keylabel.length > 0 ?
                                        key.label.map((key1) =>
                                            <Chip
                                                label={key1}
                                                onDelete={() => this.props.deleteLabelFromNote(key1, key._id)}
                                            />
                                        )
                                        :
                                        null} */}
                                </div>
                                <div className="noteicons">
                                    <Tools
                                        createNotePropsToTools={this.props.createNotePropsToTools}
                                        // deleteLabelFromNote={this.props.deleteLabelFromNote}
                                        // addLabelToNote={this.props.addLabelToNote}
                                        archiveNote={this.props.archiveNote}
                                        noteID={key._id}
                                        archiveStatus={key.archive}
                                        reminder={this.props.reminder}
                                        note={key}
                                        trashNote={this.props.trashNote}
                                        uploadImage={this.props.uploadImage}
                                    />
                                </div>
                            </Card>)
                    })
                    }
                </div>
                <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>OTHERS</label>
                <div className="CardsView">
                    {this.props.othersArray.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0" }} >
                                <div>
                                    <div>
                                        {/* {key.image !== "" ?
                                            <img style={{
                                                maxWidth: "100%",
                                                height: "auto"
                                            }} src={key.image} alt="cardImage"></img>
                                            : null} */}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>
                                        <EditPin cardPropsToPin={this.props.pinNote}
                                            noteID={key._id}
                                            pinStatus={key.pinned}
                                        />
                                    </div>
                                    <div>
                                        {key.description}
                                    </div>
                                    {key.reminder ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={() => this.props.reminder("", key._id)}
                                        />
                                        :
                                        null}
                                    {/* {key.label.length > 0 ?
                                        key.label.map((key1) =>
                                            <Chip
                                                label={key1}
                                                onDelete={() => this.props.deleteLabelFromNote(key1, key._id)}
                                            />
                                        )
                                        :
                                        null} */}
                                </div>
                                <div className="noteicons">
                                    <Tools createNotePropsToTools={this.props.getColor}
                                        // addLabelToNote={this.props.addLabelToNote}
                                        // deleteLabelFromNote={this.props.deleteLabelFromNote}
                                        note={key}
                                        noteID={key._id}
                                        reminder={this.props.reminder}
                                        archiveNote={this.props.archiveNote}
                                        trashNote={this.props.trashNote}
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