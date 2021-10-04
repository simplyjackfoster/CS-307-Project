import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'

import { AuthContext } from "./context"
import Colors from "./constants/Colors";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Questionnaire from "./screens/Questionnaire";
import Feed from "./screens/Feed";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Account from "./screens/Account";
import ResetPassword from "./screens/ResetPassword";
import Settings from "./screens/Settings";
import CodeOfConduct from "./screens/CodeOfConduct";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import FAQ from "./screens/FAQ";
import Help from "./screens/Help";


// Create navigators
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



// Create the tabs at the bottom that include "Profile", "Feed", and "Messages" 
const HomeTabs = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    <Tabs.Screen name="Feed" component={Feed} options={{ headerShown: false }}/>
    <Tabs.Screen name="Messages" component={Messages} options={{ headerShown: false }}/>
  </Tabs.Navigator>
);



// Drawer on the left that includes "HomeTabs" and "Settings" 
const HomeDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="UniRoom" component={HomeTabs}/>
    <Drawer.Screen name="Account" component={Account}/>
    <Drawer.Screen name="Settings" component={Settings}/>
    <Drawer.Screen name="CodeOfConduct" component={CodeOfConduct}
     options={{ title: "Code of Conduct"}}/>
    <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy}
     options={{ title: "Privacy Policy"}}/>
    <Drawer.Screen name="FAQ" component={FAQ}/>
    <Drawer.Screen name="Help" component={Help}/>
  </Drawer.Navigator>
);



// Stack that allows us to move between the Drawer and Edit Profile
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeDrawer" component={HomeDrawer}
     options={{ headerShown: false }}/>
    <Stack.Screen name="EditProfile" component={EditProfile}
     options={{ headerTitle: "Edit Profile", headerBackTitle: "Back" }}/>
    <Stack.Screen name="ResetPassword" component={ResetPassword}
     options={{ headerTitle: "Reset Password", headerBackTitle: "Back" }}/>
  </Stack.Navigator>
);




/*
 * This is the default export for the App.
 */
export default function App() {

  // Set up a state variable to tell whether we are signed in or not
  const [userToken, setUserToken] = React.useState(null);
  
  return (
    <AuthContext.Provider value={ {userToken, setUserToken} }>

      <NavigationContainer>
        {userToken ? ( // If we have a userToken, then render the Home page. 
          <MainStack.Navigator>
            <MainStack.Screen name="Home" component={HomeStack} options={{ headerShown: false}}/>
          </MainStack.Navigator>
        ) : ( // If we DON'T have a userToken, then render the Login page.
          <AuthStack.Navigator>
            <AuthStack.Screen name="Login"
            component={Login} options={{ title: "UniRoom" }}/>

            <AuthStack.Screen name="Signup" component={Signup}
            options={{ title: "Create Account", headerBackTitle: "Log In" }}/>
          </AuthStack.Navigator>
        )}
      </NavigationContainer>

    </AuthContext.Provider>
  );
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
