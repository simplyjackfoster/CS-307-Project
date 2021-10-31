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
import { AuthContext } from "../context";
import { sendVerification } from '../database/sendEmail';

// authentication imports
import { auth, rtdb } from '../database/RTDB';
import { AuthCredential, createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import { ref, child, get, set, update } from 'firebase/database';
import { FirebaseError } from '@firebase/util';

export default ({ navigation }) => {

    const { userToken, setUserToken } = React.useContext(AuthContext);

    const checkVerification = () => {
        auth.currentUser.reload
        if (auth.currentUser.emailVerified == true) {
            //navigation.pop()
        }
        else {
            Alert.alert("Error", "Error: Verify your Email to Proceed");
        }
    };
    sendVerification();

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
            <ScrollView style={styles.container}>
                <Text style={styles.intro}>Please verify your account by clicking the verification link sent to your email to continue!</Text>
                <View style={styles.form}>
                    {/* Continue Button -- Auth Stack */}
                    <View
                        style={userToken ? (
                            styles.footer
                        ) : (
                            { display: 'none' }
                        )}
                    >
                        <TouchableOpacity style={styles.continueButton}
                            onPress={() => {
                                checkVerification()
                            }}
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
        backgroundColor: Colors.lightGray,
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