

import React, { Component } from 'react';
import { Tooltip } from '@material-ui/core';


class UploadImage extends Component {
    triggerInputFile() {
        this.fileInput.click();
    }
    uploadImage(evt)
    {
        console.log("upload image",evt.target.files[0]);
        
        this.props.uploadImage(evt.target.files[0],this.props.note._id)
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
                    onChange={(evt)=>this.uploadImage(evt)}
                />
            </span>
        )
    }
}
export default UploadImage;