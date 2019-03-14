/****************************************************************************************
 *  @Purpose        : 
 *  @file           : uploadImage.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import { Tooltip } from '@material-ui/core';
export default class UploadImage extends Component {
    triggerInputFile() {
        try {
            this.fileInput.click();
        } catch (err) {
            console.log("error at triggerInputFile in uploadImage");
        }
    }
    uploadImage(evt) {
        try {
            console.log("upload image", evt.target.files[0]);
            this.props.uploadImage(evt.target.files[0], this.props.note._id)
        } catch (err) {
            console.log("error at uploadImage in uploadImage");
        }
    }
    render() {
        return (
            <span>
                <Tooltip title="Upload Image">
                    <img src={require('../assets/images/imageUpload.svg')}
                        className="uploadImage"
                        alt="upload pic icon"
                        onClick={() => { this.triggerInputFile() }} />
                </Tooltip>
                <input ref={fileInput => this.fileInput = fileInput}
                    type="file" style={{ 'display': 'none' }}
                    className="uploadImage"
                    onChange={(evt) => this.uploadImage(evt)}
                />
            </span>
        )
    }
}