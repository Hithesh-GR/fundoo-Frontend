/********************************************************************************
 *  @Purpose        : Here export the button component
 *  @file           : button.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *********************************************************************************/
import React from "react";
import Button from '@material-ui/core/Button';
import "../App.css";
export default class button extends React.Component {
    render() {
        return (
            <Button
                variant="contained"
                type="submit"
                title={this.props.title}
                color={this.props.color}
                onClick={this.props.onClick}
            >
                {this.props.label}
            </Button>
        );
    }
}