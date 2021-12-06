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
import { collection, doc, setDoc, addDoc} from'firebase/firestore';
import { auth, firestoreDB} from  '../database/RTDB';
import { getID } from '../database/ID';
import { GiftedChat } from 'react-native-gifted-chat';
import { deleteMatch } from '../database/removeData';

const messagesRef = collection(firestoreDB,'chatroom','KU6bnqXVnKtuNsuVhFOX','messages');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


export var displays;

const MatchItem = (props) => {
    const uid = props.id;
    // get the profile from props
    const { profile, profiles, updateProfiles,
            showProfile } = props;


    /*
     * Removes match from database
     */
    const removeMatchAsync = async () => {
        deleteMatch(profile.id);
       
        // find the index in profiles for the user        
        var index;
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].id == profile.id) {
                index = i;
                break;
            }
        }

        // remove profile at that index
        var newProfiles = profiles;
        newProfiles.splice(index, 1);   

        // reset the state of profiles
        updateProfiles(newProfiles);
    } // removeMatchAsync()

    const [messages, setMessages] = useState([]);

    const sendMessage = (message) => {
        // send the specified message from the current user to the uid of the match displayed
        console.log("Sent message to '" + profile.id + "': " + message);
        const msg = message
        const mymsg = {
            _id: makeid(36),
            text: message,
            sentBy: getID(auth.currentUser.email),
            sentTo: profile.id,
            createdAt: new Date(),
            sent: true,
            user:{_id: getID(auth.currentUser.email)}
        }
        console.log(message)
        setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))

        const createDocuments = async () =>{
            await addDoc(messagesRef, {...mymsg});
        };
        createDocuments();


        // figure out navigation to the messages screen from a component
    }


    /*
     * Shows the profile on the matches screen
     */ 
    const viewProfile = () => {
        showProfile(profile);
    }



    return (
        <View style={styles.container}>

            {/* Update current match to view, and show them */}
            <TouchableOpacity
                onPress={() =>
                    viewProfile()
                }
            >
                <Image style={styles.profileImage}
                       source={profile.profile_picture}/>
            </TouchableOpacity>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.description}>Location: {profile.location}</Text>
            <Text style={styles.description}>Major: {profile.major}</Text>


            {/* Buttons */}
            <View style={styles.buttonWrapper}>

                {/* Remove match button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => 
                        Alert.alert("Confirm",
                        "Are you sure you want to remove your match with " + profile.id,
                        [{
                            text: "No"
                        },
                        {
                            text: "Yes",
                            onPress: () => removeMatchAsync(),
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
                        Alert.prompt("Message", "Send a message to " + profile.id,
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
                        Alert.alert("Report User", "Are you sure you want to report " + profile.id + "?",
                            [{ 
                                text: "No" 
                            }, {
                                text: "Yes",
                                onPress: () => reportUser(profile.id,
                                                          profile.num_reports)
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