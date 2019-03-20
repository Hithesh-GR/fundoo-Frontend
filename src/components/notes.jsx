// /*****************************************************************************************************
//  *  @Purpose        : 
//  *  @file           : notes.jsx       
//  *  @author         : HITHESH G R
//  *  @version        : v0.1
//  *  @since          : 23-02-2019
//  *****************************************************************************************************/
// import React, { Component } from 'react';
// import { Card, MuiThemeProvider, createMuiTheme} from '@material-ui/core';
// // import { Chip,Tooltip, Avatar } from '@material-ui/core';
// import { getNotes } from '../services/noteServices';
// import Tools from '../components/tools';
// import EditPin from '../components/editPin';
// import DialogBox from '../components/dialogBox';
// // import ClockIcon from '../components/clockIcon';
// import { otherArray } from '../services/noteServices';
// const theme = createMuiTheme({
//     overrides: {
//         MuiPaper: {
//             elevation1: {
//                 boxShadow: "0px"
//             }
//         },
//     },
//     typography: {
//         useNextVariants: true,
//     },
// })
// export default class Cards extends Component {
//     constructor() {
//         super();
//         this.state = {
//             open: false,
//             notes: [],
//             label: false
//         }
//         this.cardsToDialogBox = React.createRef();

//         this.handleClick = this.handleClick.bind(this);
//         this.closeEditBox = this.closeEditBox.bind(this);
//     }
//     async handleClick(note) {
//         await this.setState({ open: true })
//         this.cardsToDialogBox.current.getData(note);
//     }
//     closeEditBox() {
//         this.setState({ open: false })
//     }
//     componentDidMount() {
//         getNotes()
//             .then((result) => {
//                 this.setState({
//                     notes: result
//                 })
//                 console.log("getNotes result from back-end", result);
//             })
//             .catch((error) => {
//                 alert(error)
//             });
//     }
//     displayNewCard(newCard) {
//         this.setState({
//             notes: [...this.state.notes, newCard]
//         })
//     }

//     render() {

//         let cardsView = this.props.noteProps ? "cards" : "listCards";

//         let otherArr = otherArray(this.state.notes);
//         return (
//             <MuiThemeProvider theme={theme}>
//                 <div className="CardsView">

//                     {Object.keys(otherArr).map((key) => {
//                         console.log("otherArr", otherArr[key].note);

//                         return (
//                             <div key={key} id="cardsViewDiv">
//                                 <Card className={cardsView}
//                                     style={{ backgroundColor: otherArr[key].note.color, borderRadius: "10px", border: "1px solid #dadce0" }}
//                                 >
//                                     <div >
//                                         <div>
//                                             {otherArr[key].note.image !== "" ?
//                                                 <img style={{
//                                                     maxWidth: "100%",
//                                                     height: "auto"
//                                                 }} src={otherArr[key].note.image} alt="cardImage"></img>
//                                                 : null}
//                                         </div>
//                                         <div style={{ display: "flex", justifyContent: "space-between" }}>
//                                             <b onClick={() => this.handleClick(otherArr[key].note)} >
//                                                 {otherArr[key].note.title}
//                                             </b>

//                                             <EditPin cardPropsToPin={this.pinNote}
//                                                 noteID={otherArr[key].note._id}
//                                                 pinStatus={otherArr[key].note.pinned}
//                                             />
//                                         </div>

//                                         <DialogBox
//                                             ref={this.cardsToDialogBox}
//                                             parentProps={this.state.open}
//                                             handleEdit={this.handleClick}
//                                             closeEditBox={this.closeEditBox}
//                                             note={otherArr[key].note}
//                                             editTitle={this.editTitle}
//                                             editDescription={this.editDescription}
//                                             createNotePropsToTools={this.getColor}

//                                         />

//                                         <div onClick={this.handleClick}>
//                                             {otherArr[key].note.description}
//                                         </div>

