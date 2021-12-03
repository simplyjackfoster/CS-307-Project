import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeTabs from './HomeTabs';
import Account from '../screens/Account';
import Settings from '../screens/Settings';
import CodeOfConduct from '../screens/CodeOfConduct';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import FAQ from '../screens/FAQ';
import Help from '../screens/Help';
import Testing from '../screens/Testing'

import Colors from '../constants/Colors';

const Drawer = createDrawerNavigator();

// Drawer on the left that includes "HomeTabs" and "Settings" 
const HomeDrawer = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Home" component={HomeTabs}
				options={{
					headerTitle: "UniRoom",
				}}
			/>

			<Drawer.Screen name="Account" component={Account}/>

			<Drawer.Screen name="Settings" component={Settings}/>

			<Drawer.Screen name="CodeOfConduct" component={CodeOfConduct}
				options={{
					title: "Code of Conduct"
				}}
			/>

			<Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy}
				options={{
					title: "Privacy Policy"
				}}
			/>

			<Drawer.Screen name="FAQ" component={FAQ}/>

			<Drawer.Screen name="Help" component={Help}/>

			<Drawer.Screen name="Testing" component={Testing}/>
		</Drawer.Navigator>
	);
}

export default HomeDrawer;