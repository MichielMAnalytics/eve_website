import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, Easing, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Filter, FeGaussianBlur, FeColorMatrix, FeTurbulence, FeDisplacementMap } from 'react-native-svg';

const OctahedronSvg = React.memo(({ width = 60, height = 60, style, onClick, ...props }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Memoize animations to prevent recreating them on every render
  const animations = useMemo(() => [
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 30000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web', // Enable native driver where possible
      })
    ),
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== 'web',
        })
      ])
    )
  ], []);

  useEffect(() => {
    animations.forEach(anim => anim.start());
    return () => animations.forEach(anim => anim.stop());
  }, [animations]);

  // Memoize interpolations
  const transformStyle = useMemo(() => ({
    width,
    height,
    transform: [
      { 
        translateY: floatAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -40]
        })
      },
      { 
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      }
    ]
  }), [width, height, floatAnim, rotateAnim]);

  const handlePress = () => {
    console.log('Octahedron clicked!');
    if (onClick) {
      onClick();
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      activeOpacity={0.8}
      style={styles.touchableArea}
    >
      <Animated.View style={[
        transformStyle,
        style
      ]}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 492 467"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          <Defs>
            {/* Cyber noise effect */}
            <Filter id="noise" x="-50%" y="-50%" width="200%" height="200%">
              <FeTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="2"
                seed="1"
              />
              <FeDisplacementMap in="SourceGraphic" scale="5" />
            </Filter>

            {/* Holographic glow */}
            <Filter id="holoGlow" x="-50%" y="-50%" width="200%" height="200%">
              <FeGaussianBlur stdDeviation="3" />
              <FeColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 15 -6"
              />
            </Filter>

            {/* Gradient for faces */}
            <LinearGradient id="holoFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#F4E409" stopOpacity="0.9" />
              <Stop offset="50%" stopColor="#F4E409" stopOpacity="0.5" />
              <Stop offset="100%" stopColor="#F4E409" stopOpacity="0.2" />
            </LinearGradient>

            {/* Edge gradient */}
            <LinearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#F4E409" stopOpacity="1" />
              <Stop offset="50%" stopColor="#F4E409" stopOpacity="0.5" />
              <Stop offset="100%" stopColor="#F4E409" stopOpacity="1" />
            </LinearGradient>
          </Defs>

          {/* Main octahedron structure with enhanced effects */}
          <g filter="url(#noise)">
            <Path
              d="M197.91 231.032L223.165 243.006L244.986 285.922L197.91 231.032Z"
              fill="url(#holoFill)"
              stroke="url(#edgeGlow)"
              strokeWidth={2}
              filter="url(#holoGlow)"
            />
            <Path
              d="M196.853 229.424L246.063 179.975L223.253 241.941L196.853 229.424Z"
              fill="url(#holoFill)"
              stroke="url(#edgeGlow)"
              strokeWidth={2}
              filter="url(#holoGlow)"
            />
            <Path
              d="M224.323 243.077L297.36 238.425L247.456 288.573L224.323 243.077Z"
              fill="url(#holoFill)"
              stroke="url(#edgeGlow)"
              strokeWidth={2}
              filter="url(#holoGlow)"
            />
            <Path
              d="M224.267 242.079L247.498 178.972L297.614 237.407L224.267 242.079Z"
              fill="url(#holoFill)"
              stroke="url(#edgeGlow)"
              strokeWidth={2}
              filter="url(#holoGlow)"
            />
          </g>

          {/* Vertical and horizontal lines */}
          <g opacity="0.6">
            <Path
              d="M247 158.5V78"
              stroke="url(#edgeGlow)"
              strokeWidth={1.5}
              strokeDasharray="8 12"
            />
            <Path
              d="M247 309V389.5"
              stroke="url(#edgeGlow)"
              strokeWidth={1.5}
              strokeDasharray="8 12"
            />
            <Path
              d="M176.5 230H96"
              stroke="url(#edgeGlow)"
              strokeWidth={1.5}
              strokeDasharray="8 12"
            />
            <Path
              d="M319 238H399.5"
              stroke="url(#edgeGlow)"
              strokeWidth={1.5}
              strokeDasharray="8 12"
            />
          </g>
        </Svg>
      </Animated.View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  touchableArea: {
    cursor: 'pointer',
    zIndex: 999,
  }
});

export default OctahedronSvg; 