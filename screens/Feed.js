import React from 'react';
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

import CardItem from '../components/CardItem';
import Card from '../components/Card';
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";



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





export default class Feed extends Component {

  constructor() {
    super();
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
  } // onSwiped()





  render() { 
    const uid = "mfinder";

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


    

    return (
      <View style={styles.container}>

        {/* Card */}
        <View id='card' style={styles.contentContainer}>
          <PanGestureHandler
            onHandlerStateChange={onGestureEvent}
            onGestureEvent={onGestureEvent}
          >
            <Animated.View {...{style}}>
                {/*<CardItem id={uid}/>*/}
                <Card id={uid} {...{likeOpacity, nopeOpacity}}></Card>
            </Animated.View>
          </PanGestureHandler>
        </View>


        {/* Like, Refresh, and Dislike Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.dislikeWrapper} onPress={() => {
            console.log("Dislike pressed");
          }}>
            {renderIcon("times", 50, Colors.red)}
          </TouchableOpacity>

          <TouchableOpacity style={styles.refreshWrapper} onPress={() => {
            console.log("Refresh pressed");
            refreshScreen();
          }}>
            {renderIcon("refresh", 50, Colors.yellow)}
          </TouchableOpacity>

          <TouchableOpacity style={styles.likeWrapper} onPress={() => {
            console.log("Like pressed");
          }}>
            {renderIcon("check", 50, Colors.green)}
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}




// styles
const styles = StyleSheet.create({

  /* Container styles */
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },

  contentContainer: {
    flex: 1,
    marginHorizontal: '3%',
    marginTop: '3%',
    marginBottom: '3%',
  },

  footer: {
    flex: .10,
    justifyContent: 'space-evenly',
		flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },


  /* Dislike Button */
  dislikeWrapper: {
    // marginLeft: 25,
    // marginRight: 25,
  },
  
  /* Refresh Button */
  refreshWrapper: {
    // marginLeft: 20,
    // marginRight: 20,
    alignContent: 'center',
  },

  /* Like Button */
  likeWrapper: {
    // marginLeft: 25,
    // marginRight: 25,
  },


});