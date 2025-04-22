import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "catgallery.firebaseapp.com",
  projectId: "catgallery",
  storageBucket: "catgallery.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:android:abcdef",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, auth, messaging }; 