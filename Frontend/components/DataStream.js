import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, StyleSheet, Easing, Platform } from 'react-native';

const DataStream = React.memo(() => {
  const streamAnim = useRef(new Animated.Value(0)).current;

  // Memoize animation configuration
  const animation = useMemo(() => 
    Animated.loop(
      Animated.sequence([
        Animated.timing(streamAnim, {
          toValue: 1,
          duration: 15000,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== 'web', // Enable native driver where possible
        }),
        Animated.timing(streamAnim, {
          toValue: 0,
          duration: 0,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== 'web',
        })
      ])
    ), []);

  useEffect(() => {
    animation.start();
    return () => animation.stop();
  }, [animation]);

  // Memoize transform style
  const animatedStyle = useMemo(() => ({
    transform: [{
      translateY: streamAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 1000]
      })
    }]
  }), [streamAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.stream, animatedStyle]} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  stream: {
    position: 'absolute',
    width: '100%',
    height: 300,
    backgroundImage: 'linear-gradient(0deg, transparent, rgba(244, 228, 9, 0.05), transparent)',
  },
});

export default DataStream; 