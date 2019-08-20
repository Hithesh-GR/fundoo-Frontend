/****************************************************************************************
 *  @Purpose        : Here we have to create the drawer component.
 *  @file           : drawerMenu.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import EditLabel from '../components/editLabel.jsx';
import { getLabels } from '../services/noteServices.js';
export default class drawerMenu extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: false,
            label: []
        }
        this.handleEditLabel = this.handleEditLabel.bind(this);
        this.showLabels = this.showLabels.bind(this);
        this.newLabels = this.newLabels.bind(this);
    }
    handleEditLabel() {
        this.setState({ open: !this.state.open })
    }
    componentDidMount() {
        getLabels()
            .then((result) => {
                this.setState({
                    label: result.data.data
                })
                // console.log("getLabels result from back-end", result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    displaySearchLabels(value) {
        this.props.searchLabels(value)
    }
    showLabels(value) {
        let labelArr=this.state.label;
        if(value!==undefined){
            labelArr.push(value);
            this.setState({label:labelArr});
        }
        // this.setState({
        //     label: [...this.state.label, value]
        // })
        //console.log("label-----------<",this.state.label);
    }
    newLabels(value) {
        this.setState({ label: value })
    }
    async handleNotes() {
        await this.setState({
            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: false,
        })
        this.props.makeLabelFalse();
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
    }
    async handleReminder() {
        await this.setState({
            navigateReminder: true,
            navigateArchived: false,
            navigateTrashed: false
        })
        this.props.makeLabelFalse();
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
    }
    async handleArchived() {
        await this.setState({
            navigateReminder: false,
            navigateArchived: true,
            navigateTrashed: false
        })
        this.props.makeLabelFalse();
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
    }
    async handleTrashed() {
        await this.setState({
            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: true
        })
        this.props.makeLabelFalse();
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
    }
    render() {
        let displayLabels = this.state.label;
        if (this.state.label !== "") {
            displayLabels = this.state.label.map((key) =>
                <MenuItem style={{ display: "flex", flexDirection: "row", color: "#202124", fontFamily: "Google Sans, Roboto, Arial, sans-serif", fontSize: ".875rem" }} onClick={() => this.displaySearchLabels(key.label)} key={key.label}>
                    <img src={require('../assets/images/labelIcon.svg')} alt="label icon" style={{ marginRight: "50px" }} />
                    <div style={{ marginRight: "50px", marginBottom: "10px", marginTop: "10px", fontWeight: "550" }}>
                        {key.label}
                    </div>
                </MenuItem>
            )
        }
        return (
            <div>
                <Drawer
                    variant="persistent"
                    overflow="auto"
                    open={this.props.appBarProps}
                    width={300}
                >
                    <MenuItem id="noteMenu" onClick={() => this.handleNotes()}>
                        <img src={require('../assets/images/note.svg')} alt="note icon"
                            style={{ marginRight: "50px" }} />
                        Notes
                    </MenuItem>
                    <MenuItem id="reminderMenu" onClick={() => this.handleReminder()}>
                        <img src={require('../assets/images/menuReminder.svg')} alt="reminder icon"
                            style={{ marginRight: "50px" }} />
                        Reminders
                    </MenuItem>
                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey", overflow:"auto" }}>
                        <div style={{ padding: "3.5% 8%", fontSize: "12px", marginBottom: "15px", marginTop: "10px", fontFamily: "arial", color: "gray" }}>
                            LABELS
                        </div>
                        <div>
                            <div>
                                {displayLabels}
                            </div>
                            <MenuItem id="labelMenu" onClick={this.handleEditLabel}>
                                <img src={require('../assets/images/menuEdit.svg')} alt="edit icon"
                                    style={{ marginRight: "50px" }} />
                                Edit Labels
                            </MenuItem>
                        </div>
                    </div>
                    <MenuItem id="archiveMenu" onClick={() => this.handleArchived()}>
                        <img src={require('../assets/images/menuArchive.svg')} alt="archive icon"
                            style={{ marginRight: "50px" }} />
                        Archive
                    </MenuItem>
                    <MenuItem id="trashIcon" onClick={() => this.handleTrashed()}>
                        <img src={require('../assets/images/menuTrash.svg')} alt="trash icon"
                            style={{ marginRight: "50px" }} />
                        Trash
                    </MenuItem>
                </Drawer>
                <EditLabel
                    newLabels={this.newLabels}
                    label={this.state.label}
                    showLabels={this.showLabels}
                    drawerPropstoEditLabels={this.state.open}
                    labelToggle={this.handleEditLabel} />
            </div>
        )
    }
}
