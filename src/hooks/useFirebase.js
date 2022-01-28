import * as React from 'react';
import {
    getAuth,
    signOut,
    signInWithPopup,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import initializeFirebaseApp from '../firebase/firebase.init';

// Initialize Firebase
initializeFirebaseApp();

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export default function useFirebase() {

    const [user, setUser] = React.useState({});
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        onAuthStateChanged(auth, loggedUser => {
            if (loggedUser) {
                setUser(loggedUser);
            } else {
                setUser({});
            }
        });
    }, []);

    function handlePasswordSignUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function handlePasswordSignIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function handleGoogleSignIn() {
        return signInWithPopup(auth, googleProvider);
    }

    function handleUpdateProfileName(name) {
        return updateProfile(auth.currentUser, { displayName: name });
    }

    function logOut() {
        signOut(auth)
            .then(
                () => {
                    setUser({});
                    setError('');
                }
            )
            .catch(
                err => {
                    console.log(err.message);
                }
            );
    }

    // const SERVER_URL = "https://secret-dawn-22405.herokuapp.com";
    const SERVER_URL = "http://localhost:5000";

    return {
        SERVER_URL,
        user,
        setUser,
        error,
        setError,
        logOut,
        handlePasswordSignIn,
        handlePasswordSignUp,
        handleGoogleSignIn,
        handleUpdateProfileName
    }
}