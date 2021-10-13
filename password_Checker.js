import React from "react";
import { Component } from "react";
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView, 
    Button,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert
  } from 'react-native';


    // Password Strength Checker Script - Being modified for usage with iOS UI
    substringLib = ["pass", "password", "word", "purdue", "boiler", "boilermaker", "daniels", "123", "123456789"];
    //const r = require("readline");
    //const rInt = r.createInterface({input: process.stdin, output: process.stdout});
    invalidPassword = 0;

    /*
    * Create a universal password checking user interface that can be extended to the Login screen and 
    * the password reset screen.
    */
    export default function passwordCheck(password) {
        //HANDLE USER INPUT -- used commented out logic below to handle the information.
        console.log("Entering Password Checker")
        regexNum = /[0-9]/;
        regexSpecialChar = /[~!@#$%&*?]/;
        // invalid phrase included
        for (i = 0; i < substringLib.length; i++)
        {
            if (password.toLowerCase().includes(substringLib[i]))
            {
                //console.log("Invalid Password Phrase: %s\n", substringLib[i]);
                Alert.alert("Invalid Password Phrase:\n", substringLib[i], 
                    [{ text: "Ok" }]);
                invalidPassword = 1;
            }
        }
        // no capital letters
        if (password.toLowerCase() == password)
        {
            //console.log("Invalid Password. Please use at least 1 uppercase letter.\n");
            Alert.alert("Invalid Password. Please use at least 1 uppercase letter.",
                    [{ text: "Ok" }]);
            invalidPassword = 1;
        }
        // no numbers
        if (password.match(regexNum) == null)
        {
            //console.log("Invalid Password. Please use at least 1 number.\n");
            Alert.alert("Invalid Password. Please use at least 1 number.", 
                    [{ text: "Ok" }]);
            invalidPassword = 1;
        }
        // no special characters
        if (password.match(regexSpecialChar) == null)
        {
            //console.log("Invalid Password. Please use at least 1 special character: ~!@#$%&*?\n");
            Alert.alert("Invalid Password. Please use at least 1 special character: ~!@#$%&*?",
                    [{ text: "Ok" }]);
            invalidPassword = 1;
        }
        if (invalidPassword == 1)
        {
            return -1;
        }
        return 0;
    }
