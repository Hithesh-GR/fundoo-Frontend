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
    console.log("create note data from front-end==>", data);
    var headers = {
        'Content-Type': 'application/json',
        'token': localStorage.getItem("token")
    }
    return axios.post('/createNote',
        data, {
            headers: headers
        }
    )
}
/**
 * @description:To get the created notes
 */
export function getNotes() {
    console.log("*----get notes from front-end----*");
    return axios.get('/getNotes', {
        headers: {
            "token": localStorage.getItem("token")
        }
    })
}
/**
 * @description:
 * @param {*} url 
 * @param {*} data 
 */
export function updateColor(data) {
    console.log("color data from front-end==>", data);
    var headers = {
        'Content-Type': 'application/json',
        "token": localStorage.getItem("token")
    }
    return axios.put('/updateColor',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} data 
 */
export function updateArchiveStatus(data) {
    console.log("arcive data from front-end==>", data);
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/isArchived',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} data 
 */
export function isTrashed(data) {
    console.log("trash data from front-end==>", data);
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/isTrashed',
        data, {
            headers: headers
        }
    )
}
/**
 * @description:
 * @param {*} url 
 * @param {*} data 
 */
export function deleteNoteForever(data) {
    console.log("delete note data from front-end==>", data);
    var headers = {
        'Content-Type': 'application/json',
        "token": localStorage.getItem("token")
    }
    return axios.post('/deleteNote',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} data 
 */
export function setReminder(data) {
    console.log("reminder data from front-end==>", data);
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/reminder',
        data, {
            headers: headers
        }
    )
}

export function updateTitle(data) {
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/editTitle',
        data, {
            headers: headers
        }
    )
}
export function updateDescription(data) {
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/editDescription',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} data 
 */
export function updatePin(data) {
    console.log("pinned data from front-end==>", data);
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/isPinned',
        data, {
            headers: headers
        }
    )
}
/********************************************************************************/
/**
 * 
 * @param {*} notesData 
 */
export function otherArray(notesData) {
    let otherArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (!notesData[i].pinned && !notesData[i].archive && !notesData[i].trash) {
            otherArr.push(notesData[i]);
        }
    }
    return otherArr;
}
/**
 * 
 * @param {*} notesData 
 */
export function archiveArray(notesData) {
    let archiveArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].archive) {
            archiveArr.push(notesData[i]);
        }
    }
    return archiveArr;
}
/**
 * 
 * @param {*} notesData 
 */
export function remiderArray(notesData) {
    let reminderArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].reminder !== "" && !notesData[i].trash) {
            reminderArr.push(notesData[i]);
        }
    }
    return reminderArr;
}
/**
 * 
 * @param {*} notesData 
 */
export function trashArray(notesData) {
    let trashArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].trash) {
            trashArr.push(notesData[i]);
        }
    }
    return trashArr;
}
/**
 * 
 * @param {*} notesData 
 */
export function pinArray(notesData) {
    let pinArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].pinned) {
            pinArr.push(notesData[i]);
        }
    }
    return pinArr;
}