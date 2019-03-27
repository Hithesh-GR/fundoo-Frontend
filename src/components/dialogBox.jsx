import React, { Component } from 'react';
import { Dialog, DialogTitle, Input, Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Tools from '../components/tools';
// import EditPin from '../components/editPin';
const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                width: "600px",
                // height: "200px",
                // paddingLeft: "20px",
                // paddingRight: "10px",
                margin: "0px",
            },

        },
    },
    typography: {
        useNextVariants: true,
    },
    backCover: {
        position: 'absolute',
        marginTop: 20,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})
class DialogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
            title: "",
            description: "",
        }
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handleDescClick = this.handleDescClick.bind(this);
        this.getData = this.getData.bind(this);
    }
    async handleTitleClick(evt) {
        await this.setState({ title: evt.target.value })
    }
    async handleDescClick(evt) {
        await this.setState({ description: evt.target.value })
    }
    async handleToggle(e) {
        await this.props.editTitle(this.state.title, this.state._id)
        await this.props.editDescription(this.state.description, this.state._id)
        this.props.closeEditBox(e);
    }
    getData(note) {
        if (note.title !== undefined || note.description !== undefined) {
            this.setState({
                note: note,
                title: note.title,
                description: note.description,
            })
        }
        console.log("get data from dialogue", this.props.note);
    }
    closeDialogPopper(e) {
        this.props.closeEditBox(e);
    }
    render() {
        console.log("note on dialog----", this.props.color);
        return (
            <MuiThemeProvider theme={theme}>
                <Dialog
                    className="dialogview"
                    id="editDialogBox"
                    open={this.props.parentProps}
                    noteID={this.props.noteID}
                >
                    <div style={{ backgroundColor: this.props.color }} >
                        <DialogTitle>Edit Note</DialogTitle>
                        <div className="editDialog">
                            <Input
                                className="editTitleInput"
                                disableUnderline={true}
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleTitleClick}
                            />
                            {/* <EditPin /> */}
                        </div>

                        <Input
                            className="editNote"
                            disableUnderline={true}
                            placeholder="Note"
                            value={this.state.description}
                            onChange={this.handleDescClick}
                        />

                        <div style={{ display: "flex", flexDirection: 'row' }}>
                            <Tools />
                            <Button id="doneButton" onClick={this.handleToggle.bind(this)}>Close</Button>
                        </div>
                    </div>
                </Dialog>
            </MuiThemeProvider>
        )
    }
}
export default DialogBox;