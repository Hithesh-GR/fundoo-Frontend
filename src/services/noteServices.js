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
    return axios.post('/createNote', {
        headers: {
            "token": localStorage.getItem("token")
        },
        data: data
    })
}
/**
 * 
 */
export function getNotes() {
    console.log("get notes from front-end");
    return axios.get('/getNotes', {
        headers: {
            "token": localStorage.getItem("token")
        }
    }).then(function (response) {
        const result = response.data.data;
        return result;
    })
}