/*****************************************************************************************************
 *  @Purpose        : Here we will archive the created notes
 *  @file           : archive.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************************/
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
//     /**
//      * @description:it will shows the archive status whether it is archived or not
//      */
//     componentWillMount() {
//         try {
//             if (typeof this.props.archiveStatus !== "undefined") {
//                 this.setState({
//                     isArchived: this.props.archiveStatus
//                 })
//             }
//         } catch (err) {
//             console.log("error at componentWillMount in archive");
//         }
//     }
//     /**
//      * @description:it will handles the archive event
//      */
//     async handleArchive() {
//         try {
//             await this.setState({ isArchived: !this.state.isArchived });
//             this.props.archiveNote(this.state.isArchived, this.props.noteID)
//         } catch (err) {
//             console.log("error at handleArchive in archive");
//         }
//     }
//     render() {
//         return (
//             this.state.isArchived ?
//                 <div>
//                     <img src={require('../assets/images/unarchive.svg')}
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
//                                 <img src={require('../assets/images/closeIcon.svg')} alt="snackBar close" />
//                             </IconButton>,
//                         ]}
//                     />
//                 </div>
//                 :
//                 <Tooltip title="Archive Note" onClick={() =>
//                     this.handleArchive()
//                 }>
//                     <img src={require('../assets/images/archive.svg')}
//                         alt="archive note icon"
//                         className="archiveIcon" />
//                 </Tooltip>
//         )
//     }
// }
// export default Archive;


import React, { Component } from 'react';
import Archiveicon from '../assets/images/archive.svg';
import { Snackbar, Button, IconButton, Tooltip } from '@material-ui/core';
import closeIcon from '../assets/images/closeIcon.svg';
class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isArchived: false
        }
    }
    // async handleArchive  () {
    //      await   this.setState({ isArchived: !this.state.isArchived });
    //     this.setState({ open: true });
    //     console.log("this.state.isArchived changed", this.state.isArchived);
    //     this.props.archiveNote(this.state.isArchived, this.props.noteID)
    // }
    handleArchive = () => {
        console.log("this.props.archiveStatus in handle", this.props.archiveStatus);

        if (this.props.archiveStatus === false) {
            this.state.isArchived = true;
            console.log("this.state.isArchived changed", this.state.isArchived);
            this.props.archiveNote(this.state.isArchived, this.props.noteID)
        }
        else {

            this.state.isArchived = false;
            console.log(" this.state.isArchived changle else", this.state.isArchived);
            this.props.archiveNote(this.state.isArchived, this.props.noteID)
        }
    }

    handleClick = () => {
        this.setState({ open: false });

    }
    render() {
        console.log("first.props.archiveStatus", this.props.archiveStatus);

        const { open } = this.state.open;
        return (
            this.state.isArchived ?
                <div>
                    <image src={Archiveicon}
                        onClick={
                            this.handleArchive
                        }
                        alt="archive note icon"
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
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        message={<span>Note archived</span>}
                        action={[
                            <Button key="undo" style={{ color: "#F1C40F" }} size="small" >
                                UNDO
 </Button>,
                            <IconButton
                                onClick={this.handleClick}
                            >
                                <img src={closeIcon} alt="snackBar close" />
                            </IconButton>,
                        ]}
                    />
                </div>
        )
    }
}
export default Archive;

