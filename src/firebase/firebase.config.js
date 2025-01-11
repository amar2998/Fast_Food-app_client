// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,

  authDomain:import.meta.env.VITE_AUTHDOMAIN ,
  projectId: import.meta.env.VITE_PROJECTID ,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET ,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID ,
  appId: import.meta.env.VITE_APPID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyB-Geso2P6qACACHp9RdSambKFzGTlWs-U",
//   authDomain: "fir-food-648fc.firebaseapp.com",
//   projectId: "fir-food-648fc",
//   storageBucket: "fir-food-648fc.appspot.com",
//   messagingSenderId: "466865885566",
//   appId: "1:466865885566:web:27f4d7f9d713353c76632f"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;