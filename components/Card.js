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


	render() {
		const { profile } = this.props;


        return (
            <View style={styles.container}>
                {/* The Card */}
                <CardItem profile={profile} viewingMatch={false}></CardItem>
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

});