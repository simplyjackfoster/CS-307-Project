import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ResetPassword from '../screens/ResetPassword';
import Questionnaire from '../screens/Questionnaire';
import CodeOfConduct from '../screens/CodeOfConduct';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import VerifyEmail from '../screens/VerifyEmail';


const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login"
			component={Login} options={{ title: "UniRoom" }}/>

			<Stack.Screen name="Signup" component={Signup}
			options={{ title: "Create Account", headerBackTitle: "Log In" }}/>

			<Stack.Screen name="CodeOfConduct" component={CodeOfConduct}
			options={{ title: "Code of Conduct", headerBackTitle: "Back" }}/>
			
			<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}
			options={{ title: "Privacy Policy", headerBackTitle: "Back" }}/>

			<Stack.Screen name="Questionnaire" component={Questionnaire}
			options={{ title: "Create Account", headerBackTitle: "Back"}}/>

			<Stack.Screen name="VerifyEmail" component={VerifyEmail}
			options={{ title: "Verify Email"}}/>

			<Stack.Screen name="ResetPassword" component={ResetPassword}
			options={{ headerTitle: "Reset Password", headerBackTitle: "Back" }}/>

 		</Stack.Navigator>
	);
}

export default AuthStack;