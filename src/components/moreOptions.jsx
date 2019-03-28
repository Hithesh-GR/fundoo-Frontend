/*****************************************************************************************************
 *  @Purpose        : Here we have to do some operations using moreOptions event.
 *  @file           : moreOptions.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************************/
import React, { Component } from 'react';
import { MenuItem, Popper, Paper, Fade, Tooltip, ClickAwayListener, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                margin: "0px",
                zIndex: "1"
            },
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class MoreOptions extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
        }
        this.moreOptionsToAddLabels = React.createRef();
        this.clickMoreOptions = this.clickMoreOptions.bind(this);
    }
    /**
     * @description:it will open the more options event and in that 
                    we can select add the labels and delete notes operations
     * @param {*open the more options event} event 
     */
    clickMoreOptions(event) {
        try {
            const { currentTarget } = event;
            this.setState(state => ({
                anchorEl: currentTarget,
                open: !state.open,

            }));
        } catch (err) {
            console.log("error at clickMoreOptions in moreOptions");
        }
    }
    /**
     * @description:it will handle trashed notes
     */
    handleTrashedNote = () => {
        try {
            this.closeLabelPopper();
            this.props.trashNote(this.props.noteID);
        } catch (err) {
            console.log("error at handleTrashedNotes in moreOptions");
        }
    }
    /**
     * @description:it will close the color popper box
     */
    closeLabelPopper = () => {
        try {
            this.setState({
                open: false
            })
        } catch (err) {
            console.log("error at closeLabelPopper in moreOptions");
        }
    }
    /**
     * @description:it will handle add label to notes
     */
    handleLabelsOnNote = (event) => {
        try {
            this.setState({
                open: false
            })
            this.moreOptionsToAddLabels.current.addLabelPopup(event);
        } catch (err) {
            console.log("error at handleLabelOnNote in moreOptions");
        }
    }
    render() {
        const { anchorEl, open } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Tooltip title="More Options">
                        <img src={require('../assets/images/more.svg')}
                            onClick={this.clickMoreOptions}
                            className="moreOptionsIcon"
                            alt="more options icon" />
                    </Tooltip>
                    <Popper open={open} anchorEl={anchorEl} placement={'bottom-start'} transition style={{ zIndex: 1 }}>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={0}>
                                <Paper className="moreOptionsPopper" >
                                    <ClickAwayListener onClickAway={() => this.closeLabelPopper()}>
                                        <div id="moreOptionsMenu">
                                            <MenuItem id="moreOptionsMenu" onClick={this.handleTrashedNote}>Delete Note</MenuItem>
                                            <MenuItem id="moreOptionsMenu" onClick={this.handleLabelsOnNote}>Add Label</MenuItem>
                                        </div>
                                    </ClickAwayListener>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>
            </MuiThemeProvider>
        )
    }
}
