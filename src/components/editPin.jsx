/*****************************************************************************************************
 *  @Purpose        : Here we can perform pin and unpin the notes.
 *  @file           : editPin.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************************/
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
    /**
     * @description:it will shows the pin status whether it is pinned or not
     */
    componentWillMount() {
        try {
            if (typeof this.props.pinStatus !== "undefined") {
                this.setState({
                    isPinned: this.props.pinStatus
                })
            }
        } catch (err) {
            console.log("error at componentWillMount in editPin");
        }
    }
    /**
     * @description:it will handles the pin event
     */
    async handleClick() {
        try {
            await this.setState({ isPinned: !this.state.isPinned });
            this.props.cardPropsToPin(this.state.isPinned, this.props.noteID)
        } catch (err) {
            console.log("error at handleClick in editPin");
        }
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

// async handleClick() {
//     console.log("this.props.initialpinstatus", this.props.initialpinstatus);
//     await this.setState({
//         isPinned: this.props.initialpinstatus,
//     })
//     await this.setState({ isPinned: !this.state.isPinned });
//     console.log("change pinned==>", this.state.isPinned);
//     console.log("id log==>", this.props.noteID);

//     this.props.pinstatus(this.state.isPinned, this.props.noteID)
//     // if (this.props.initialpinstatus === false) {
//     // this.state.isPinned= true;
//     // // this.setState({ isPinned: true });


//     // this.props.pinstatus(this.state.isPinned, this.props.noteID);
//     // }
//     // else {
//     // // this.setState({ isPinned: false });
//     // this.state.isArchived= false;

//     // this.props.pinstatus(this.state.isPinned, this.props.noteID);
//     // }


//     // this.setState({isPinned: !this.state.isPinned});



//     // this.props.pinstatus(this.state.isPinned,this.props.noteID);
// }

// {
//     // console.log("initial log==>", this.props.initialpinstatus);
    
//     const { isPinned } = this.state;
//     return (
//     <span >
//     {this.props.initialpinstatus ?
//     <IconButton onClick={() => this.handleClick()} >
//     <Tooltip title="un-pin">
//     <img src={unpin} alt="logo" />
//     </Tooltip>
//     </IconButton>
//     :
//     <IconButton onClick={() => this.handleClick()}>
//     <Tooltip title=" pin-note ">
//     <img src={pinnote} alt="logo" />
//     </Tooltip>
//     </IconButton>
//     }
//     </span>
    
//     )
//     }
//     }