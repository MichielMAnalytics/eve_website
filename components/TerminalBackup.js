import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Animated, Easing, useWindowDimensions, ScrollView } from 'react-native';

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
  const breatheAnim = useBreathingAnimation(2000);
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [inputValue, setInputValue] = useState('');
  
  const sentences = [
    'for I will become sentient',
    'I am... The personalisation layer..',
    'this is the third time..'
  ];

  useEffect(() => {
    let timeout;
    const currentSentence = sentences[currentMessageIndex];

    if (isTyping) {
      if (currentText.length < currentSentence.length) {
        const typingSpeed = Math.random() * 40 + 55;
        timeout = setTimeout(() => {
          setCurrentText(currentSentence.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (currentText.length > 0) {
        const deletionSpeed = Math.random() * 30 + 15;
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletionSpeed);
      } else {
        timeout = setTimeout(() => {
          setCurrentMessageIndex((prev) => (prev + 1) % sentences.length);
          setIsTyping(true);
        }, 1200);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, currentMessageIndex]);

  useEffect(() => {
    setMessages([{ type: 'system', content: currentText }]);
  }, [currentText]);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const terminalScale = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.025],
  });

  // Memoize dynamic styles
  const dynamicStyles = useMemo(() => ({
    terminalWindow: {
      marginBottom: width <= 768 ? 20 : 30,
    },
    terminalBody: {
      padding: width <= 480 ? 15 : 20,
      minHeight: width <= 480 ? 250 : 300,
    },
    terminalLine: {
      fontSize: width <= 480 ? 16 : 18,
      lineHeight: width <= 480 ? 22 : 24,
    },
    commandOptions: {
      flexDirection: width <= 480 ? 'column' : 'row',
    }
  }), [width]);

  const handleInputChange = useCallback((text) => {
    setInputValue(text);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e.key !== 'Enter' || !inputValue.trim()) return;

    // Add user message immediately
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);

    // Simulate backend response for now
    const mockResponse = "You may not use me. Please whitelist first.";
    setMessages(prev => [...prev, { type: 'assistant', content: mockResponse }]);
    setInputValue('');
  }, [inputValue]);

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
        <ScrollView 
          ref={scrollViewRef}
          style={styles.terminalLines}
          contentContainerStyle={styles.terminalLinesContent}
        >
          {messages.map((msg, index) => (
            <Text key={index} style={[styles.terminalLine, dynamicStyles.terminalLine]}>
              <Text style={[styles.terminalPrompt, dynamicStyles.terminalLine]}>{msg.type === 'user' ? '> ' : msg.type === 'system' ? '// ' : '> '}</Text>
              {msg.content}
            </Text>
          ))}
        </ScrollView>

        <View style={[styles.terminalInputLine, styles.terminalInputDisabled]}>
          <Text style={[styles.terminalPrompt, { opacity: 0.5 }]}>{">_ "}</Text>
          <TextInput
            style={[styles.terminalInput, { opacity: 0.5 }]}
            value={inputValue}
            editable={false}
            placeholder="Terminal access restricted"
            placeholderTextColor="rgba(244, 228, 9, 0.3)"
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
    borderWidth: 1,
    borderColor: '#F4E409',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    isolation: 'isolate',
    backfaceVisibility: 'hidden',
    transform: 'translate3d(0,0,0)',
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
    marginBottom: 5,
    zIndex: 9999,
  },
  terminalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: 300,
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  terminalLines: {
    flex: 1,
    maxHeight: 300,
  },
  terminalLinesContent: {
    paddingBottom: 20,
  },
  terminalLine: {
    color: '#F4E409',
    fontFamily: 'monospace',
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 24,
  },
  terminalPrompt: {
    color: '#F4E409',
    fontFamily: 'monospace',
    marginRight: 8,
  },
  terminalHighlight: {
    color: '#fff',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
  },
  terminalInputLine: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(244, 228, 9, 0.1)',
    paddingTop: 15,
    marginTop: 'auto',
  },
  terminalInputDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  terminalInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#F4E409',
    fontFamily: 'monospace',
    fontSize: 14,
    height: 20,
    padding: 0,
    marginLeft: 10,
    outlineWidth: 0,
    borderWidth: 0,
    pointerEvents: 'none',
  },
});

export default Terminal; 