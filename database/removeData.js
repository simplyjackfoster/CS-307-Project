import React from 'react';
import { app, rtdb, auth } from './RTDB';
import {ref, set, onValue, exists, val, child, get, remove} from "firebase/database";
import { getID } from './ID';


export const removeUser = (email) => {
	const id = getID(email);	
	remove(ref(rtdb, "users/" + id));
} // removeUser()