import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user can view the code of conduct.
 */
export default ({ navigation }) => {
	return (
    <ScrollView>
		  <View style={styles.container}>
        <Text>
        <Text>
              {"Welcome to UniRoom, a one of a kind university roommate matching app."}
              {"\n\n"}
              {"This code of conduct lays out the basics of how to use this app, how UniRoom interacts with you, the user, "}
              {"and what is not permitted on the app."}
              {"\n\n"}
        </Text>
        <Text styles={styles.txtBold}>How to Use UniRoom</Text>
              {"\n"}
              {"\tFundamentally UniRoom is very simple. Users, like you, are able to create an account using your university email, "}
              {"and search for potential roommates for the upcoming school year. When creating your profile you will have the "}
              {"ability to upload pictures of you, and how your own room looks. You will also be prompted to enter information such "}
              {"as your name, major, date of birth, gender, and responses to a questionnaire on your current living habits. "}
              {"Using this information UniRoom can suggest to you highly compatible roommates, and allow you the user to filter through "}
              {"roommates. "}
              {"\n"}
              {"\tOnce logged in the user can select whether or not they would like to attempt to match with a roommate by selecting a "}
              {"check mark or an x, or swiping on them. Before selecting whether or not you would like to try to match with another "}
              {"individual, the user will be able to view the individual’s uploaded pictures, name, major, gender, and living habits. "}
              {"If you match with another user you will have the ability to message them and create a room items checklist. "}
              {"If you, the user are searching for multiple roommates and you and your matches have common matches the ability to create"} 
              {"a group chat between multiple users will also be provided."}
              {"\n\n"}
              {"The Role of UniRoom and UniRoom Administrators"}
              {"\n"}
              {"\tUniRoom would like to be as minimally invasive as possible meaning, we will not collect any information that is not "}
              {"necessary. UniRoom collects information such as date of birth, and your university email such that we can ensure only "}
              {"enrolled students are interacting with one another and we comply with privacy laws within the United States. "}
              {"Administrators will have the duty of reviewing reported accounts and content on the app to ensure that the content "}
              {"uploaded on this app is in compliance with our code of conduct. If users are found to be in violation of this apps’"} 
              {"policies then UniRoom and it’s administrators will have the ability to suspend a user temporarily or permanently."}
              {"\n\n"}
              {"Prohibited Content"}
              {"\n"}
              {"On the UniRoom app users are not permitted to interact with other users in the following ways:"}
              {"\n"}
              {"\t-Spamming"}
              {"\n"}
              {"\t-Harassment"}
              {"\n"}
              {"\t-Exploitation"}
              {"\n"}
              {"\t-Blackmail"}
              {"\n"}
              {"\t-Bullying"}
              {"\n"}
              {"\t-Stalking"}
              {"\n\n"}
              {"Users are not permitted to upload:"}
              {"\n"}
              {"\t-Other individual’s personal information"}
              {"\n"}
              {"\t-Sexually explicit imagery"}
              {"\n"}
              {"\t-Targeted derogatory slurs"}
              {"\n\n"}
              {"\tThose found in violation of this code can be reported, and removed temporarily upon the first and second violation of"} 
              {"this code, and permanently upon the third. If you, the user, believes an individual is in violation of the code of "}
              {"conduct we encourage you to report them without hesitation. Each report will be reviewed, and if a user is found in "}
              {"violation of the code they will be suspended, notified, and their violation will be removed from the app but documented "}
              {"by administrators. If a user is reported three times within 48 hours, then the user will be temporarily suspended "}
              {"immediately."}
              {"\n\n"}
              {"What Happens When You are Suspended"}
              {"\n"}
              {"\tIf you are suspended, UniRoom will notify you both via the app and via email that your account is either temporarily or "}
              {"permanently suspended. If you are temporarily suspended you, the user, will only be able to view your own profile, the "}
              {"help tab of the app, and your messages. You will not be permitted to swipe on others, or message your previous matches "}
              {"until the temporary suspension has been lifted. Temporary suspensions can last for a few hours up to 2 weeks. If you, the"} 
              {"user, becomes permanently suspended, you will no longer be able to access any of the apps’ features, or make another "}
              {"account with your university email. Appeals can be sent to the app’s administrators for review, and may be approved on a"} 
              {"case by case basis to reinstate your account. Additionally, any other requests to the UniApp team regarding your data"} 
              {"and personal information can continue to be made in compliance with United States data laws."}
              {"\n\n"}
              {"Questions or Concerns?"}
              {"\n"}
              {"\tIf you have any questions, concerns, or would like to contact a UniRoom administrator please select the link below to"} 
              {"send a message to our admins. We will get back to you as soon as possible!"}
              {"\n\n"}
              {"LINK_HERE"}
              {"\n\n"}
              {"Happy Searches,"}
              {"\n\n"}
              {"The UniRoom Team"}
        </Text>
		  </View>
    </ScrollView>
	);
}



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  txtBold: {
    fontWeight: "bold",
  },

});