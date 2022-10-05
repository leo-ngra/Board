import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBfTwXIby1QmVrgLoZ_FZqRsfbFgUj9FNw",
    authDomain: "boardapp-612af.firebaseapp.com",
    projectId: "boardapp-612af",
    storageBucket: "boardapp-612af.appspot.com",
    messagingSenderId: "81868081495",
    appId: "1:81868081495:web:7fa7beee8294eaf2215612",
    measurementId: "G-0CNSJ9DPEQ"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export default firebase
  export {app, db}
  