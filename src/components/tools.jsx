import React, { Component } from 'react';
import Reminder from '../components/reminder'
class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    render() {
        const setNoteTime = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
        return (

            <div>
                <div className="cardTools">
                    <Reminder parentToolsProps={setNoteTime}
                        reminder={this.props.reminder}
                        note={this.props.note} />
                </div>
            </div>
        )
    }
}
export default Tools;
