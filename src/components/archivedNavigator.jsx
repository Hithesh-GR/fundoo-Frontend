

import React, { Component } from 'react';
import { Card, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
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
class ArchivedNavigator extends Component {
    render() {
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <MuiThemeProvider theme={theme}>
                <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>ARCHIVE</label>
                <div className="CardsView">
                    {this.props.archiveArray.map((key) => {
                        return (
                            // <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "10px", border: "1px solid #dadce0" }} >
                            //     <div>
                            //         <div>
                            //             {key.image !== "" ?
                            //                 <img className="commonImg"
                            //                     src={key.image} alt="cardImage"></img>
                            //                 : null}
                            //         </div>
                            //         <div style={{ display: "flex", justifyContent: "space-between" }}>
                            //             <b>{key.title}</b>

                            //             <EditPin cardPropsToPin={this.props.pinNote}
                            //                 noteID={key._id}
                            //                 pinStatus={key.pinned}
                            //             />
                            //         </div>
                            //         <div>
                            //             {key.description}
                            //         </div>
                            //         {key.reminder ?

                            //             <Chip
                            //                 label={key.reminder}
                            //                 onDelete={() => this.props.reminder("", key._id)} />
                            //             :
                            //             null}
                            //         {key.label.length > 0 ?
                            //             key.label.map((key1) =>

                            //                 <Chip
                            //                     label={key1}
                            //                     onDelete={() => this.props.deleteLabelFromNote(key1, key._id)}
                            //                 />

                            //             )
                            //             :
                            //             null}

                            //     </div>
                            //     <div className="noteicons">
                            //         <Tools createNotePropsToTools={this.props.getColor}
                            // addLabelToNote={this.props.addLabelToNote}
                            //             note={key}
                            //             noteID={key._id}
                            //             reminder={this.props.reminder}
                            //             trashNote={this.props.trashNote}
                            //             archiveStatus={key.archive}
                            //             archiveNote={this.props.archiveNote}

                            //         />

                            //     </div>
                            // </Card>
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
                                            // addLabelToNote={this.props.addLabelToNote}
                                            note={key}
                                            noteID={key._id}
                                            reminder={this.props.reminder}
                                            trashNote={this.props.trashNote}
                                            archiveStatus={key.archive}
                                            archiveNote={this.props.archiveNote}
                                        />
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}
export default ArchivedNavigator;


