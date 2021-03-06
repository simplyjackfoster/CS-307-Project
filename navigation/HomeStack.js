import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BackHandler } from 'react-native';

import HomeDrawer from './HomeDrawer';
import EditProfile from '../screens/EditProfile';
import ResetPassword from '../screens/ResetPassword';
import Questionnaire from '../screens/Questionnaire';
import ViewQuestionnaire from '../screens/ViewQuestionnaire';
import Interests from '../screens/Interests';
import ViewProfile from '../screens/ViewProfile';

import Colors from '../constants/Colors';
import Messages from '../screens/Messages';
import ChatScreen from '../screens/ChatScreen';

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

			<Stack.Screen name="Interests" component={Interests}
				options={{
					headerTitle: "Edit Profile",
					headerBackTitle: "Back",
					animationEnabled: false
				}}
			/>

			<Stack.Screen name="Questionnaire" component={Questionnaire} 
				options={{
					headerTitle: "Edit Profile",
					headerBackTitle: "Back",
					animationEnabled: false
				}}
			/>

			<Stack.Screen name="ViewQuestionnaire" component={ViewQuestionnaire} 
				options={{
					headerTitle: "ViewQuestionnaire",
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

			<Stack.Screen name="ChatScreen" component={ChatScreen}
				options={
					({route}) => ({ 
						headerTitle: route.params.name,
						headerBackTitle: "Back"
					})
				}
			/>
			<Stack.Screen name="ViewProfile" component={ViewProfile}
				options={{
					headerTitle: "View Profile",
					headerBackTitle: "Back"
				}}
			/>

		</Stack.Navigator>	
	);
}

export default HomeStack;