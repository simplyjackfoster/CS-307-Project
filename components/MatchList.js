import React, { Component, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from 'react-native';
import MatchItem from './MatchItem';
import Colors from '../constants/Colors';
import CardItem from './CardItem';


export default class MatchList extends React.Component {

	constructor(props) {
		super(props);
		const { profiles, navigation } = props;
		this.state = { profiles, navigation, viewProfile: null};
	}



	/*
	 * Update the profiles list
	 */
	updateProfiles = (newProfiles) => {
		this.setState({ profiles: newProfiles });
	} // updateProfiles()



	showProfile = (profile) => {
		this.setState({ viewProfile: profile })
	}



	render() {
		const { profiles: [...profiles] } = this.state;

		if (this.state.viewProfile) {
			return (
				<View style={styles.viewProfileContainer}>

					{/* Match Text */}
					<View style={styles.matchesContainer}>
						<Text style={styles.matchesText}>MATCH</Text>
					</View>

					{/* Card */}	
					<View style={styles.contentContainer}>
						<View style={styles.cards}>
							<CardItem profile={this.state.viewProfile} viewingMatch={true}
												updateProfiles={this.updateProfiles}
												matches={profiles} showProfile={this.showProfile}></CardItem>
						</View>
					</View>

					{/* View Matches Button */}
					<View style={styles.footer}>
						<TouchableOpacity
							style={styles.viewMatchesButton}
							onPress={() =>
								this.setState({ viewProfile: null })
							}
						>
								<Text style={styles.viewMatchesText}>View Matches</Text>
						</TouchableOpacity>
					</View>
					
				</View>
			);
		}


		// if there are no matches
		if (profiles.length == 0) {
			return (
					<View style={styles.splashContainer}>
						<Text style={styles.splashText}>You Have No Matches</Text>
					</View>
			);
		}


		return (
			<ScrollView style={styles.container}>
				<View> 
					{
						profiles.reverse().map((profile) => (
							<MatchItem key={profile.id} profile={profile} viewProfile={this.viewProfile}
												profiles={profiles} updateProfiles={this.updateProfiles}
												showProfile={this.showProfile}></MatchItem>
						))
					}
				</View>
			</ScrollView>
		);

	} // render()

} // class()







// styles
const styles = StyleSheet.create({

	// Container for viewing matches
	container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 100,
  },


	// Containers for viewing profile
	viewProfileContainer: {
		flex: 1,
		...StyleSheet.absoluteFillObject,
		backgroundColor: Colors.lightGray,
	},

	contentContainer: {
		flex: 1,
    marginHorizontal: '6%',
    marginTop: '4%',
    marginBottom: '2%',
  },

  cards: {
    flex: 1,
    zIndex: 100,
  },

	// MATCHES Text
	matchesContainer: {
		flex: 0.10,
	},

	matchesText: {
		fontSize: 40,
		color: Colors.green,
		fontWeight: '700',
		textShadowColor: Colors.black,
		textShadowOffset: {width: 0.25, height: 0.25},
		textShadowRadius: 1,
		alignSelf: 'center',
		marginTop: "2%",
	},


	// View Matches Footer
	footer: {
    flex: .15,
    justifyContent: 'space-evenly',
		flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

	viewMatchesButton: {
		backgroundColor: Colors.offWhite,
		borderRadius: 25,
		padding: 10,
		width: 190,
		alignItems: 'center',
	},

	viewMatchesText: {
		fontSize: 25,
	},

  /* Splash Screen */
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  splashText: {
    alignSelf: 'center',
    fontSize: 25,
  },

});