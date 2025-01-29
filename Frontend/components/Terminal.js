import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Easing, useWindowDimensions } from 'react-native';

const useBreathingAnimation = (duration = 4000) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [duration]);

  return anim;
};

const Terminal = React.memo(() => {
  const { width } = useWindowDimensions();
  const breatheAnim = useBreathingAnimation(4000);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Add custom CSS to override Typeform styles
    const style = document.createElement('style');
    style.textContent = `
      .tf-v1-popup, .tf-v1-box {
        background: transparent !important;
        box-shadow: none !important;
      }
      .tf-v1-box-wrapper {
        background: transparent !important;
        color: #F4E409 !important;
        box-shadow: none !important;
      }
      .tf-v1-box * {
        box-shadow: none !important;
      }
      .tf-v1-box button {
        background-color: transparent !important;
        border: 1px solid #F4E409 !important;
        color: #F4E409 !important;
      }
      .tf-v1-box input, .tf-v1-box textarea {
        background-color: rgba(244, 228, 9, 0.05) !important;
        border: 1px solid rgba(244, 228, 9, 0.2) !important;
        color: #F4E409 !important;
      }
      .tf-v1-box input:focus, .tf-v1-box textarea:focus {
        border-color: rgba(244, 228, 9, 0.5) !important;
        box-shadow: none !important;
      }
      .tf-v1-box-step {
        font-family: 'Orbitron_400Regular', monospace !important;
      }
      .tf-v1-box .tf-v1-box-button {
        opacity: 0.8;
        transition: opacity 0.3s ease;
      }
      .tf-v1-box .tf-v1-box-button:hover {
        opacity: 1;
      }
      .tf-v1-box-powered-by {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  const handleInputChange = useCallback((text) => {
    setInputValue(text);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e.key !== 'Enter' || !inputValue.trim()) return;
    
    // Clear input after submission
    setInputValue('');
  }, [inputValue]);

  const terminalScale = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.02],
  });

  const dynamicStyles = useMemo(() => ({
    terminalWindow: {
      marginBottom: width <= 768 ? 20 : 30,
    },
    terminalBody: {
      padding: width <= 480 ? 15 : 20,
      minHeight: width <= 480 ? 250 : 300,
    }
  }), [width]);

  return (
    <Animated.View style={[
      styles.terminalWindow,
      dynamicStyles.terminalWindow,
      {
        transform: [{ scale: terminalScale }]
      }
    ]}>
      <View style={styles.terminalHeader}>
        <Text style={styles.terminalTitle}>EVE Terminal</Text>
        <View style={styles.terminalControls}>
          <View style={[styles.terminalDot, { backgroundColor: '#FF605C' }]} />
          <View style={[styles.terminalDot, { backgroundColor: '#FFBD44' }]} />
          <View style={[styles.terminalDot, { backgroundColor: '#00CA4E' }]} />
        </View>
      </View>

      <View style={[styles.terminalBody, dynamicStyles.terminalBody]}>
        <View style={styles.typeformContainer}>
          <div 
            data-tf-live="01JJ6EBFRPT4WE9Q9VV4SRFK92"
            data-tf-opacity="100"
            data-tf-iframe-props="title=EVE Terminal"
            data-tf-transitive-search-params
            data-tf-medium="snippet"
            data-tf-custom-style="background-color: transparent; font-family: monospace;"
            data-tf-hide-headers
            data-tf-hide-footer
            style={{
              width: '100%',
              height: '360px',
              backgroundColor: 'transparent',
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  terminalWindow: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: '#000000',
    borderRadius: 10,
    border: '1px solid #F4E409',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    isolation: 'isolate',
    backfaceVisibility: 'hidden',
    transform: 'translate3d(0,0,0)',
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
    marginBottom: 30,
    zIndex: 9999,
  },
  terminalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#F4E409',
  },
  terminalTitle: {
    color: '#F4E409',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
  },
  terminalControls: {
    flexDirection: 'row',
    gap: 8,
  },
  terminalDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  terminalBody: {
    padding: 20,
    minHeight: 360,
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
  },
  typeformContainer: {
    flex: 1,
    width: '100%',
    height: '360px',
    backgroundColor: 'transparent',
    border: 'none',
  }
});

export default Terminal; 