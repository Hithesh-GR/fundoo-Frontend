/********************************************************************************
 *  @Purpose        : 
 *  @file           :      
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *********************************************************************************/
import React, { Component } from 'react';
import notePerson from '../assets/images/addPerson.svg';
import { Avatar, Dialog, DialogTitle, Button, Divider, Input, Tooltip } from '@material-ui/core';
import { getCollabDetails, saveCollabs } from '../services/noteServices';
// const theme = createMuiTheme({
//     overrides: {
//         MuiDialog: {
//             paperWidthSm: {
//                 width: "600px",
//                 margin: "0px",
//                 borderBottomLeftRadius: "20px",
//                 borderTopRightRadius: "20px",
//                 overflowY: "hidden"
//             }
//         },
//     },
//     typography: {
//         useNextVariants: true,
//     },
// })
export default class Collaborator extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            collabs: [],
            collabSelection: [],
            inputCollab: "",
            collabSuggestions: []
        }
        this.handleColab = this.handleColab.bind(this);
        this.handleInputCollab = this.handleInputCollab.bind(this);
        this.saveCollab = this.saveCollab.bind(this);
    }
    saveCollab() {
        if (this.state.inputCollab !== "") {
            let collabData = this.state.collabs.filter(obj => obj.username === this.state.inputCollab);
            console.log("collabData", collabData, this.props.noteID);
            let newArray = [];
            newArray.push(collabData[0]);
            this.setState({
                collabSelection: newArray,
                inputCollab: ""
            });
            const data = {
                noteID: this.props.noteID,
                collabID: collabData[0]._id
            }
            saveCollabs('/saveCollaborator', data)
                .then((result) => {
                    console.log(result.data.data);
                }).catch((err) => {
                    console.log(err)
                })
        }
        else {
            this.setState({
                open: false
            });
            console.log("no new entry");
        }
    }

    handleColab() {
        this.setState({
            open: !this.state.open
        });
        // alert("Invalid user")
    }

    handleInputCollab(e) {
        this.setState({
            inputCollab: e.target.value
        })
        let collabData = this.state.collabs.filter(obj => obj.email === (this.state.inputCollab))
        if (collabData) {
            this.setState({
                collabSuggestions: collabData
            })
        }
    }
    componentDidMount() {
        getCollabDetails('/getCollaboratorDetails')
            .then(async (result) => {
                this.setState({
                    collabs: result.data.data
                })
                if (this.props.collabs !== undefined && this.props.collabs.length > 0 && this.props.owner !== undefined) {
                    let newArray = [];
                    let owner = {
                        _id: this.props.owner._id,
                        firstName: this.props.owner.firstName,
                        lastName: this.props.owner.lastName + " (Owner)",
                        username: this.props.owner.username
                    }
                    newArray.push(owner)
                    for (let i = 0; i < this.props.collabs.length; i++) {
                        if (this.props.collabs[i].username !== this.props.owner) {
                            newArray.push(this.props.collabs[i])
                        }
                    }
                    console.log("collabArray", newArray);
                    this.setState({
                        collabSelection: newArray
                    })
                }
            }).catch((err) => {
                console.log(err);
                // alert(err);
            })
    }
    render() {
        const userDetails = localStorage.getItem('username');
        const mailId = localStorage.getItem('email');
        const initial = userDetails.substring(0, 1).toUpperCase();
        let collaborators = this.state.collabSelection;
        let collabDetails = collaborators.map((key) =>
            <div style={{ display: "flex", flexDirection: "row", paddingLeft: "10px", paddingTop: "10px", width: "530px" }}>
                <Avatar>{key.firstName.substring(0, 1)}</Avatar>
                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "18px", paddingTop: "8px" }}>

                    <div style={{ fontSize: "13px", fontFamily: "'Roboto',arial,sans-serif", fontWeight: "700" }}>
                        {key.firstName + " " + key.lastName}
                    </div>
                    <div style={{ fontSize: "13px", fontFamily: "'Roboto',arial,sans-serif", color: "gray" }}>
                        {key.username}
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                <div className="toolBtn">
                    <Tooltip title="Collaborator">
                        <img src={notePerson} alt="Add Person icon"
                            onClick={this.handleColab}
                        />
                    </Tooltip>
                </div>
                {this.state.open ?
                    <Dialog id="colabDialog" open={this.state.open}>
                        <DialogTitle
                            style={{ fontSize: "25px", fontFamily: "georgia", fontWeight: "700" }}
                        >
                            Collaborators</DialogTitle>
                        <Divider />
                        {this.props.collabs === 0 ?
                            <div style={{ display: "flex", flexDirection: "row", paddingLeft: "10px", paddingTop: "10px", width: "530px" }}>
                                <Avatar>{initial}</Avatar>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "18px", paddingTop: "8px" }}>
                                    <div style={{ fontSize: "13px", fontFamily: "'Roboto',arial,sans-serif", fontWeight: "700" }}>
                                        {userDetails}
                                    </div>
                                    <div style={{ fontSize: "13px", fontFamily: "'Roboto',arial,sans-serif", color: "gray" }}>
                                        {mailId}
                                    </div>
                                </div>
                            </div>
                            : null}
                        {collabDetails}
                        <div style={{ paddingLeft: "10px", paddingTop: "12px", paddingBottom: "10px", display: "flex", flexDirection: "row" }}>
                            <Avatar style={{ backgroundColor: "transparent" }}>
                                <img src={notePerson} alt="colabIcon" />
                            </Avatar>
                            <Input
                                placeholder="Person or email to share with"
                                disableUnderline={true}
                                autoComplete="on"
                                style={{ fontSize: "13px", width: "400px", marginLeft: "18px" }}
                                value={this.state.inputCollab}
                                onChange={this.handleInputCollab}
                            />
                        </div>
                        <div style={{ display: "flex", paddingBottom: "10px", paddingTop: "10px", backgroundColor: "#EEEEEE" }}>
                            <div style={{ marginLeft: "330px" }} >
                                <Button className="doneButton" onClick={this.handleColab}>Cancel</Button>
                            </div>
                            <div style={{ marginLeft: "22px" }} >
                                <Button className="doneButton" onClick={this.saveCollab}>Save</Button>
                            </div>
                        </div>
                    </Dialog>
                    :
                    null}
            </div>
        )
    }
}
