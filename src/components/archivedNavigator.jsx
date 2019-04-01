import React, { Component } from 'react';
import { Card, MuiThemeProvider, createMuiTheme, Chip, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditPin from '../components/editPin';
import Tools from '../components/tools';
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
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <label style={{ fontFamily: "georgia", fontSize: "18px", color: "grey", marginRight: "760px" }}>ARCHIVE</label>
                    <div className="CardsView">
                        {this.props.archiveArray.map((key) => {
                            return (
                                <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0", wordBreak: "break-word" }}>
                                    <div >
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
                                        />
                                    </div>
                                </Card>
                            )
                        })
                        }
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



