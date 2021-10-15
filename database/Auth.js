import React from 'react';
import { ref, set, onValue, exists, val, child, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './RTDB';

export function authNewUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Created user");
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
            console.log("Signed in");
        })
        .catch((error) => {
            console.log("Error Code: " + error.code);
            console.log("Error Message: " + error.message);
        })
}

function signOutUser() {
    signOut(auth).then(() => {
        console.log("Signout Successful");
    }).catch((error) => {
        console.log(error);
    })
}