//                                         {/* <div style={{ display: "flex", flexDirection: "row" }}>
//                                                     {otherArr[key].collab.length > 0 ?
//                                                         // eslint-disable-next-line
//                                                         otherArr[key].collab.map((collabKey, index) => {
//                                                             if (otherArr[key].owner.firstName !== "") {

//                                                                 return (
//                                                                     <div style={{ margin: "3px" }} key={index} >
//                                                                         {collabKey.userName !== localStorage.getItem('emailId') && otherArr[key].owner !== undefined ?
//                                                                             <Tooltip title={collabKey.firstName + " " + collabKey.lastName + " (" + collabKey.userName + ")"}>
//                                                                                 <Avatar style={{ height: "30px", width: "30px", backgroundColor: "rgb(0,0,0,.10)" }}>
//                                                                                     {collabKey.firstName.substring(0, 1)}
//                                                                                 </Avatar>
//                                                                             </Tooltip>
//                                                                             : <Tooltip title={otherArr[key].owner.firstName + " " + otherArr[key].owner.lastName + " (" + otherArr[key].owner.userName + ")"}>
//                                                                                 <Avatar style={{ height: "30px", width: "30px", backgroundColor: "rgb(0,0,0,.10)" }}>
//                                                                                     {otherArr[key].owner.firstName.substring(0, 1)}
//                                                                                 </Avatar>
//                                                                             </Tooltip>
//                                                                         }
//                                                                     </div>
//                                                                 )
//                                                             }

//                                                         })
//                                                         : null
//                                                     }
//                                                 </div> */}

//                                         {/* {otherArr[key].note.reminder ?

//                                             <Chip icon={<ClockIcon />}
//                                                 label={otherArr[key].note.reminder}
//                                                 onDelete={() => this.reminderNote('', otherArr[key].note._id)}
//                                             />
//                                             :
//                                             null
//                                         } */}
//                                     </div>

//                                     <div className="noteicons">
//                                         <Tools
//                                             createNotePropsToTools={this.getColor}
//                                             collab={otherArr[key].collab}
//                                             owner={otherArr[key].owner}
//                                             archiveNote={this.archiveNote}
//                                             noteID={otherArr[key].note._id}
//                                             archiveStatus={otherArr[key].note.archive}
//                                             reminder={this.reminderNote}
//                                             note={otherArr[key].note}
//                                             trashNote={this.trashNote}
//                                         />
//                                     </div>

//                                 </Card>
//                             </div>
//                         )
//                     })}

//                 </div>



//             </MuiThemeProvider>

//         )

//     }

// }



import React, { Component } from 'react';
import { Card, Chip, MuiThemeProvider, createMuiTheme, Tooltip, Avatar } from '@material-ui/core';
import Tools from '../components/tools';
import { getNotes, updateColor, updatePin, setReminder, isTrashed, updateArchiveStatus, deleteNoteForever, updateTitle, updateDescription } from '../services/noteServices';
// import EditPin from './Pinned';
// import ClockIcon from './clockIcon';
//  import { otherArray } from '../services/noteServices';
// import DialogBox from '../components/dialogBox';
import '../App.css';
// import { red } from '@material-ui/core/colors';
export default class Cards extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            notes: [],
            label: false
        }
    }

    componentDidMount() {
        getNotes()
            .then((result) => {
                this.setState({
                    notes: result
                })
                console.log("getNotes result from back-end", result);
            })
            .catch((error) => {
                alert(error)
            });
    }
    render() {
        return (
            <div>
                {
                    Object.keys(this.state.notes).slice(0).reverse().map((key) => {
                        console.log("=====================", this.state.notes[0].color);
                        return (
                            <div>
                                <Card id="CreateNote2" style={{ backgroundColor: this.state.notes[key].color }}>
                                    <div >
                                        <div>
                                            <b> {this.state.notes[key].title}</b>
                                        </div>
                                        <div>
                                            {this.state.notes[key].description}
                                        </div >
                                        <div id="displaycontentdiv">
                                            <Tools />
                                        </div>
                                    </div>

                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

