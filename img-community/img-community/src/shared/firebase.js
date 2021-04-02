import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBcifvQUSBh2Zln6kFCHVpSJUuuKf1d384",
    authDomain: "react-imggram.firebaseapp.com",
    projectId: "react-imggram",
    storageBucket: "react-imggram.appspot.com",
    messagingSenderId: "457194995862",
    appId: "1:457194995862:web:58689103b79be2f1f342b7",
    measurementId: "G-BRNV98QYLC"
}

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export{auth,apiKey, firestore,storage, realtime};
