import React from 'react';
import { Alert } from 'react-native';

/*
 * IsValidName()
 * function to check whether the name is valid, will return true if there are only
 * alphabetic characters, apostrophes, and hyphens and false otherwise 
 */
export const isValidName = (name) => {
	if (!name) {
		Alert.alert("Error", "Name field is empty, please try again.", 
			[{ text: "Ok" }]);
		return false;
	}

	// iterate through the characters in the name
	for (const c of name) {

		// 8216 and 8217 are the acsii values for apostrophes in iOS
		if ((c.charCodeAt(0) == 8217) || (c.charCodeAt(0) == 8216) || (c === '-') || 
				(c === ' ') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
			// valid character
		}
		else {
			// invalid character
			Alert.alert("Error", "Name field contains invalid character: '" + c + 
				"', please try again.", [{ text: "Ok" }]);

			return false;
		}
	}

	return true;
} // isValidName()






/*
 * isValidEmail
 * function to check if the email is valid, checks that the email is a purdue email
 * and then checks if the username of the email has valid characters
 * returns true if those conditions are met, false if not
 */
export const isValidEmail = (email) => {
	if (!email) {
		Alert.alert("Error", "Email field is empty, please try again.", 
			[{ text: "Ok" }]);
		return false;
	}

	const indexOfAt = email.indexOf('@');

	// check for @ character
	if (indexOfAt == -1) {
		Alert.alert("Error", "Email is missing '@' character, please try again.", 
			[{ text: "Ok" }]);

		return false;
	} 
	
	// check for purdue email
	if (email.substring(indexOfAt) !== "@purdue.edu") {
		Alert.alert("Error", "Email is not a purdue email, please try again.", 
			[{ text: "Ok" }]);

		return false;
	}

	// get the username of the email 
	const username = email.substring(0, indexOfAt);
	
	// check for empty username
	if (username.length === 0) {
		Alert.alert("Error", "Email is missing username, please try again.", 
			[{ text: "Ok" }]);

		return false;
	}

	// iterate through the username characters
	for (const c of username) {
		if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')) {
		}
		else {
			// invalid character
			Alert.alert("Error", "Email contains invalid character '" + c + 
				"' in username, please try again.", [{ text: "Ok" }]);

			return false;
		}
	}

	return true;
} // isValidEmail()







/*
 * isValidPhone()
 * function to make sure the phone number only consists of 10 numbers
 * $$ Issue with interpreting '.' as the same value as numbers $$
 */
export const isValidPhone = (phone) => {
	if (!phone) {
		Alert.alert("Error", "Phone field is empty, please try again.", 
			[{ text: "Ok" }]);
		return false;
	}

	if (phone.length !== 10) {
		Alert.alert("Error", "Phone number is not 10 digits long, please try again.", 
			[{ text: "Ok" }]);
		return false;
	}

	for (const c in phone) {
		if (c < '0' || c > '9' || c == '.') {
			Alert.alert("Error", "Phone number contains non-numeric character, please try again.", 
				[{ text: "Ok" }]);
			return false;
		}
	}

	return true;
} // isValidPhone()




/*
 * isValidBirthday()
 *  
 */
