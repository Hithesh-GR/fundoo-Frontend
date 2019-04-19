/********************************************************************************
 *  @Purpose        : 
 *  @file           :      
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *********************************************************************************/
import React, { Component } from 'react';
import { Card, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import TrashOptions from '../components/trashOption';
const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            root: {
                fontSize: 10,
                height: 20,
                backgroundColor: "rgba(0, 0, 0, 0.10)"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class TrashNavigator extends Component {
    render() {
        let cardsView = this.props.noteProps ? "cards" : "listCards";
        return (
            <MuiThemeProvider theme={theme} >
                {(this.props.trashArray).length === 0 ?
                    <div>
                        <div id="blurimage"  >
                            <img src={require('../assets/images/menuTrash.svg')} alt="trashIcon"
                                style={{ width: "inherit" }}
                            />
                        </div>
                        <div id="text" style={{ fontFamily: "georgia", color: "grey", fontSize: "25px", width: "inherit" }}>
                            No notes in Trash
                        </div>
                    </div>
                    :
                    <label style={{ fontFamily: "cursive", fontSize: "18px", color: "grey", marginRight: "760px" }}>TRASH</label>
                }
                <div className="CardsView"  >
                    {this.props.trashArray.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0", wordBreak: "break-word" }} >
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>
                                    </div>
                                    <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                        {key.description}
                                    </div>
                                </div>
                                <TrashOptions
                                    restore={this.props.trashNote}
                                    noteID={key._id}
                                    deleteNote={this.props.deleteNote}
                                />
                            </Card>
                        )
                    })
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}