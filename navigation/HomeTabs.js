import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Feed from '../screens/Feed';
import Matches from '../screens/Matches';
import Messages from '../screens/Messages';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tabs = createBottomTabNavigator();

const HomeTabs = () => {
	return (
		<Tabs.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = focused
                ? 'home'
                : 'home';
            }
			else if (route.name === 'Feed') {
              iconName = focused ? 'align-justify' : 'align-justify';
            }
			else if (route.name === 'Matches') {
              iconName = focused ? 'heart' : 'heart';
            }
			else if (route.name === 'Messages') {
              iconName = focused ? 'comment' : 'comment';
            }
			
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#66a3ff',
          tabBarInactiveTintColor: 'gray',
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