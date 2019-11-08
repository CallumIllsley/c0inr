import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Fireact from 'fireact'

var firebaseConfig = {
    apiKey: "AIzaSyBVWZpIjr584eMW8TLvWcOMDKBNUY7K7hc",
    authDomain: "c0in-92bfb.firebaseapp.com",
    databaseURL: "https://c0in-92bfb.firebaseio.com",
    projectId: "c0in-92bfb",
    storageBucket: "c0in-92bfb.appspot.com",
    messagingSenderId: "902098895555",
    appId: "1:902098895555:web:d8542a1e017a1d3d711876",
    measurementId: "G-PMPVTT66HL"
  };

  const products = [
    'auth',
    'database'
  ]


  const {
    firebase: myFirebase, 
    Provider: FirebaseProvider, 
    middleWare
  } = Fireact(firebaseConfig, products)

  export {
    myFirebase,
    FirebaseProvider
  }
  
  // export const myFirebase = firebase.initializeApp(firebaseConfig)
  const baseDb = myFirebase.database
  export const db = baseDb