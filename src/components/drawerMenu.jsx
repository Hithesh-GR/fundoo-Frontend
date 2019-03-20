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
export default class drawerMenu extends Component {
    constructor() {
        super();
        this.state = {
            open: false,

            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: false,
            label: [],
        }
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
        return (
            <div>
                <Drawer
                    variant="persistent"
                    open={this.props.appBarProps}
                    width={300}
                >
                    <MenuItem id="noteMenu" onClick={()=>this.handleNotes()}>
                        <img src={require('../assets/images/note.svg')} alt="note icon"
                            style={{ marginRight: "50px" }} />
                        Notes
                    </MenuItem>
                    <MenuItem id="reminderMenu" onClick={()=>this.handleReminder()}>
                        <img src={require('../assets/images/menuReminder.svg')} alt="reminder icon"
                            style={{ marginRight: "50px" }} />
                        Reminders
                    </MenuItem>
                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ padding: "3.5% 8%", fontSize: "12px", marginBottom: "15px", marginTop: "10px", fontFamily: "arial", color: "gray" }}>
                            LABELS
                        </div>
                        <div>
                            <MenuItem id="labelMenu"  onClick={this.handleEditLabel}>
                                <img src={require('../assets/images/menuEdit.svg')} alt="edit icon"
                                    style={{ marginRight: "50px" }} />
                                Edit Labels
                            </MenuItem>
                        </div>
                    </div>
                    <MenuItem id="archiveMenu"  onClick={()=>this.handleArchived()}>
                        <img src={require('../assets/images/menuArchive.svg')} alt="archive icon"
                            style={{ marginRight: "50px" }} />
                        Archive
                    </MenuItem>
                    <MenuItem id="trashIcon" onClick={()=>this.handleTrashed()}>
                        <img src={require('../assets/images/menuTrash.svg')} alt="trash icon"
                            style={{ marginRight: "50px" }} />
                        Trash
                    </MenuItem>
                </Drawer>
            </div>
        )
    }
}
