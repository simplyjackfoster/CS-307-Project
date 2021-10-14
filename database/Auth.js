import React from 'react';
import { ref, set, onValue, exists, val, child, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './RTDB';

export function authNewUser(email, password) {
    console.log("Auth: " + auth);
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("ayo we here");
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log("Error Code: " + error.code);
            console.log("Error Message: " + error.message);
        });
}

export function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential, success) => {
            const user = userCredential.user;
            console.log("signed in ho");
            //setSignIn(true);
        })
        .catch((error) => {
            console.log("Error Code: " + error.code);
            console.log("Error Message: " + error.message);
            //setSignIn(false);
        })
}

function signOutUser() {
    signOut(auth).then(() => {
        console.log("Signout Successful");
    }).catch((error) => {
        console.log(error);
    })
}
