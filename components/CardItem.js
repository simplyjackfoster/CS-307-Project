import React from "react";
import { 
    StyleSheet,
    Text, 
    View, 
    ScrollView,
    Image,
} from "react-native";
import { getDataFromPath } from "../database/readData";
import Colors from "../constants/Colors";

const CardItem = (props) => {
    const uid = props.id;
    const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
    const location = getDataFromPath("users/" + uid + "/Profile/location");
    const graduationYear = getDataFromPath("users/" + uid + "/Profile/graduation_year");
    const major = getDataFromPath("users/" + uid + "/Profile/major");
    const bio = getDataFromPath("users/" + uid + "/Profile/bio");
    const vaccination = getDataFromPath("users/" + uid + "/Profile/covid_vaccination_status");
    const preferredRoommates = getDataFromPath("users/" + uid + "/Profile/preferred_number_of_roommates");    
    const bday = getDataFromPath("users/" + uid + "/Critical Information/birthday");
    // var image = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
    // console.log("OK!")
    console.log("INSIDE OF CARDITEM")
    console.log("UID WAS: " + uid)

    // console.log("BEFORE PRINTING IMAGE")
    // const image = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
    // console.log("PRINTING IMAGE")
    // console.log(image)
    // if(image == null) {
    //     image = "";
    // }

    var age
    /* Used for age calculation */
    if(bday != null) { // Seems redundant, but during loading page, bday is briefly null
        const bday_day = bday.substring(0, 2)
        const bday_month = bday.substring(3, 5)
        const bday_year = bday.substring(6)

        const date = new Date();
        const curr_day = date.getDate();
        const curr_month = date.getMonth() + 1;
        const curr_year = date.getFullYear();
        age = curr_year - bday_year;

        /* Giga brain math to calculate true age */
        if(bday_month >= curr_month) {
            if(bday_day > curr_day) {
                age -= 1
            }
        }
    }


    return (
        // <ScrollView style={styles.container}>
        //     <Text>{name}</Text>
        //     <Text>{location}</Text>
        //     <Text>Class of {graduationYear}</Text>
        //     <Text>Studying {major}</Text>
        //     <Text>{bio}</Text>
        //     <Text>I am {vaccination} for Covid-19</Text>
        //     <Text>I prefer to have {preferredRoommates} roommates</Text>
        //     <Text>I am {age} years old.</Text>
        // </ScrollView>

        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.imageWrapper}>
                    
                    {/* <Image style={styles.profilePic}
					source={{uri: image}}
				    /> */}
                    <Image style={styles.profilePic}
					source={{uri: getDataFromPath("users/" + uid + "/Profile/Images/profile_picture")}}
				    />
                </View>

                <View style={styles.nameWrapper}>
                    <Text style={styles.nameText}>
                        {name}
                    </Text>
                </View>
                <View style={styles.nameWrapper}>
                    <Text style={styles.nameText}>
                        {age}
                    </Text>
                </View>
                <View style={styles.nameWrapper}>
                    <Text style={styles.nameText}>
                        {bio}
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default CardItem


const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: Colors.white,
},

contentContainer: {
    flex: 1,
},

imageWrapper: {
    paddingTop: 30,
    alignItems: "center",
},

nameWrapper: {
    paddingTop: 15,
    alignItems: "center",
    paddingBottom: 15,
},

nameText: {
    fontSize: 40,
},

profilePic: {
    width: 300,
    height: 300,
    borderRadius: 200, // makes image circular
    alignSelf: 'center',
},



});