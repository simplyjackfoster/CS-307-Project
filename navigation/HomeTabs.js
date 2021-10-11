import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '../screens/Profile';
import Feed from '../screens/Feed';
import Matches from '../screens/Matches';
import Messages from '../screens/Messages';

const Tabs = createBottomTabNavigator();


const HomeTabs = () => {
	return (
		<Tabs.Navigator>
			<Tabs.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
			<Tabs.Screen name="Feed" component={Feed} options={{ headerShown: false }}/>
			<Tabs.Screen name="Matches" component={Matches} options={{ headerShown: false }}/>
			<Tabs.Screen name="Messages" component={Messages} options={{ headerShown: false }}/>
		</Tabs.Navigator>
	);
}

export default HomeTabs;