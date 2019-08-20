/****************************************************************************************
 *  @Purpose        : Here we will upload the image to new note and created note.
 *  @file           : uploadImage.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import { Tooltip } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import { uploadProfilePic1 } from "../services/noteServices.js";
export default class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ""
        };
    }
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
    // uploadImage = (evt) => {
    //     try {
    //         console.log("upload image", evt.target.files[0]);
    //         this.props.uploadImage(evt.target.files[0], this.props.noteID)
    //     } catch (err) {
    //         console.log("error at uploadImage");
    //     }
    // }
    uploadImage (e)  {
        let data = new FormData();
        console.log("image:------------", e.target.files[0]);
        data.append('image', e.target.files[0]);
        uploadProfilePic1(data)
            .then((result) => {
                console.log("profile", result.data.data);
               // localStorage.setItem('profilePic', result.data.data);
                this.setState({
                    image: result.data.data
                })
                this.props.uploadImage(this.state.image, this.props.noteID)
                // console.log("s33333333333333333333",this.state.image);
                
            }).catch((error) => {
                NotificationManager.error(error);
                // alert(err);
            })
    }

    render() {
        return (
            <span>
                <Tooltip title="Upload Image">
                    <img src={require('../assets/images/imageUpload.svg')}
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