export const isValidBirthday = (birthday) => {
	if (!birthday) {
		Alert.alert("Error", "Birthday field is empty, please try again.", 
			[{ text: "Ok" }]);
		return false;  
	}

	if (birthday.length != 10) {
		Alert.alert("Error", "Birthday field has incorrect length, please try again.", 
			[{ text: "Ok" }]);
		return false;
	}

	const slashOneIndex = birthday.indexOf('/');
	if (slashOneIndex === -1) {
		// no slash
		Alert.alert("Error", "Birthday field is missing '/' character, please try again.", 
			[{ text: "Ok" }]);
	}

	const slashTwoIndex = birthday.indexOf('/', slashOneIndex + 1)
	if (slashTwoIndex === -1) {
		// no second slash
		Alert.alert("Error", "Birthday field is missing second '/' character, please try again.", 
			[{ text: "Ok" }]);
	}

	const month = birthday.substring(0, slashOneIndex);
	const day = birthday.substring(slashOneIndex + 1, slashTwoIndex);
	const year = birthday.substring(slashTwoIndex + 1);

	// check if the month day and year are numeric
	for (const c in month) {
		if (c < '0' || c > '9') {
			Alert.alert("Error", "Birthday field contains invalid character, please try again.", 
				[{ text: "Ok" }]);
			return false;
		}
	}

	for (const c in day) {
		if (c < '0' || c > '9') {
			Alert.alert("Error", "Birthday field contains invalid character, please try again.", 
				[{ text: "Ok" }]);
			return false;
		}
	}

	for (const c in year) {
		if (c < '0' || c > '9') {
			Alert.alert("Error", "Birthday field contains invalid character, please try again.", 
				[{ text: "Ok" }]);
			return false;
		}
	}

	// check if the month day and year are valid dates
	const monthInt = parseInt(month);
	const dayInt = parseInt(day);
	const yearInt = parseInt(year);

	if (monthInt < 1 || monthInt > 12) {
		Alert.alert("Error", "Birthday field has invalid month, please try again.", 
			[{ text: "Ok" }]);
			return false;
	}

	var dayIsValid = true;
	switch (monthInt) {
		case 1, 3, 5, 7, 8, 10, 12: 
			if (dayInt < 1 || dayInt > 31) dayIsValid = false;
			break;
		case 4, 6, 9, 11:
			if (dayInt < 1 || dayInt > 30) dayIsValid = false;
			break;
		case 2:
			if (dayInt < 1 || dayInt > 28) dayIsValid = false;
			if (dayInt === 29 && yearInt % 4 === 0) dayIsValid = true;
			break;
		default:
			// month was invalid
	}

	if (!dayIsValid) {
		Alert.alert("Error", "Birthday field has invalid day, please try again.", 
			[{ text: "Ok" }]);
			return false;
	}

	const today = new Date();
	const currentYear = parseInt(today.getFullYear());
	
	if (yearInt < currentYear - 100 || yearInt > currentYear - 16) {
		Alert.alert("Error", "Birthday field has invalid year, please try again.", 
			[{ text: "Ok" }]);
			return false;
	}

	return true;
} // isValidBirthday()




/*
 * isValidPassword()
 * function to check if the password entered is the same in both password fields
 * and also have the length within the specified range of 8 to 28 
 */
