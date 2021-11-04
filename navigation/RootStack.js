import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeStack from './HomeStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

// The root stack for the authentication screen and the home screen
const RootStack = ({ userToken }) => {
	return (
			<Stack.Navigator>
				{userToken ? (
					// If we have a userToken, render home screen. Otherwise render auth screen.
					<Stack.Screen name="Home" component={HomeStack}
					options={{ headerShown: false, animationEnabled: false}}/>
				) : (
					<Stack.Screen name="Auth" component={AuthStack}
					options={{ headerShown: false, animationEnabled: false}}/>
				)}
			</Stack.Navigator>
	);
}

export default RootStack;