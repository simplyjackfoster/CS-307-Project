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
import { MatchInteractContext } from '../context';
import { reportUser } from '../database/writeData';
import { deleteMatch } from '../database/removeData';
import { getID } from '../database/ID';

// firebase imports
import { auth } from '../database/RTDB';

//export var displays;

const MatchItem = (props) => {
    //const { userToken, setUserToken }  = React.useContext();
    const { matchToken, setMatchToken } = React.useContext(MatchInteractContext);
    const [displayMatch, setDisplayMatch] = React.useState(true);
    
    const uid = props.id;

    if (uid == null) {
        console.log("null id");
        return (
            <View style={false ? (
                {/* Will always display none, nothing here */}
            ) : (
                { display: 'none' }
            )}
            >
            </View >
        );
    }

    const profile_picture = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
    const reports = getDataFromPath("reported/" + uid + "/num_reports");
    const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
    const location = getDataFromPath("users/" + uid + "/Profile/location");
    const major = getDataFromPath("users/" + uid + "/Profile/major");
    //displays = true;
    // const bday = getDataFromPath("users/" + uid + "/Critical Information/birthday");

    /* Used for age calculation */
    // var age;
    // if(bday != null) { // Seems redundant, but during loading page, bday is briefly null
    //     const bday_day = bday.substring(0, 2)
    //     const bday_month = bday.substring(3, 5)
    //     const bday_year = bday.substring(6)

    //     const date = new Date();
    //     const curr_day = date.getDate();
    //     const curr_month = date.getMonth() + 1;
    //     const curr_year = date.getFullYear();
    //     age = curr_year - bday_year;

    //     // Giga brain math to calculate true age
    //     if(bday_month >= curr_month) {
    //         if(bday_day > curr_day) {
    //             age -= 1
    //         }
    //     }
    // }


    const removeMatch = () => {
        // remove the uid from the match list in the database
        console.log("Removing match: " + uid);
        //props = null;
        deleteMatch(getID(auth.currentUser.email), props.idx, props.count);
        setDisplayMatch(false);
        //displays = false;

        // implement after adding the matches to the database
    }


    const sendMessage = (message) => {
        // send the specified message from the current user to the uid of the match displayed
        console.log("Sent message to '" + uid + "': " + message);

        // figure out navigation to the messages screen from a component
    }

    const updateMatch = () => {
        //set match token to display by calling viewProfile's viewProfile function
        setMatchToken(String(uid));
        //console.log("match: " + matchToken);
        props.func();
    }


    return (
        
        <View style=
            {displayMatch ? (
                styles.container
            ) : (
                {display: 'none'}
            )}
        >
            {/* Update current match to view, and show them */}
            <TouchableOpacity
                onPress={() =>
                    updateMatch()
                }
            >
                <Image style = {styles.profileImage}source={{uri: profile_picture}}/>
            </TouchableOpacity>
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

                {/* Report Match button */}
                <TouchableOpacity
                    style={styles.reportUserWrapper}
                    onPress={() =>
                        Alert.alert("Report User", "Are you sure you want to report " + name + "?",
                            [{ 
                                text: "No" 
                            }, {
                                text: "Yes",
                                onPress: () => reportUser(uid, reports)
                            }])
                    }
                >
                    <Text style={styles.reportUserText}>Report Match</Text>
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
        marginRight: 20,
        marginTop: 15,
    },

    buttonText: {
        fontSize: 17,
        color: Colors.lightBlue,

    },

    /* Report User */
    reportUserWrapper: {
        flexDirection: 'row',
        marginTop: 15,
        marginRight: 20
    },

    reportUserText: {
        flexDirection: 'row',
        fontSize: 17,
        color: Colors.lightRed,
    }

});
