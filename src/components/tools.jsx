/****************************************************************************************
 *  @Purpose        : Here we have to create the tools that required in creating a note.
 *  @file           : tools.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import Reminder from '../components/reminder';
import ColorBox from '../components/colorBox';
import UploadImage from '../components/uploadImage';
import Archive from '../components/archive';
import MoreOptions from '../components/moreOptions';
import Collaborator from '../components/collaborator';
export default class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    /**
     * @description:it will toggle color event
     */
    handleToggle() {
        try {
            this.setState({ open: !this.state.open });
        } catch (err) {
            console.log("error at handleToggle in tools");
        }
    }
    render() {
        const setNoteTime = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
        return (
            <div>
                <div className="cardTools">
                    <Reminder
                        handleToggle={this.handleToggle}
                        parentToolsProps={setNoteTime}
                        reminder={this.props.reminder}
                        note={this.props.note}
                    />
                    <Collaborator />
                    <ColorBox
                        handleToggle={this.handleToggle}
                        toolsPropsToColorpallete={this.props.createNotePropsToTools}
                        noteID={this.props.noteID}
                    />
                    <UploadImage
                        uploadImage={this.props.uploadImage}
                        note={this.props.note}
                    />
                    <Archive
                    />
                    <MoreOptions
                        handleToggle={this.handleToggle}
                    />
                </div>
            </div>
        )
    }
}