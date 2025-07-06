import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDj6D8Cr3L0pEcRoHlkhEwMyQS_PmwR-Ak",
  authDomain: "darumastore-4aa8e.firebaseapp.com",
  projectId: "darumastore-4aa8e",
  storageBucket: "darumastore-4aa8e.firebasestorage.app",
  messagingSenderId: "1067854748340",
  appId: "1:1067854748340:web:b30651a514cc867e4655e1",
  measurementId: "G-BTL74ZZYGC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };