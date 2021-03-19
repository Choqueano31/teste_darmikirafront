import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB8MXoE-AjnNGt3KxobJyNSgoMjkUDC66s",
  authDomain: "react-crud-f6a14.firebaseapp.com",
  databaseURL: "https://react-crud-f6a14-default-rtdb.firebaseio.com",
  projectId: "react-crud-f6a14",
  storageBucket: "react-crud-f6a14.appspot.com",
  messagingSenderId: "265981490558",
  appId: "1:265981490558:web:183f4b625ab1593cd5ef2f",
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
