import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC83YUOw1nYP0oOGu4FACwEk4SieSAXbv8",
    authDomain: "ufo-community.firebaseapp.com",
    projectId: "ufo-community",
    storageBucket: "ufo-community.appspot.com",
    messagingSenderId: "828751133521",
    appId: "1:828751133521:web:4461b8aab9cb810a32f170",
    measurementId: "G-SEKM8VW84R",
};
firebase.initializeApp(firebaseConfig);

//다른 곳에서 auth를 가지고와서 사용할 수 있도록 만들어줍니다.
export { firebase };
