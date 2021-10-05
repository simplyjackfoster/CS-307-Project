//import React from "react";

// Password Strength Checker Script - Will need to be modified for usage with iOS UI
userPassword = "";
substringLib = ["pass", "password", "word", "purdue", "boiler", "boilermaker", "daniels", "123", "123456789"];
const r = require("readline");
const rInt = r.createInterface({input: process.stdin, output: process.stdout});
invalidPassword = 0;

do
{
    rInt.question("Enter your password: ", (userPassword) =>
    {
        regexNum = /[0-9]/;
        regexSpecialChar = /[~!@#$%&*?]/;
        // invalid password length
        if (userPassword.length < 8 || userPassword.length > 20)
        {
            console.log("Invalid Password Length. Please input a password between 8 and 20 characters.\n");
            invalidPassword = 1;
        }
        // invalid phrase included
        for (i = 0; i < substringLib.length; i++)
        {
            if (userPassword.toLowerCase().includes(substringLib[i]))
            {
                console.log("Invalid Password Phrase: %s\n", substringLib[i]);
                invalidPassword = 1;
            }
        }
        // no capital letters
        if (userPassword.toLowerCase() == userPassword)
        {
            console.log("Invalid Password. Please use at least 1 uppercase letter.\n");
            invalidPassword = 1;
        }
        // no numbers
        if (userPassword.match(regexNum) == null)
        {
            console.log("Invalid Password. Please use at least 1 number.\n");
            invalidPassword = 1;
        }
        // no special characters
        if (userPassword.match(regexSpecialChar) == null)
        {
            console.log("Invalid Password. Please use at least 1 special character: ~!@#$%&*?\n");
            invalidPassword = 1;
        }
        rInt.close();
    });
} while (invalidPassword == 1);

console.log("Your password has been successfully set!\n");