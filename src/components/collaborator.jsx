/********************************************************************************
 *  @Purpose        : 
 *  @file           :      
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *********************************************************************************/
import React, { Component } from 'react';
import notePerson from '../assets/images/addPerson.svg';
import { Tooltip, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                width: "600px",
                margin: "0px",
                borderBottomLeftRadius: "20px",
                borderTopRightRadius: "20px",
                overflowY: "hidden"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class Collaborator extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="toolBtn">
                    <Tooltip title="Collaborator">
                        <img src={notePerson} alt="Add Person icon"
                        />
                    </Tooltip>
                </div>
            </MuiThemeProvider>
        )
    }
}

