import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ResetPassword from '../screens/ResetPassword';

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login"
			component={Login} options={{ title: "UniRoom" }}/>

			<Stack.Screen name="Signup" component={Signup}
			options={{ title: "Create Account", headerBackTitle: "Log In" }}/>

			<Stack.Screen name="ResetPassword" component={ResetPassword}
			options={{ headerTitle: "Reset Password", headerBackTitle: "Back" }}/>
 		</Stack.Navigator>
	);
}

export default AuthStack;