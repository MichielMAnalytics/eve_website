import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FollowSection = () => {
  const { width } = useWindowDimensions();
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getResponsiveStyles = () => {
    if (width <= 480) {
      return {
        container: { padding: 20 },
        title: { fontSize: 24 },
        subtitle: { fontSize: 32 },
      };
    } else if (width <= 768) {
      return {
        container: { padding: 30 },
        title: { fontSize: 28 },
        subtitle: { fontSize: 38 },
      };
    }
    return {
      container: { padding: 40 },
      title: { fontSize: 32 },
      subtitle: { fontSize: 44 },
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <View style={[styles.container, responsiveStyles.container]}>
      <LinearGradient
        colors={['rgba(244, 228, 9, 0.1)', 'rgba(244, 228, 9, 0)', 'rgba(244, 228, 9, 0.05)']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: responsiveStyles.title.fontSize }]}>
          Follow us
        </Text>
        <Text style={[styles.subtitle, { fontSize: responsiveStyles.subtitle.fontSize }]}>
          Stay up to speed
        </Text>
        <View style={styles.typeformContainer}>
          <div 
            data-tf-live="01JJ77X0E492EWC4D4EP0WTHND"
            style={{
              width: '100%',
              height: '200px',
              border: '1px solid rgba(244, 228, 9, 0.2)',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    position: 'relative',
    marginVertical: 40,
    paddingVertical: 20,
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  }, 
  content: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  title: {
    color: '#666',
    fontFamily: 'Orbitron_400Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 6,
    marginBottom: 2,
    opacity: 0.7,
  },
  subtitle: {
    color: '#F4E409',
    fontFamily: 'Orbitron_700Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 8,
    marginBottom: 30,
    textShadow: '0 0 30px rgba(244, 228, 9, 0.2)',
  },
  typeformContainer: {
    width: '100%',
    maxWidth: 600,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  paragraph: {
    color: '#F4E409',
    fontFamily: 'Orbitron_400Regular',
    opacity: 0.7,
    letterSpacing: 1,
    maxWidth: '800px',
    position: 'relative',
    zIndex: 1,
  },
});

export default FollowSection; 