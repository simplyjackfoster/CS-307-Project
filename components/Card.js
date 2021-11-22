import React, { Component } from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    ScrollView,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import Animated from 'react-native-reanimated';

import { getDataFromPath, getInstagramLink, getInterests } from "../database/readData";
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";
import { reportUser } from '../database/writeData';
import { render } from 'react-dom';
import { CardItem } from './CardItem';


export default class Card extends Component {

	static defaultProps = {
		likeOpacity: 0,
		nopeOpacity: 0,
	}


	render() {
		const { profile, likeOpacity, nopeOpacity } = this.props;
        console.log("Loading card");
        return (
            <View style={styles.container}>
                {/* The Card */}
                <CardItem profile={profile} style={styles.cardWrapper}></CardItem>

                {/* Like and Nope Text */}
                <View style={styles.swipeTextWrapper}>
                    <Animated.View style={[styles.likeWrapper, {opacity: likeOpacity}]}>
                        <Text style={styles.likeText}>LIKE</Text>
                    </Animated.View>
                    <Animated.View style={[styles.nopeWrapper, {opacity: nopeOpacity}]}>
                        <Text style={styles.nopeText}>NOPE</Text>
                    </Animated.View>
                </View>
            </View>
        );
	} // render()

} // export default






// styles
const styles = StyleSheet.create({

    /* Container styles */
    container: {
        ...StyleSheet.absoluteFillObject,
    },


    /* Like and Nope wrapper */
    swipeTextWrapper: {
		position: 'absolute',
		marginTop: 35,
        flexDirection: 'row',
        alignSelf: 'center',
    },


    /* Like */
    likeWrapper: {
        borderWidth: 4,
        padding: 8,
        borderColor: Colors.green,
        borderRadius: 10,
        marginRight: 35,
    },

    likeText: {
        fontSize: 40,
        fontWeight: '800',
        color: Colors.green,
    },


    /* Nope */
    nopeWrapper: {
        borderWidth: 4,
        padding: 8,
        borderColor: Colors.red,
        borderRadius: 10,
        marginLeft: 35,
    },

    nopeText: {
        fontSize: 40,
        fontWeight: '800',
        color: Colors.red,
    },


});