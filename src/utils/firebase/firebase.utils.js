import { initializeApp } from 'firebase/app';
import {getAuth,
     signInWithRedirect, 
     signInWithPopup, 
     GoogleAuthProvider } 
     from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBV6olr5t_hE59cuWKSiYGYe3O7sn5t73Y",
    authDomain: "crwn-clothing-db-8b22f.firebaseapp.com",
    projectId: "crwn-clothing-db-8b22f",
    storageBucket: "crwn-clothing-db-8b22f.appspot.com",
    messagingSenderId: "67950856784",
    appId: "1:67950856784:web:6ed2d96704feaa9d67df55"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const  userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });

        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;

};