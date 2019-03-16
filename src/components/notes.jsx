
import React, { Component } from 'react';
import { Card, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { getNotes } from '../services/noteServices'
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            elevation1: {
                boxShadow: "0px"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class Cards extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            notes: [],
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
    displayNewCard(newCard) {
        this.setState({
            notes: [...this.state.notes, newCard]
        })
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div id="cardsViewDiv">
                    <Card />
                </div>
            </MuiThemeProvider>
        )
    }
}
