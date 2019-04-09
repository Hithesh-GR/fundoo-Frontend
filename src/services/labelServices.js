import axios from 'axios'

export function addLabel(url,data) {
    console.log("create note call",data);
    
    return axios(url, {
        method: "POST",
        headers: {
            "token": localStorage.getItem("token")
        },
        data:data
    })
}
export function getLabels() {
    return axios('/getLabels', {
        method: "GET",
        headers: {
            "token": localStorage.getItem("token")
        }
    }).then(function (response) {
        const result = response.data.data;
        return result;
    })
}   
export function deleteLabel(data) {
    
    return axios('/deleteLabel', {
        method: "POST",
        headers: {
            "token": localStorage.getItem("token")
        },
        data:data
    })
}
export function updateLabel(data) {
    
    return axios('/updateLabel', {
        method: "PUT",
        headers: {
            "token": localStorage.getItem("token")
        },
        data:data
    })
}