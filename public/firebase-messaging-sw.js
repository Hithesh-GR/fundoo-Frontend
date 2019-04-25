importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyC55mGE8UWZJtEFUdcFFFbMsCFCjieUyzg",
    authDomain: "pushnotification-4e632.firebaseapp.com",
    databaseURL: "https://pushnotification-4e632.firebaseio.com",
    projectId: "pushnotification-4e632",
    storageBucket: "pushnotification-4e632.appspot.com",
    messagingSenderId: "702217838877"
});
const messaging = firebase.messaging();