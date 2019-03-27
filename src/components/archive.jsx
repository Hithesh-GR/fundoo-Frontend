/*****************************************************************************************************
 *  @Purpose        : Here we will archive the created notes
 *  @file           : archive.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************************/
import React, { Component } from 'react';
import Archiveicon from '../assets/images/archive.svg';
import { Snackbar, IconButton, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
export default class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isArchived: false,
            snackBarMessage: "",
            openSnackBar: false,
        }
    }
    handleArchive = () => {
        if (this.props.archiveStatus === false) {
            this.state.isArchived = true;
          //  this.setState({ open: true });
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Note Archived"
            });
            console.log("this.state.isArchived changed", this.state.isArchived);
            this.props.archiveNote(this.state.isArchived, this.props.noteID)
        }
        else {
            this.state.isArchived = false;
          //  this.setState({ open: false });
            console.log(" this.state.isArchived changle else", this.state.isArchived);
            this.props.archiveNote(this.state.isArchived, this.props.noteID)
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
        const { open } = this.state.open;
        return (
            this.state.isArchived ?
                <div>
                    <img src={Archiveicon}
                        onClick={
                            this.handleArchive
                        }
                     alt="archive note icon"
                    className="archiveIcon"
                    />
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
                        message={<span id="message-id">  {this.state.snackBarMessage}</span>}
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
                :
                <div>
                    <Tooltip title="Archive Note" onClick={
                        this.handleArchive
                    }>
                        <img src={Archiveicon}
                            alt="archive note icon"
                        />
                    </Tooltip>
                </div>
        )
    }
}

// import React, { Component } from 'react';
// import { Snackbar, Button, IconButton, Tooltip } from '@material-ui/core';
// class Archive extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             open: false,
//             isArchived: false
//         }
//     }

//     componentWillMount() {
//         if (typeof this.props.archiveStatus !== "undefined") {
//             this.setState({
//                 isArchived: this.props.archiveStatus
//             })
//         }
//     }
//     async handleArchive() {
//         await this.setState({ isArchived: !this.state.isArchived });
//         this.props.archiveNote(this.state.isArchived, this.props.noteID)

//     }
//     render() {
//         return (
//             this.state.isArchived ?

//                 <div>
//                     <img src={require('../assests/images/unarchive.svg')}
//                         onClick={() =>
//                             this.handleArchive()
//                         }
//                         alt="archive note icon"
//                         className="archiveIcon" />

//                     <Snackbar
//                         anchorOrigin={{
//                             vertical: 'bottom',
//                             horizontal: 'left',
//                         }}
//                         open={this.state.open}
//                         message={<span>Note archived</span>}
//                         action={[
//                             <Button key="undo" style={{ color: "#F1C40F" }} size="small" >
//                                 UNDO
//                         </Button>,

//                             <IconButton
//                                 onClick={this.handleClick}
//                             >
//                                 <img src={require('../assests/images/closeIcon.svg')} alt="snackBar close" />
//                             </IconButton>,
//                         ]}
//                     />
//                 </div>
//                 :
//                 <Tooltip title="Archive Note"   onClick={() =>
//                     this.handleArchive()
//                 }>
//                     <img src={require('../assests/images/archive.svg')}
//                     alt="archive note icon"
//                     className="archiveIcon"/>
//                 </Tooltip>
//         )
//     }
// }
// export default Archive;

