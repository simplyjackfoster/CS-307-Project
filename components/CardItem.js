import React from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import { getDataFromPath } from "../database/readData";
import Colors from "../constants/Colors";
import { getID } from "../database/ID";
import { auth } from '../database/RTDB';



const CardItem = (props) => {
    
    const uid = props.id;
    /* 
    const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
    const location = getDataFromPath("users/" + uid + "/Profile/location");
    const graduationYear = getDataFromPath("users/" + uid + "/Profile/graduation_year");
    const major = getDataFromPath("users/" + uid + "/Profile/major");
    const bio = getDataFromPath("users/" + uid + "/Profile/bio");
    const vaccination = getDataFromPath("users/" + uid + "/Profile/covid_vaccination_status");
    const preferredRoommates = getDataFromPath("users/" + uid + "/Profile/preferred_number_of_roommates");    
    const bday = getDataFromPath("users/" + uid + "/Critical Information/birthday");
    */
    // var image = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
    // console.log("OK!")
    //console.log("INSIDE OF CARDITEM")

    // console.log("BEFORE PRINTING IMAGE")
    // const image = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
    // console.log("PRINTING IMAGE")
    // console.log(image)
    // if(image == null) {
    //     image = "";
    // }

    //var age
    /* Used for age calculation */
    /*if(bday != null) { // Seems redundant, but during loading page, bday is briefly null
        const bday_day = bday.substring(0, 2)
        const bday_month = bday.substring(3, 5)
        const bday_year = bday.substring(6)

        const date = new Date();
        const curr_day = date.getDate();
        const curr_month = date.getMonth() + 1;
        const curr_year = date.getFullYear();
        age = curr_year - bday_year;

        /* Giga brain math to calculate true age */
     /*   if(bday_month >= curr_month) {
            if(bday_day > curr_day) {
                age -= 1
            }
        }
    }*/


    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>

                {/* Profile Picture */}
                <SafeAreaView style={styles.imageWrapper}>
                    <Image style={styles.profilePic}
                        source={{uri: getDataFromPath("users/" + uid + "/Profile/Images/profile_picture")}}
                    />
                </SafeAreaView>

                {/* Name */}
                <SafeAreaView style={styles.nameWrapper}>
                    <Text style={styles.nameText}>{getDataFromPath("users/" + uid +
                        "/Profile/profile_name")}
                    </Text>
                </SafeAreaView>



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
        
    },

    /* Profile Picture */
    profilePic: {
        width: 300,
        height: 300,
        borderRadius: 25,
        marginTop: 35,
        alignSelf: 'center',

    },

    /* Name */
    nameWrapper: {
        marginHorizontal: 40,
        marginTop: -55,
    },

    nameText: {
        fontSize: 35,
        fontWeight: '600',
        color: Colors.white,
        textShadowColor: Colors.black,
        shadowOpacity: 100,
        shadowRadius: 3,
        shadowOffset: {width: 0, height: 0},
    },


});