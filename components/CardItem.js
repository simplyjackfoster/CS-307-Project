import React, { useState } from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    ScrollView,
    Image,
    Linking,
    TouchableOpacity,
    Alert
} from 'react-native';
import Animated, { color, round } from 'react-native-reanimated';

import {
    getDataFromPath,
    getInstagramLink,
    getInterests,
    getQuestionnaire
} from "../database/readData";
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";
import { reportUser } from '../database/writeData';
import { auth } from '../database/RTDB';
import { getID } from '../database/ID';
import { deleteMatch } from '../database/removeData';
import { ViewQuestionnaire } from '../screens/ViewQuestionnaire';
import Questionnaire, { questions, responses } from '../screens/Questionnaire';


export var removeCurrentMatch = false;
export var matchName = "";


export const CardItem = (props) => {
    const { profile, viewingMatch, updateProfiles, matches, showProfile } = props;

    // hook for displaying questionnaire
    const [viewingQuestionnaire, setViewingQuestionnaire] = React.useState(false);

    const getBorderColor = () => {
        return Math.floor(profile.compatibility_score / 34);
    }



    /*
     * Removes match from database and from match list
     */
    const removeMatchAsync = async () => {
        deleteMatch(profile.id);
    
        // find the index in profiles for the user        
        var index;
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].id == profile.id) {
                index = i;
                break;
            }
        }

        // remove profile at that index
        var newProfiles = matches;
        newProfiles.splice(index, 1);   

        // reset the state of profiles
        updateProfiles(newProfiles);
    } // removeMatchAsync()





    // display questionnaire when applicable
    if (viewingQuestionnaire) {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    {/* return to feed button */}
                    <TouchableOpacity 
                        style={styles.returnButton}
                        onPress={() => {
                            setViewingQuestionnaire(!viewingQuestionnaire);
                        }}
                    >
                        <View>
                            <Text style={styles.returnText}>View Profile</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.questionaireHeader}>{profile.name}'s Questionnaire Answers</Text>

                    {/* Questions and responses for the other user */}
                    <View>
                        {/* 1 */}
                        <Text style={styles.question}>{questions[1]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 1 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 1 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[1][profile.questionnaire1]}
                        </Text>

                        {/* 2 */}
                        <Text style={styles.question}>{questions[2]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 2 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 2 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[2][profile.questionnaire2]}
                        </Text>

                        {/* 3 */}
                        <Text style={styles.question}>{questions[3]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 3 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 3 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[3][profile.questionnaire3]}
                        </Text>

                        {/* 4 */}
                        <Text style={styles.question}>{questions[4]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 4 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 4 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[4][profile.questionnaire4]}
                        </Text>

                        {/* 5 */}
                        <Text style={styles.question}>{questions[5]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 5 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 5 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[5][profile.questionnaire5]}
                        </Text>

                        {/* 6 */}
                        <Text style={styles.question}>{questions[6]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 6 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 6 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[6][profile.questionnaire6]}
                        </Text>

                        {/* 7 */}
                        <Text style={styles.question}>{questions[7]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 7 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 7 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[7][profile.questionnaire7]}
                        </Text>

                        {/* 8 */}
                        <Text style={styles.question}>{questions[8]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 8 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 8 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[8][profile.questionnaire8]}
                        </Text>

                        {/* 9 */}
                        <Text style={styles.question}>{questions[9]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 9 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 9 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[9][profile.questionnaire9]}
                        </Text>

                        {/* 10 */}
                        <Text style={styles.question}>{questions[10]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 10 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 10 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[10][profile.questionnaire10]}
                        </Text>

                        {/* 11 */}
                        <Text style={styles.question}>{questions[11]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 11 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 11 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[11][profile.questionnaire11]}
                        </Text>

                        {/* 12 */}
                        <Text style={styles.question}>{questions[12]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 12 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 12 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[12][profile.questionnaire12]}
                        </Text>

                        {/* 13 */}
                        <Text style={styles.question}>{questions[13]}</Text>
                        <Text 
                            style={[styles.response,
                                profile.most_similar_response == 13 ? ({color: Colors.darkGreen}) : ({}),
                                profile.most_different_response == 13 ? ({color: Colors.darkRed}) : ({})
                            ]}
                        >
                            {responses[13][profile.questionnaire13]}
                        </Text>

                        {/* return to feed button */}
                        <TouchableOpacity 
                            style={styles.returnButton}
                            onPress={() => {
                                setViewingQuestionnaire(!viewingQuestionnaire);
                            }}
                        >
                            <View>
                                <Text style={styles.returnText}>View Profile</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    /* Display the card item when applicable */
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>

                {/* Profile Picture */}
                <View style={styles.imageWrapper}>
                    <Image style={styles.profilePic}
                        source={profile.profile_picture}
                    />
                </View>


                {/* Name and Age */}
                <View style={styles.nameWrapper}>
                    <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
                </View>


                {/* Bio (optional) */}
                <View style=
                    {profile.bio ? (
                        styles.bioWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <Text style={styles.bioContent}>{profile.bio}</Text>
                </View>


                {/* Interests */} 
                <View style={styles.interestsContainer}>
                    <View style=
                        {profile.interest1 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest1}</Text>
                    </View>
                    <View style=
                        {profile.interest2 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest2}</Text>
                    </View>
                    <View style=
                        {profile.interest3 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest3}</Text>
                    </View>
                    <View style=
                        {profile.interest4 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest4}</Text>
                    </View>
                    <View style=
                        {profile.interest5 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest5}</Text>
                    </View>
                </View>



                {/* Compatibility Score (if in feed) */}
                <View 
                    style={getID(auth.currentUser.email) != profile.id ? (
                        styles.compatibilityScoreWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <Text 
                        style={[styles.compatibilityScoreText,
                        getBorderColor() == 0 ? (
                            {borderColor: Colors.red}
                        ) : (
                            {borderColor: getBorderColor() == 1 ? Colors.yellow : Colors.green}
                        )]}
                    >
                        {profile.compatibility_score}%
                    </Text>

                    <TouchableOpacity
                        style={styles.viewQuestionnaireButton}
                        onPress={() => setViewingQuestionnaire(!viewingQuestionnaire)}
                    >
                        <Text style={styles.viewQuestionnaireText}>View Questionnaire</Text>
                    </TouchableOpacity>
                </View>



                {/* Graduation year (optional) */}
                <View style={
                    profile.graduation_year ? (
                        styles.graduationYearWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("graduation-cap", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.graduationYearContent}>Class of {profile.graduation_year}</Text>
                </View>


                {/* Major (optional) */}
                <View style=
                    {profile.major ? (
                        styles.majorWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("book", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.infoHeader}>Major: </Text>
                    <Text style={styles.infoContent}>{profile.major}</Text>
                </View>


                {/* Location (optional) */}
                <View style=
                    {profile.location ? (
                        styles.locationWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("map-pin", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.infoHeader}>Location: </Text>
                    <Text style={styles.infoContent}>{profile.location}</Text>
                </View>


                {/* Preferred # of Roommates (optional) */}
                <View style=
                    {profile.preferred_num_roommates ? (
                        styles.preferredNumRoommatesWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("users", 22, Colors.royalBlue)}
                    </View>
                    <Text style={styles.infoHeader}>Preferred # of Roommates: </Text>
                    <Text style={styles.infoContent}>{profile.preferred_num_roommates}</Text>
                </View>


                {/* Preferred living location (optional) */}
                <View style=
                    {profile.preferred_living_location ? (
                        styles.preferredLivingLocationWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("home", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.preferredLivingLocationContent}>Preferred Housing: {profile.preferred_living_location}</Text>
                </View>


                {/* Vaccination status */}
                <View style={styles.vaccinationWrapper}>
                    <View>
                        {renderIcon("medkit", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.vaccinationContent}>
                        {(profile.vaccinated == "Vaccinated") ? (
                            "Vaccinated for Covid-19"
                        ) : (
                            "Not vaccinated for Covid-19"
                        )}
                    </Text>
                </View>


                <View style={{paddingTop: 20}}>

                {/* Instagram (optional) */}
                <View style=
                    {profile.instagram ? (
                        styles.mediaWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <TouchableOpacity style={styles.instagramButton}
                        onPress={async () => {
                            const supported = await Linking.canOpenURL("https://www.instagram.com/"
                                            + profile.instagram + "/");
                            if (supported) {
                                Linking.openURL("https://www.instagram.com/"
                                            + profile.instagram + "/");
                            }
                            else {
                                console.log("Instagram Link doesn't exist");
                            }
                        }}
                    >
                        <View style={styles.viewMediaWrapper}>
                            {renderIcon("instagram", 25, "#ff00ff")}
                            <Text style={styles.viewMediaText}>View Instagram</Text>
                        </View>
                        <Text style={styles.mediaUsernameText}>{profile.instagram}</Text>
                    </TouchableOpacity>
                </View>


                {/* Facebook (optional) */}
                <View style=
                    {profile.facebook ? (
                        styles.mediaWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <TouchableOpacity style={styles.facebookButton}
                        onPress={async () => {
                            const supported = await Linking.canOpenURL("https://www.facebook.com/"
                                            + profile.facebook + "/");
                            if (supported) {
                                Linking.openURL("https://www.facebook.com/"
                                            + profile.facebook + "/");
                            }
                            else {
                                console.log("Facebook Link doesn't exist");
                            }
                        }}
                    >
                        <View style={styles.viewMediaWrapper}>
                            {renderIcon("facebook", 25, "#4267B2")}
                            <Text style={styles.viewMediaText}>View Facebook</Text>
                        </View>
                        <Text style={styles.mediaUsernameText}>{profile.facebook}</Text>
                    </TouchableOpacity>
                </View>


                {/* LinkedIn (optional) */}
                <View style=
                    {profile.linkedIn ? (
                        styles.mediaWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <TouchableOpacity style={styles.linkedInButton}
                        onPress={async () => {
                            const supported = await Linking.canOpenURL("https://www.linkedin.com/in/"
                                            + profile.linkedIn + "/");
                            if (supported) {
                                Linking.openURL("https://www.linkedin.com/in/"
                                            + profile.linkedIn + "/");
                            }
                            else {
                                console.log("LinkedIn Link doesn't exist");
                            }
                        }}
                    >
                        <View style={styles.viewMediaWrapper}>
                            {renderIcon("linkedin", 25, "#0077b5")}
                            <Text style={styles.viewMediaText}>View LinkedIn</Text>
                        </View>
                        <Text style={styles.mediaUsernameText}>{profile.linkedIn}</Text>
                    </TouchableOpacity>
                </View>

                </View>




                <View style={
                    viewingMatch ? (
                        styles.matchButtonWrapper
                    ) : (
                        { display: 'none' }
                    )
                }>
                    {/* Remove match button */}
                    <TouchableOpacity
                        style={styles.matchButton}
                        onPress={() =>
                            Alert.alert("Confirm",
                                "Are you sure you want to remove your match with " + profile.name,
                                [{
                                    text: "No"
                                },
                                {
                                    text: "Yes",
                                    onPress: () => {
                                        removeMatchAsync() // remove match
                                        showProfile(null) // view matches
                                    },
                                }
                                ])
                        }
                    >
                        <Text style={styles.matchButtonText}>Remove Match</Text>
                    </TouchableOpacity>
                    {/* Send message button */}
                    <TouchableOpacity
                        style={styles.matchButton}
                        onPress={() =>
                            Alert.prompt("Message", "Send a message to " + profile.name,
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Message Pressed"),
                                        style: "cancel",
                                    },
                                    {
                                        text: "Send",
                                        //onPress: message => sendMessage(message),
                                    }
                                ],
                            )}
                    >
                        <Text style={styles.matchButtonText}>Message</Text>
                    </TouchableOpacity>
                </View>



                {/* Report User */}
                <View style={styles.reportUserWrapper}>
                    <Text style={styles.reportUserText}
                        onPress={() => {
                            Alert.alert("Report User", "Are you sure you want to report " + profile.name + "?",
                            [{ 
                                text: "No" 
                            }, {
                                text: "Yes",
                                onPress: () => reportUser(profile.id, profile.num_reports)
                            }]); 
                        }}
                    >
                        Report User
                    </Text>
                </View>


            </View>
        </ScrollView>
    );
}

export default CardItem;



// styles
const styles = StyleSheet.create({

    /* Container styles */
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 25,
    },

    contentContainer: {
        flex: 1,
        alignSelf: 'center',
        width: 325,
        padding: 7,
    },


    /* Profile Picture */
    profilePic: {
        width: 340,
        height: 340, 
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'center',
    },


    /* Name */
    nameWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },

    nameText: {
        fontSize: 30,
        alignSelf: 'flex-start',
    },


    /* Compatibility Score */
    compatibilityScoreWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    

    compatibilityScoreText: {
        alignContent: 'flex-end',
        fontSize: 20,
        borderWidth: 2.5,
        borderRadius: 20,
        padding: 5,
    },


    /* Bio */
    bioWrapper: {
        paddingTop: 20,
    },

    bioContent: {
        fontSize: 15, 
    },


    /* Interets */
    interestsContainer: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    interestWrapper: {
        flexDirection: 'row',
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 2,
        padding: 7,

    },

    interestText: {
        fontSize: 12,
    },
    

    /* Graduation Year */
    graduationYearWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },

    graduationYearContent: {
        paddingLeft: 5,
        fontSize: 20,
    },


    /* Major */
    majorWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },

    /* Location */
    locationWrapper: {
        paddingTop: 20,
        paddingLeft: 5,
        flexDirection: 'row',
    },
   
    /* Preferred Roommates */
    preferredNumRoommatesWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },


    infoHeader: {
        fontStyle: 'italic',
        paddingLeft: 15,
        fontSize: 20,
    },

    infoContent: {
		flex: 1,
		flexWrap: 'wrap',
        fontSize: 20,
    },

    /* Preferred Living Location */
    preferredLivingLocationWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },

    preferredLivingLocationContent: {
        paddingLeft: 15,
        fontSize: 20,
    },


    /* Vaccination */
    vaccinationWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },

    vaccinationContent: {
        paddingLeft: 15,
        fontSize: 20, 
    },
    

    /* Social Media */
    mediaWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15,
    },

    instagramButton: {
        paddingHorizontal: 25,
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 20,
        borderWidth: 1.15,
        borderColor: Colors.fuchsia,
    },

    facebookButton: {
        paddingHorizontal: 25,
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 20,
        borderWidth: 1.15,
        borderColor: '#4267B2',
    },

    linkedInButton: {
        paddingHorizontal: 25,
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 20,
        borderWidth: 1.15,
        borderColor: '#0077b5',
    },

    viewMediaWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    
    viewMediaText: {
        fontSize: 15,
        paddingTop: 5,
        paddingLeft: 12,
    },
    
    mediaUsernameText: {
        color: Colors.darkGray,
        fontSize: 12,
        paddingTop: 3,
        alignSelf: 'center',
    },

    /* View Questionnaire */
    viewQuestionnaireText: {
		fontSize: 18, 
        fontWeight: '500',
		color: Colors.royalBlue,
		textDecorationLine: 'none',
    },

    viewQuestionnaireButton: {
		alignSelf: 'center',
    },
    
    /* Match Buttons */
    matchButtonWrapper: {
        marginTop: 30,
        flexDirection: 'row',
        alignSelf: 'center',
    },

    matchButton: {
        marginRight: 20,
        marginTop: 15,
    },

    matchButtonText: {
        fontSize: 17,
        color: Colors.lightBlue,

    },

    /* Report User */
    reportUserWrapper: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 30,
    },

    reportUserText: {
        alignSelf: 'center',
        fontWeight: '600',
        color: Colors.lightRed,
        fontSize: 14,
    },


    /* styles for the questionnaire screen */
    questionaireHeader: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '600',
        margin: 10,
    },

    question: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
        textAlign: 'center',
    },

    response: {
        fontSize: 18,
        fontWeight: '400',
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',

    },


    /* styles for return button */
    returnButton: {
        alignSelf: 'center',
        padding: 5,
        margin: 5,
    },

    returnText: {
        fontSize: 18, 
        fontWeight: '500',
		color: Colors.royalBlue,
		textDecorationLine: 'none',
    },
});