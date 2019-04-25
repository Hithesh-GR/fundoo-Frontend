import * as firebase from "firebase";
import { pushNotification } from "../../client/src/services/noteServices";
export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyC55mGE8UWZJtEFUdcFFFbMsCFCjieUyzg",
    authDomain: "pushnotification-4e632.firebaseapp.com",
    databaseURL: "https://pushnotification-4e632.firebaseio.com",
    projectId: "pushnotification-4e632",
    storageBucket: "pushnotification-4e632.appspot.com",
    messagingSenderId: "702217838877"
  });
  // use other service worker
  navigator.serviceWorker.register("/my-sw.js").then(registration => {
    firebase.messaging().useServiceWorker(registration);
  });
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("FireBase token is:", token);
    localStorage.setItem("pushToken", token);
    var data = {
      pushToken: token,
      userId: localStorage.getItem("userId")
    };
    pushNotification(data);
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const deletePushToken = async () => {
  try {
    const messaging = firebase.messaging();
    const token = await messaging.getToken();
    await messaging.deleteToken(token);
  } catch (error) {
    console.error(error);
  }
};
