importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
require('dotenv').config();
firebase.initializeApp({
    messagingSenderId: process.env.messagingSenderId
});
const messaging = firebase.messaging();