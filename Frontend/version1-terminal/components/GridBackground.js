import React, { useEffect, useRef } from 'react';
import Svg, { Line, Defs, Pattern, Rect } from 'react-native-svg';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const GridBackground = () => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  const translateX1 = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;
  const translateX3 = useRef(new Animated.Value(0)).current;
  const translateY1 = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(0)).current;
  const translateY3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Breathing effect - faster
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 1000,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        })
      ])
    ).start();

    // Infinite movement animations
    const startInfiniteMovement = (anim, duration) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    // Start multiple movements at different speeds - much faster now
    startInfiniteMovement(translateX1, 6000);   // Was 10000
    startInfiniteMovement(translateX2, 8000);   // Was 13000
    startInfiniteMovement(translateX3, 10000);  // Was 17000
    startInfiniteMovement(translateY1, 7000);   // Was 12000
    startInfiniteMovement(translateY2, 9000);   // Was 15000
    startInfiniteMovement(translateY3, 11000);  // Was 19000
  }, []);

  // Create interpolations for smooth infinite movement
  const getTranslation = (anim, distance) => {
    return anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, distance],
      extrapolate: 'modulo'
    });
  };

  return (
    <View style={styles.container}>
      {/* Fine diamond grid layer */}
      <Animated.View 
        style={[
          styles.overlay, 
          { 
            opacity: fadeAnim,
            transform: [
              { translateX: getTranslation(translateX1, 30) },
              { translateY: getTranslation(translateY1, 30) }
            ]
          }
        ]}
      >
        <Svg height="300%" width="300%" style={styles.grid}>
          <Defs>
            <Pattern 
              id="smallGrid" 
              width="14" 
              height="14" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <Line
                x1="0"
                y1="14"
                x2="14"
                y2="14"
                stroke="#F4E409"
                strokeWidth="0.5"
                opacity="0.4"
              />
              <Line
                x1="14"
                y1="0"
                x2="14"
                y2="14"
                stroke="#F4E409"
                strokeWidth="0.5"
                opacity="0.4"
              />
            </Pattern>
          </Defs>
          <Rect width="300%" height="300%" fill="url(#smallGrid)" x="-100%" y="-100%" />
        </Svg>
      </Animated.View>

      {/* Medium diamond grid layer */}
      <Animated.View 
        style={[
          styles.overlay, 
          { 
            opacity: fadeAnim,
            transform: [
              { translateX: getTranslation(translateX2, -40) },
              { translateY: getTranslation(translateY2, -40) }
            ]
          }
        ]}
      >
        <Svg height="300%" width="300%" style={styles.grid}>
          <Defs>
            <Pattern 
              id="mediumGrid" 
              width="20" 
              height="20" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <Line
                x1="0"
                y1="20"
                x2="20"
                y2="20"
                stroke="#F4E409"
                strokeWidth="0.3"
                opacity="0.3"
              />
              <Line
                x1="20"
                y1="0"
                x2="20"
                y2="20"
                stroke="#F4E409"
                strokeWidth="0.3"
                opacity="0.3"
              />
            </Pattern>
          </Defs>
          <Rect width="300%" height="300%" fill="url(#mediumGrid)" x="-100%" y="-100%" />
        </Svg>
      </Animated.View>

      {/* Large diamond grid layer */}
      <Animated.View 
        style={[
          styles.overlay, 
          { 
            opacity: fadeAnim,
            transform: [
              { translateX: getTranslation(translateX3, 50) },
              { translateY: getTranslation(translateY3, 50) }
            ]
          }
        ]}
      >
        <Svg height="300%" width="300%" style={styles.grid}>
          <Defs>
            <Pattern 
              id="largeGrid" 
              width="28" 
              height="28" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <Line
                x1="0"
                y1="28"
                x2="28"
                y2="28"
                stroke="#F4E409"
                strokeWidth="0.2"
                opacity="0.2"
              />
              <Line
                x1="28"
                y1="0"
                x2="28"
                y2="28"
                stroke="#F4E409"
                strokeWidth="0.2"
                opacity="0.2"
              />
            </Pattern>
          </Defs>
          <Rect width="300%" height="300%" fill="url(#largeGrid)" x="-100%" y="-100%" />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default GridBackground; 