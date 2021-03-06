import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    KeyboardAvoidingView
} from 'react-native';

import Colors from "../constants/Colors";
import { AuthContext } from '../context';

// authentication imports
import { auth, rtdb } from '../database/RTDB';
import { AuthCredential, createUserWithEmailAndPassword, getAuth, onIdTokenChanged, reload, sendEmailVerification, updateProfile } from 'firebase/auth';
import { ref, child, get, set, update } from 'firebase/database';
import { FirebaseError } from '@firebase/util';

export default ({ navigation }) => {

    // Set up a state variable to tell whether we are verified in or not
    const { userToken, setUserToken }  = React.useContext(AuthContext);
    var alertDisplayed = false;

    const checkVerification = async () => {
        await reload(auth.currentUser);
        onIdTokenChanged(auth, (user) => {
            if (user) {
                if (auth.currentUser.emailVerified == true) {
                    setUserToken('Arbitrary Value');
                }
                else if (alertDisplayed == false) {
                    alertDisplayed = true;
                    Alert.alert("Verify Email", "Email has not been verified with UniRoom", {onDismiss: () => {
                        alertDisplayed = false
                    }});
                }
            }
        });
    }
    console.log("Verify Email Page Opened");

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
            <ScrollView style={styles.container}>
                <Text style={styles.intro}>Please verify your account by clicking the verification link sent to your email to continue!</Text>
                <View style={styles.form}>
                    {/* Continue Button -- Auth Stack */}
                    <View
                        style={styles.footer}
                    >
                        <TouchableOpacity style={styles.continueButton}
                            onPress={() => checkVerification()}
                        >
                            <Text style={styles.continueText}>Continue</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    /* Container Styles */
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
    },

    scroll: {
        flex: 1,
        padding: 30,
    },

    footer: {
        flex: 0.15,
        alignSelf: 'center',
        paddingTop: 5,
        paddingHorizontal: 150,
        paddingBottom: 25,
        backgroundColor: Colors.offWhite,
    },

    form: {
        margin: 20,
        textAlign: 'left',
        alignSelf: 'center',
        paddingBottom: 50,
    },

    /* Instructions */
    intro: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
        marginBottom: 40,
    },
    /* Continue Button */
    continueText: {
        fontSize: 16,
        alignSelf: 'center',
    },
    continueButton: {
        backgroundColor: Colors.offWhite,
        borderWidth: 1,
        borderRadius: 25,
        margin: 10,
        padding: 10,
        top: 15,
        width: 175,
        alignSelf: 'center',
        textAlign: 'center',
    },
});