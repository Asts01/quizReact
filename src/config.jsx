// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; // Correct import for v9+

// const firebaseConfig = {
//   apiKey: "AIzaSyD412kDShxqGo6Y3phbOEAlySfGOmF4EVU",
//   authDomain: "reactquiz-47184.firebaseapp.com",
//   projectId: "reactquiz-47184",
//   storageBucket: "reactquiz-47184.appspot.com",
//   messagingSenderId: "945669555531",
//   appId: "1:945669555531:web:8ffe6ad335397cdbd694ce",
//   measurementId: "G-8BVB2R8SD9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const database = getFirestore(app); // This is correct
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD412kDShxqGo6Y3phbOEAlySfGOmF4EVU",
    authDomain: "reactquiz-47184.firebaseapp.com",
    projectId: "reactquiz-47184",
    storageBucket: "reactquiz-47184.appspot.com",
    messagingSenderId: "945669555531",
    appId: "1:945669555531:web:8ffe6ad335397cdbd694ce",
    measurementId: "G-8BVB2R8SD9"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

export const database=getFirestore(app);




