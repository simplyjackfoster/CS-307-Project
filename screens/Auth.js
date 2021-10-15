import { ref, set, onValue, exists, val, child, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const {app, rtdb} = require('./App.js');
const auth = getAuth(app);

function authNewUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log("Error Code: " + error.code);
            console.log("Error Message: " + error.message);
        });
}

function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log("Error Code: " + error.code);
            console.log("Error Message: " + error.message);
        })
}

function signUserOut() {
    signOut(auth).then(() => {
        console.log("Signout Successful");
    }).catch((error) => {
        console.log(error);
    })
}
