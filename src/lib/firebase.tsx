import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAOnhG0kH7eUL6WaDT3Bdq6KrHJZMDmLXA",
  authDomain: "bookshelf-867b4.firebaseapp.com",
  projectId: "bookshelf-867b4",
  storageBucket: "bookshelf-867b4.appspot.com",
  messagingSenderId: "66957362922",
  appId: "1:66957362922:web:5716b9b6bc2ef746ad7993"
};
      


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
