import React, { useState } from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import CardItem from './CardItem';
import Card from './Card';
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";

const {
  event,
  Value,
  interpolateNode,
  concat,
  Extrapolate,
  cond,
  eq,
  set,
  clockRunning,
  startClock,
  stopClock,
  spring,
  Clock,
  greaterThan,
  lessThan,
  and,
  neq,
  call,
} = Animated;
const { width, height } = Dimensions.get("window");

// calculate the width of the card when it's rotated 15 degrees
const rotatedWidth = width * Math.sin(75 * Math.PI/180) + height * Math.sin(15 * Math.PI / 180);


const runSpring = (clock, value, velocity, dest) => {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 15,
    mass: 1,
    stiffness: 120,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  };

	return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
} // runSpring()





export default class Profiles extends React.Component<ProfilesProps, ProfilesState> {

  constructor(props: ProfilesProps) {
    super(props);
		const { profiles } = props;
		this.state = { profiles };
    this.translationX = new Value(0);
    this.translationY = new Value(0);
    this.velocityX = new Value(0);
    this.gestureState = new Value(State.UNDETERMINED);

    this.onGestureEvent = event([{
      nativeEvent: {
        translationX: this.translationX,
        translationY: this.translationY,
        velocityX: this.velocityX,
        state: this.gestureState,
      }
    }], { useNativeDriver: true });

    this.init();
  }



  init() {
    const { gestureState, translationX, translationY, velocityX } = this;
    const clockX = new Clock();
    const clockY = new Clock();

    this.translationX.setValue(0);
    this.translationY.setValue(0);
    this.velocityX.setValue(0);
    this.gestureState.setValue(State.UNDETERMINED);

    const snapPoint = cond(and(lessThan(translationX, 0), lessThan(velocityX, -15)),
      -rotatedWidth,
      cond(
        and(greaterThan(translationX, 0), greaterThan(velocityX, 15)),
        rotatedWidth,
        0,
      )
    );

    this.translateX = cond(eq(gestureState, State.END), [
      set(translationX, runSpring(clockX, translationX, velocityX, snapPoint)),
        cond(
          and(
            eq(clockRunning(clockX), 0),
            neq(translationX, 0),
          ),
          call([translationX], this.onSwiped),
        ),
      translationX
    ],
      translationX 
    )

    this.translateY = cond(eq(gestureState, State.END), [
      set(translationY, runSpring(clockY, translationY, 0, 0)),
      translationY
    ],
      translationY 
    )

  } // init()



	
  // Function that is called when the user swipes
  onSwiped = ([translateX]) => {
    const isLiked = translateX > 0;
    if (isLiked) {
      console.log("Profile Liked!");
    }
    else {
      console.log("Profile Disliked!");
    }

    // remove profile from the state
    const { profiles: [lastProfile, ...profiles] } = this.state;
    this.setState({ profiles }, this.init());

  } // onSwiped()



	render () {

    const { onGestureEvent, translateX, translateY } = this;

    // Adds rotation when translateX changes 
    const rotateZ = concat(interpolateNode(translateX, {
      inputRange: [-width / 2, width / 2],
      outputRange: [15, -15],
      extrapolate: Extrapolate.CLAMP,
    }), "deg");

    // changes the opacity based on translateX
    const likeOpacity = interpolateNode(translateX, {
      inputRange: [0, width / 4],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });

    // changes the opacity based on translateX
    const nopeOpacity = interpolateNode(translateX, {
      inputRange: [-width / 4, 0],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    const style = {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { translateX },
        { translateY },
        { rotateZ },
      ],
    };

    var noProfiles = false;
    if (this.state.profiles.length == 0) {
      noProfiles = true;
      console.log("No more profiles");
    }
    const { profiles: [lastProfile, ...profiles] } = this.state;
    console.log("lastProfile: " + lastProfile);
    console.log("profiles: " + profiles);
    

    if (noProfiles) {
      return (
        <View style={styles.container}>
          <View style={{alignSelf: 'center'}}>
            <Text style={{fontSize: 25}}>No More Profiles</Text>
          </View>
        </View>
      );
    }

		return (
			<View style={styles.container}>

        {/* Cards Stack */}
        <View style={styles.contentContainer}>
          <View style={styles.cards}>
          {
            profiles.reverse().map((profile) => (
              <Card key={profile} id={profile}></Card>
            ))
          }
          </View>
        </View>


				{/* Swipable Card */}
				<View id='card' style={styles.contentContainer}>
          <PanGestureHandler
            onHandlerStateChange={onGestureEvent}
            onGestureEvent={onGestureEvent}
          >
            <Animated.View {...{style}}>
                <Card id={lastProfile} {...{likeOpacity, nopeOpacity}}></Card>
            </Animated.View>
          </PanGestureHandler>
        </View>

			</View>
		);
	} // render()

} // class Profiles






// styles
const styles = StyleSheet.create({

  /* Container styles */
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.lightGray,
  },

  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    marginHorizontal: '3%',
    marginTop: '2%',
    marginBottom: '1%',
  },

  footer: {
    flex: .10,
    justifyContent: 'space-evenly',
		flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },


  /* Cards */
  cards: {
    flex: 1,
    zIndex: 100,
  },

});
