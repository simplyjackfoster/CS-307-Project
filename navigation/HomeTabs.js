import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import Profile from '../screens/Profile';
import Feed from '../screens/Feed';
import Matches from '../screens/Matches';
import Messages from '../screens/Messages';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tabs = createBottomTabNavigator();

const HomeTabs = () => {
	return (
		<Tabs.Navigator
		screenOptions={
			({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
			let name;
			size = 30;

            if (route.name === 'Profile') {
              iconName = focused
                ? 'user'
                : 'user';
            }
			else if (route.name === 'Feed') {
              iconName = focused ? 'align-justify' : 'align-justify';
            }
			else if (route.name === 'Matches') {
              iconName = focused ? 'check-square' : 'check-square';
            }
			else if (route.name === 'Messages') {
              iconName = focused ? 'comment' : 'comment';
            }
            return (
			<Icon  name={iconName} size={size} color={color} />);
          },
          tabBarActiveTintColor: '#66a3ff',
          tabBarInactiveTintColor: 'gray',
		  tabBarLabelStyle: {
			  fontSize: 15,
		  },
		  tabBarIconStyle: {
			  marginTop: 2,
		  }
        })}
		 >
			<Tabs.Screen name="Profile" component={Profile} options={{ headerShown: false}}/>
			<Tabs.Screen name="Feed" component={Feed}  options={{ headerShown: false}}/>
			<Tabs.Screen name="Matches" component={Matches}  options={{ headerShown: false}}/>
			<Tabs.Screen name="Messages" component={Messages}  options={{ headerShown: false}}/>
		</Tabs.Navigator>


	);
}


export default HomeTabs;