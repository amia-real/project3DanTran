

import firebase from 'firebase/app';
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyBmXwPydh1IGGgkT4iLtIUkNcoVlqVKeFs",
    authDomain: "messagingapp-b9803.firebaseapp.com",
    projectId: "messagingapp-b9803",
    storageBucket: "messagingapp-b9803.appspot.com",
    messagingSenderId: "333839176296",
    appId: "1:333839176296:web:df3f82063298817863a1dd"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;