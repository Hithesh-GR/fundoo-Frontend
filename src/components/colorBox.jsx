/*****************************************************************************************************
 *  @Purpose        : Here we have to set the color for note
 *  @file           : colorBox.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************************/
import React, { Component } from 'react';
import { IconButton, Tooltip, Card, ClickAwayListener } from '@material-ui/core';
/**
 * @description:it will define the color using rgb-color code
 */
const colorCodesAndNames = [{ name: "white", colorCode: "rgb(255, 255, 255)" },
{ name: "lightGreen", colorCode: "rgb(204, 255, 144)" },
{ name: "purple", colorCode: "rgb(215, 174, 251)" },
{ name: "red", colorCode: "rgb(242, 139, 130)" },
{ name: "Teal", colorCode: "rgb(167, 255, 235)" },
{ name: "pink", colorCode: "rgb(253, 207, 232)" },
{ name: "orange", colorCode: "rgb(251, 188, 4)" },
{ name: "blue", colorCode: "rgb(203, 240, 248)" },
{ name: "brown", colorCode: "rgb(230, 201, 168)" },
{ name: "yellow", colorCode: "rgb(255, 244, 117)" },
{ name: "darkBlue", colorCode: "rgb(174, 203, 250)" },
{ name: "gray", colorCode: "rgb(232, 234, 237)" }
]
export default class ColorPallete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        // this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleColor = this.handleColor.bind(this);
    }
    /**
     * @description:it will display the color box when mouse entered into the color icon
     */
    handleMouseEnter() {
        try {
            this.setState({ open: true });
            // this.props.handleToggle(!this.state.open)
        } catch (err) {
            console.log("error at handleMouseEnter in colorBox");
        }
    }
    // handleMouseLeave() {
    //     this.setState({ open: false });
    //      this.props.handleToggle(!this.state.open)
    // }
    /**
     * @description:it will close the color popper box
     */
    closePopper() {
        try {
            this.setState({
                open: false
            })
        } catch (err) {
            console.log("error at closePopper in colorBox");
        }
    }
    /**
     * @description:it will handle the selecting color event
     * @param {*changing color event} event 
     */
    handleColor(event) {
        try {
            console.log("changing color", this.props.noteID)
            this.props.toolsPropsToColorpallete(event.target.value, this.props.noteID);
        } catch (err) {
            console.log("error at handleColor in colorBox");
        }
    }
    /**
     * @description:it will toggle the color icon
     */
    handleToggle() {
        try {
            this.setState({ open: !this.state.open });
            this.props.handleToggle(!this.state.open)
        } catch (err) {
            console.log("error at handleToggle in colorBox");
        }
    }
    render() {
        const changeCardColor = colorCodesAndNames.map((colorKey) =>
            <Tooltip title={colorKey.name}>
                <IconButton style={{ backgroundColor: colorKey.colorCode, "margin": "2px", }}
                    value={colorKey.colorCode}
                    onClick={this.handleColor}
                >
                </IconButton>
            </Tooltip>
        );
        return (
            <div>
                <Tooltip title="Change Color">
                    <img src={require('../assets/images/pallete.svg')}
                        className="colorPalleteIcon"
                        alt="change color"
                        onClick={this.handleToggle}
                        onMouseEnter={this.handleMouseEnter}
                        onM
                    />
                </Tooltip>
                <div>
                    {this.state.open ?
                        <ClickAwayListener onClick={() => this.closePopper()}>
                            <Card className="colorPalleteCard">
                                {changeCardColor}
                            </Card>
                        </ClickAwayListener>
                        : null}
                </div>
            </div>
        )
    }
}


































