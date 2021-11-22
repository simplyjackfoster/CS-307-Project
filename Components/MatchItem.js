import React, { useState } from 'react';
import { 
    StyleSheet,
    Text, 
    View,
    Image,
    Button,
    Alert,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { getDataFromPath, getInstagramLink } from "../database/readData";
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";



const MatchItem = (props) => {
    const [displayMatch, setDisplayMatch] = React.useState(true);

    const uid = props.id;
    const profile_picture = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
    const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
    const location = getDataFromPath("users/" + uid + "/Profile/location");
    const major = getDataFromPath("users/" + uid + "/Profile/major");

    const removeMatch = () => {
        // remove the uid from the match list in the database
        console.log("Removing match: " + uid);
        
        setDisplayMatch(false);


        // implement after adding the matches to the database
    }


    const sendMessage = (message) => {
        // send the specified message from the current user to the uid of the match displayed
        console.log("Sent message to '" + uid + "': " + message);

        // figure out navigation to the messages screen from a component
    }


    return (
        
        <View style=
            {displayMatch ? (
                styles.container
            ) : (
                {display: 'none'}
            )}
        >
            <Image style = {styles.profileImage}source={{uri: profile_picture}}/>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>Location: {location}</Text>
            <Text style={styles.description}>Major: {major}</Text>
            <View style={styles.buttonWrapper}>

                {/* Remove match button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => 
                        Alert.alert("Confirm",
                        "Are you sure you want to remove your match with " + name,
                        [{
                            text: "No"
                        },
                        {
                            text: "Yes",
                            onPress: () => removeMatch(),
                        }
                    ])
                    }
                >
                    <Text style={styles.buttonText}>Remove Match</Text>
                </TouchableOpacity>

                {/* Send message button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => 
                        Alert.prompt("Message", "Send a message to " + name,
                        [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Message Pressed"),
                            style: "cancel",
                        },
                        {
                            text: "Send",
                            onPress: message => sendMessage(message),
                        }
                        ],
                    )}
                >
                    <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
                
            </View>
            
        </View>
    );
}

export default MatchItem;

// styles
const styles = StyleSheet.create({

    /* Container styles */
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 25,
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 20,
    },

    name: {
        fontSize: 20,
    },

    description: {
        color: Colors.gray,
        flexWrap: 'wrap',
        fontSize: 17,
        paddingTop: 5,
    },

    profileImage: {
        borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15,
        paddingTop: 5,
        alignSelf: 'flex-start',
    },

    buttonWrapper: {
        flexDirection: 'row',
    },

    button: {
        marginRight: 30,
        marginTop: 15,
    },

    buttonText: {
        fontSize: 17,
        color: Colors.lightBlue,

    }


});
