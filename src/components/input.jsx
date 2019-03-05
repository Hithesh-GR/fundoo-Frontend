/********************************************************************************
 *  @Purpose        : Here export the textfield component
 *  @file           : input.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *********************************************************************************/
import React from "react";
import TextField from '@material-ui/core/TextField';
import "../App.css";
export default class input extends React.Component {
    render() {
        return (
            <TextField
                className={this.props.className}
                id={this.props.id}
                name={this.props.name}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
                label={this.props.label}
                variant="outlined"
            />
        );
    }
}