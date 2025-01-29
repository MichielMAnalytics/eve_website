import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const TriggeredEffect = ({ isTriggered, onComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isTriggered) {
      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(1);

      // Run animation sequence
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1.2,
            tension: 100,
            friction: 5,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 5,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        if (onComplete) onComplete();
      });
    }
  }, [isTriggered, fadeAnim, scaleAnim, onComplete]);

  if (!isTriggered) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.effect,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    pointerEvents: 'none',
  },
  effect: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F4E409',
    opacity: 0.1,
  },
});

export default TriggeredEffect; 