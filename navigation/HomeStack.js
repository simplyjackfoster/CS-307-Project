import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BackHandler } from 'react-native';

import HomeDrawer from './HomeDrawer';
import EditProfile from '../screens/EditProfile';
import ResetPassword from '../screens/ResetPassword';
import DeleteAccount from '../screens/DeleteAccount';
import Questionnaire from '../screens/Questionnaire';

import Colors from '../constants/Colors';
import { auth } from '../database/RTDB';
import { sendVerification } from '../database/sendEmail';

const Stack = createStackNavigator();

const HomeStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="HomeDrawer" component={HomeDrawer}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="EditProfile" component={EditProfile}
				options={{
					headerTitle: "Edit Profile",
					headerBackTitle: "Back",
				}}
			/>
			<Stack.Screen name="Questionnaire" component={Questionnaire}
				options={{
					headerTitle: "Edit Profile",
					headerBackTitle: "Back",
					animationEnabled: false
				}}
			/>

			<Stack.Screen name="ResetPassword" component={ResetPassword}
				options={{
					headerTitle: "Reset Password",
					headerBackTitle: "Back"
				}}
			/>

			<Stack.Screen name="DeleteAccount" component={DeleteAccount}
				options={{
					headerTitle: "Delete Account",
					headerBackTitle: "Back"
				}}
			/>
		</Stack.Navigator>
	);
}

export default HomeStack;