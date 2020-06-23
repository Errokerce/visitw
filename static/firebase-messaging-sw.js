importScripts("https://www.gstatic.com/firebasejs/7.15.3/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.3/firebase-messaging.js"
);

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// var firebaseConfig = {
//   apiKey: "AIzaSyDl5MWcyRom3RmeYuvSiI5R5ycsxTOVoyQ",
//   authDomain: "visit-bbe42.firebaseapp.com",
//   databaseURL: "https://visit-bbe42.firebaseio.com",
//   projectId: "visit-bbe42",
//   storageBucket: "visit-bbe42.appspot.com",
//   messagingSenderId: "228818918488",
//   appId: "1:228818918488:web:b1dd7ba12921071fda3e2d"
// };
// // Initialize Firebase

// firebase.initializeApp(firebaseConfig);
// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey(
//   "BMP_sEaayFMf28KVsGwl-1mVg1i3n8_Q8Nh2RoDbyQNGhxP7XYB3uEF46J6D1gXznCTOsmLZwNnL1RZZXs_-nGo"
// );
// messaging.onMessage(payload => {
//   console.log("Message received. ", payload);
//   // ...
// });
var firebaseConfig = {
  apiKey: "AIzaSyDl5MWcyRom3RmeYuvSiI5R5ycsxTOVoyQ",
  authDomain: "visit-bbe42.firebaseapp.com",
  databaseURL: "https://visit-bbe42.firebaseio.com",
  projectId: "visit-bbe42",
  storageBucket: "visit-bbe42.appspot.com",
  messagingSenderId: "228818918488",
  appId: "1:228818918488:web:b1dd7ba12921071fda3e2d"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BMP_sEaayFMf28KVsGwl-1mVg1i3n8_Q8Nh2RoDbyQNGhxP7XYB3uEF46J6D1gXznCTOsmLZwNnL1RZZXs_-nGo"
);
