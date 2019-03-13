/*******************************************************************************
 *  @Purpose        : To create note services that will perform CRUD operations.
 *  @file           : noteServices.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *******************************************************************************/
import axios from 'axios';
/**
 * @description:To create a new note
 * @param {*used to send data or note to server} data 
 */
export function createNote(data) {
    console.log("data==>",data);
    
    return axios('/createNote', {
        method: "POST",
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}
export function getNotes() {
    return axios('/getNotes', {
        method: "GET",
        headers: {
            "token": localStorage.getItem("token")
        }
    }).then(function (response) {
        const result = response.data.data;
        return result;
    })
}



export function otherArray(notesData) {
    let otherArr = [];
    for (let i = 0; i < notesData; i++) {
        if (!notesData[i].note.pinned && !notesData[i].note.archive && !notesData[i].note.trash) {
            otherArr.push(notesData[i]);
        }
    }
    return otherArr;
}




export function updateColor(url, data) {

    return axios(url, {
        method: "PUT",
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}

export function updateTitle(url, data) {

    return axios(url, {
        method: "PUT",
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}

export function updateDescription(url, data) {

    return axios(url, {
        method: "PUT",
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}



export function updatePin(url, data) {

    return axios(url, {
        method: "PUT",
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}

export function setReminder(url, data) {
    return axios(url, {
        method: "PUT",
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}

export function isTrashed(url, data) {
    return axios(url, {
        method: "PUT",
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}

export function updateArchiveStatus(url, data) {
    return axios(url, {
        method: "PUT",
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}

export function deleteNoteForever(url, data) {
    return axios(url, {
        method: "POST",
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}