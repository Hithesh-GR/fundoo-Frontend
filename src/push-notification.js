import firebase from 'firebase';
import axios from 'axios';
require('dotenv').config();
export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: process.env.messagingSenderId
    });
    navigator.serviceWorker
        .register('/my-sw.js')
        .then((registration) => {
            firebase.messaging().useServiceWorker(registration);
        });
}

export const askForPermissioToReceiveNotifications = async (userdate, title, description) => {
    try {
        console.log("userdateuserdateuserdate==>", userdate);
        // const messaging = firebase.messaging();
        // await messaging.requestPermission();
        // const token = await messaging.getToken();
        // console.log('token:============>', token);
        var date = new Date()
        //console.log("date-->0", date);
        var date1 = new Date(userdate)
        //console.log("date1111-->0", date1);
        //var  compareDate = "2019-04-03 19:00:06"
        var diff = Math.abs(date1 - date);
        //console.log("diff----->", diff);

        setTimeout(() => {
            var data = {
                "notification": {
                    "title": title,
                    "body": description,
                    // "click_action": "http://localhost:3000/",
                    // "icon": "http://url-to-an-icon/icon.png"
                },
                // "to": token
                "to": process.env.token
            }
            passmessage(data)
        }, diff);
        return diff;
    } catch (error) {
        console.error("errorrrrrrrrrrrrrrrrrr", error);
    }
}

function passmessage(data) {
    try {
        axios.post('https://fcm.googleapis.com/fcm/send', data, { headers: { 'Authorization': process.env.Serverkey } })
            .then((res) => {
                //return res;
                console.log("res----->", res);
            })
            .catch((err) => {
                console.log("errors==>", err);
            })
    } catch (error) {
        console.log("Error in resetpassword in userservices..");
    }
}
