export const isValidPassword = (password, confirmPassword) => {
	if (!password || !confirmPassword) {
		Alert.alert("Error", "Password and/or Confirm Password field is empty, please try again.", 
			[{ text: "Ok" }]);
		return false;
	}

	if (password !== confirmPassword) {
		Alert.alert("Error", "Passwords do not match, please try again.", 
			[{ text: "Ok" }]);
		return false;
	}

	if (password.length > 28 || password.length < 8) {
		Alert.alert("Error", "Password must be within range 8-28 characters, please try again.", 
			[{ text: "Ok" }]);
		return false;
	}

	// check for strength of password
	var regexNum = /[0-9]/;
	var regexSpecialChar = /[~!@#$%&*?]/;
	var substringLib = ["pass", "password", "word", "purdue", "boiler", "boilermaker", "daniels", "123", "123456789"];
	
	// invalid phrase included
	for (var i = 0; i < substringLib.length; i++)
	{
			if (password.toLowerCase().includes(substringLib[i]))
			{
					Alert.alert("Error", "Invalid Password Phrase:" + substringLib[i], 
							[{ text: "Ok" }]);
					return false;
			}
	}
// no capital letters
	if (password.toLowerCase() == password)
	{
			Alert.alert("Error", "Invalid Password. Please use at least 1 uppercase letter.",
					[{ text: "Ok" }]);
			return false;
	}

	// no numbers
	if (password.match(regexNum) == null)
	{
			Alert.alert("Error", "Invalid Password. Please use at least 1 number.", 
					[{ text: "Ok" }]);
			return false;
	}
	
	// no special characters
	if (password.match(regexSpecialChar) == null)
	{
			Alert.alert("Error", "Invalid Password. Please use at least 1 special character: ~!@#$%&*?",
					[{ text: "Ok" }]);
			return false;
	}

	return true;
} // isValidPassword





/*
 * isValidSecurity()
 * function to check if the answer to the security question
 * has been filled out.
 */
export const isValidSecurity = (securityAnswer) => {
	if (!securityAnswer) {
		// didn't answer the security question
		Alert.alert("Error", "Please answer your selected security question before continuing.", 
			[{ text: "Ok" }]);
		return false; 
	}

	// answered the security question
	return true;
} // isValidSecurity()







/*
 * isValidCheckbox()
 * function to check if the code of conduct and the privacy policy
 * checkboxes have been read by the user, return true if both are checked
 */
export const isValidCheckbox = (checkedCoc, checkedPp) => {
	if (!checkedCoc) {
		// didn't check the code of conduct checkbox
		Alert.alert("Error", "Please read the Code of Conduct before continuing.", 
			[{ text: "Ok" }]);
		return false;
	}

	if (!checkedPp) {
		// didn't check the privacy policy checkbox
		Alert.alert("Error", "Please read the Privacy Policy before continuing.", 
			[{ text: "Ok" }]);
		return false;
	}

	return true;
} // isValidCheckbox()






/*
 * isValidGraduationYear()
 *
 * function to check if the graduation year is valid.
 * returns true if its either null, or between the current year and
 * the current year + 10
 */
export const isValidGraduationYear = (year) => {
	// if its null, then its valid
	if (!year) {
		return true;
	}	

	// check if the year is a 4 digit number
	if (year.length != 4) {
		Alert.alert("Error", "Graduation year field must be a 4 digit number, please try again.", 
		[{ text: "Ok" }]);
		return false;
	}

	for (const c in year) {
		if (year[c] < '0' || year[c] > '9') {
			Alert.alert("Error", "Graduation year field must be a 4 digit number, please try again.", 
			[{ text: "Ok" }]);	
			return false;
		}
	}

	// get the year passed in and the current year
	const yearInt = parseInt(year);
	const today = new Date();
	const currentYear = parseInt(today.getFullYear());

	// make sure the year is in the valid range
	if (yearInt < currentYear || yearInt > currentYear + 10) {
		Alert.alert("Error", "Graduation year field has invalid year, please try again.", 
			[{ text: "Ok" }]);
			return false;
	}
	return true;
} // isValidGraduationYear()




/*
 * isValidMajor()
 *
 * function to check if a major is valid. returns true if it is either
 * null or contains only letters. Otherwise returns false.
 */
export const isValidMajor = (major) => {
	if (!major) {
		return true;
	}

	// iterate through the characters in the name
	for (const c of major) {

		// 8216 and 8217 are the acsii values for apostrophes in iOS
		if ((c.charCodeAt(0) == 8217) || (c.charCodeAt(0) == 8216) || (c === '-') || 
				(c === ' ') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
			// valid character
		}
		else {
			// invalid character
			Alert.alert("Error", "Major field contains invalid character: '" + c + 
				"', please try again.", [{ text: "Ok" }]);

			return false;
		}
	}

	return true;
} // isValidMajor()







/*
 * isValidNumberOfRoommates()
 *
 * function to check if a string is a valid number of roommates
 * returns true if its either null, or a positive number.
 * Otherwise, returns false.
 */
export const isValidNumberOfRoommates = (numRoommates) => {
	if (!numRoommates) {
		return true;
	}
	if (numRoommates[0] == '0') {
		Alert.alert("Error", "Preferred # of Roommates field cannot have leading zeros, please try again.", 
			[{ text: "Ok" }]);
			return false;
	}
	let count = 0
	for (const c in numRoommates) {
		count++
		if (numRoommates[c] < '0' || numRoommates[c] > '6' || count >= 2) {
			Alert.alert("Error", "Preferred # of Roommates field has invalid number, please try again. Note: maximum number of roommates is 9.", 
				[{ text: "Ok" }]);
				return false;
		}
	}
	return true;
} // isValidNumberOfRoommates()





/*
 * isValidInstagram()
 *
 * function to check if the instagram name entered is valid.
 * @param username -> the username of the user.
 * @return -> true if the username is valid, false if it is invalid.
 */
export const isValidInstagram = (username) => {
	if (!username) {
		return true;
	}

	// iterate through the characters in the name
	for (const c of username) {

		// 8216 and 8217 are the acsii values for apostrophes in iOS
		if ((c === '.') || (c === '_') || (c.charCodeAt(0) == 8217) || (c.charCodeAt(0) == 8216) || (c === '-') || 
				(c === ' ') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') ||
				(c >= '0' && c <= '9')) {
			// valid character
		}
		else {
			// invalid character
			Alert.alert("Error", "Instagram field contains invalid character: '" + c + 
				"', please try again.", [{ text: "Ok" }]);

			return false;
		}
	}

	return true;
} // isValidInstagram()

