import React, { Component } from 'react';
import { Card, Chip, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
// import EditPin from '../components/editPin';
import Tools from '../components/tools';
const theme = createMuiTheme({
    overrides: {
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
                height: 20
            }
        },

    },
    typography: {
        useNextVariants: true,
    },
})

export default class ReminderNavigator extends Component {
    render() {
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <MuiThemeProvider theme={theme}>
                <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>REMINDERS</label>
                <div className="CardsView" style={{ marginBottom: "30px" }}>
                    {this.props.remiderArray.map((key) => {
                        return (
                            <Card id="CreateNote2" style={{ backgroundColor: key.color }}>
                                <div >
                                    <div>
                                        <b> {key.title}</b>
                                    </div>
                                    <div>
                                        {key.description}
                                    </div >

                                    <div id="displaycontentdiv">
                                        <Tools
                                            createNotePropsToTools={this.props.getColor}
                                            note={key}
                                            noteID={key._id}
                                            reminder={this.props.reminderNote}
                                            // trashNote={this.props.trashNote}
                                            archiveNote={this.props.archiveNote}
                                        />
                                    </div>
                                </div>
                            </Card>
                            // <Card className={cardsView} style={{ backgroundColor: key.note.color, borderRadius: "10px", border: "1px solid #dadce0" }} >
                            //     <div>
                            //         <div>
                            //             {key.note.img !== "" ?
                            //                 <img style={{
                            //                     maxWidth: "100%",
                            //                     height: "auto"
                            //                 }} src={key.note.img} alt="cardImage"></img>
                            //                 : null}
                            //         </div>
                            //         <div style={{ display: "flex", justifyContent: "space-between" }}>
                            //             <b>{key.note.title}</b>
                            //             <EditPin cardPropsToPin={this.props.pinNote}
                            //                 noteID={key.note._id}
                            //                 pinStatus={key.note.pinned}
                            //             />
                            //         </div>
                            //         <div>
                            //             {key.note.description}
                            //         </div>
                            //         {key.note.reminder !== "" ?
                            //             <Chip
                            //                 label={key.note.reminder}
                            //                 onDelete={() => this.props.reminder("", key.note._id)} />
                            //             :
                            //             null}
                            //         {key.note.label.length > 0 ?
                            //             key.note.label.map((key1) =>

                            //                 <Chip
                            //                     label={key1}
                            //                     onDelete={() => this.props.deleteLabelFromNote(key1, key.note._id)}

                            //                 />
                            //             )
                            //             :
                            //             null}
                            //     </div>
                            //     <div className="noteicons">
                            //         <Tools
                            //             createNotePropsToTools={this.props.getColor}
                            //             deleteLabelFromNote={this.props.deleteLabelFromNote}
                            //             addLabelToNote={this.props.addLabelToNote}
                            //             note={key.note}
                            //             noteID={key.note._id}
                            //             reminder={this.props.reminderNote}
                            //             trashNote={this.props.trashNote}
                            //             archiveNote={this.props.archiveNote}
                            //             uploadImage={this.props.uploadImage}
                            //         />

                            //     </div>
                            // </Card>)
                        )
                    })
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}



