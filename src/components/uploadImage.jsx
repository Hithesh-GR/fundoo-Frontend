/****************************************************************************************
 *  @Purpose        : Here we will upload the image to new note and created note.
 *  @file           : uploadImage.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import { Tooltip } from '@material-ui/core';
export default class UploadImage extends Component {
    /**
     * @description:it trigger the event and enter into our file
     */
    triggerInputFile() {
        try {
            this.fileInput.click();
        } catch (err) {
            console.log("error at triggerInputFile in uploadImage");
        }
    }
    /**
     * @description:it will upload the image
     * @param {*} evt 
     */
    uploadImage(evt) {
        try {
            console.log("upload image", evt.target.files[0]);
            this.props.uploadImage(evt.target.files[0], this.props._id)
        } catch (err) {
            console.log("error at uploadImage");
        }
    }
    render() {
        return (
            <span>
                <Tooltip title="Upload Image">
                    <img src={require('../assets/images/imageUpload.svg')}
                        // className="uploadImage"
                        className="toolBtn"
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