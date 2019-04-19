/********************************************************************************
 *  @Purpose        : 
 *  @file           :        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *********************************************************************************/
import React, { Component } from 'react';
import { Card, MuiThemeProvider, createMuiTheme, Chip, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditPin from '../components/editPin';
import Tools from '../components/tools';
import DialogBox from '../components/dialogBox';
const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            root: {
                fontSize: 14,
                marginTop: 20,
                height: 25,
                backgroundColor: "rgba(0, 0, 0, 0.10)",
                padding: 0
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
export default class ArchivedNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnackBar: false,
        }
    }
    /**
    * @description:use to auto close snackBar
    */
    handleSnackClose = () => {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in login");
        }
    };
    render() {
        let cardsView = this.props.noteProps ? "cards" : "listCards";
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    {(this.props.archiveArray).length === 0 ?
                        <div>
                            <div id="blurimage"  >
                                <img src={require('../assets/images/menuArchive.svg')} alt="archive icon"
                                    style={{ width: "inherit" }}
                                />
                            </div>
                            <div id="text1" style={{ fontFamily: "georgia", color: "grey", fontSize: "25px", width: "inherit" }}>
                                Your archived notes appear here
                        </div>
                        </div>
                        :
                        <label style={{ fontFamily: "cursive", fontSize: "18px", color: "grey", marginRight: "760px" }}>ARCHIVE</label>
                    }
                    <div className="CardsView">
                        {this.props.archiveArray.map((key) => {
                            return (
                                <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0", wordBreak: "break-word" }}>
                                    <div className="DispCont" >
                                        <div>
                                            {key.image !== "" ?
                                                <img style={{
                                                    maxWidth: "100%",
                                                    height: "auto"
                                                }} src={key.image} alt="cardImage"></img>
                                                :
                                                null}
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <b> {key.title}</b>
                                            <EditPin
                                                cardPropsToPin={this.props.pinNote}
                                                noteID={key._id}
                                                pinStatus={key.pinned}
                                            />
                                        </div>
                                        <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                            {key.description}
                                        </div >
                                        {key.reminder ?
                                            <Chip
                                                label={key.reminder}
                                                onDelete={() => this.props.reminder("", key._id)} />
                                            :
                                            null}
                                        {key.label.length > 0 ?
                                            key.label.map((key1) =>
                                                <Chip
                                                    label={key1}
                                                    onDelete={() => this.props.deleteLabelFromNote(key1, key._id)}
                                                />
                                            )
                                            :
                                            null}
                                    </div>
                                    <div id="displaycontentdiv">
                                        <Tools
                                            createNotePropsToTools={this.props.getColor}
                                            note={key}
                                            noteID={key._id}
                                            reminder={this.props.reminder}
                                            trashNote={this.props.trashNote}
                                            archiveStatus={key.archive}
                                            archiveNote={this.props.archiveNote}
                                            uploadImage={this.props.uploadImage}
                                            addLabelToNote={this.props.addLabelToNote}
                                        />
                                    </div>
                                </Card>
                            )
                        })
                        }
                        <DialogBox
                            ispinned={this.props.ispinned}
                            ref={this.props.cardsToDialogBox}
                            parentProps={this.props.open1}
                            handleEdit={this.props.handleClick}
                            closeEditBox={this.props.closeEditBox}
                            // note={notesArray[key].note}
                            archiveNote={this.props.archiveNote}
                            reminder={this.props.reminderNote}
                            trashNote={this.props.trashNote}
                            // noteID={notesArray[key]._id}
                            // archiveStatus={notesArray[key].archive}
                            editTitle={this.props.editTitle}
                            editDescription={this.props.editDescription}
                            createNotePropsToTools={this.props.getColor}
                        />
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={this.state.openSnackBar}
                        autoHideDuration={6000}
                        onClose={this.handleSnackClose}
                        variant="error"
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id"> Note Unarchived</span>}
                        action={[
                            <div >
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleSnackClose}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        ]}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}



