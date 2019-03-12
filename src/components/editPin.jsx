import React, { Component } from 'react';
import { Tooltip } from '@material-ui/core';
export default class EditPin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPinned: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        if (typeof this.props.pinStatus !== "undefined") {
            this.setState({
                isPinned: this.props.pinStatus
            })
        }
    }
    async handleClick() {
        await this.setState({ isPinned: !this.state.isPinned });
        this.props.cardPropsToPin(this.state.isPinned, this.props.noteID)
    }
    render() {
        return (
            this.state.isPinned ?
                <Tooltip title="Unpin Note" onClick={this.handleClick}>
                    <img src={require('../assets/images/pinAfterClick.svg')}
                        alt="pinIcon" />
                </Tooltip>
                :
                <Tooltip title="Pin Note" onClick={this.handleClick}>
                    <img src={require('../assets/images/pinBeforeClick.svg')}
                        alt="pinIcon" />
                </Tooltip>
        )
    }
}