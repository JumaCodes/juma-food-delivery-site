import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy_KKBPiuper2sGdC127jILlGsn9u-y20",
  authDomain: "resturant-app-react.firebaseapp.com",
  databaseURL: "https://resturant-app-react-default-rtdb.firebaseio.com",
  projectId: "resturant-app-react",
  storageBucket: "resturant-app-react.appspot.com",
  messagingSenderId: "268952746618",
  appId: "1:268952746618:web:5a415fa273d7b9a59e19c3"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export  {app, firestore, storage}