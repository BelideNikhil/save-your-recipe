import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCckhQzpv4WiYTPXxkQqIX5ao8rlR0VjRo",
    authDomain: "save-recipes-site.firebaseapp.com",
    projectId: "save-recipes-site",
    storageBucket: "save-recipes-site.appspot.com",
    messagingSenderId: "1054647787463",
    appId: "1:1054647787463:web:c41a2146be64f82edd83e2"
};



firebase.initializeApp(firebaseConfig)

const fromFirebase=firebase.firestore()

export {fromFirebase}