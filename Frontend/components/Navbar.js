import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { Link } from 'react-router-dom';
import { useFonts, Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import { LinearGradient } from 'expo-linear-gradient';

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(width < 768);
    };
    
    handleResize(); // Initial check
  }, [width]);

  if (!fontsLoaded) {
    return null;
  }

  const dynamicStyles = {
    navbar: {
      padding: width <= 768 ? 15 : 20,
      height: width <= 768 ? 70 : 80,
    },
    logo: {
      fontSize: width <= 768 ? 28 : 36,
    },
    logoVersion: {
      fontSize: width <= 768 ? 14 : 16,
    },
    navRight: {
      gap: width <= 768 ? 10 : 20,
    },
    docsButton: {
      paddingHorizontal: width <= 768 ? 16 : 24,
      paddingVertical: width <= 768 ? 8 : 10,
    },
    docsButtonText: {
      fontSize: width <= 768 ? 12 : 14,
    },
    connectButton: {
      paddingHorizontal: width <= 768 ? 16 : 20,
      paddingVertical: width <= 768 ? 8 : 10,
    },
    connectButtonText: {
      fontSize: width <= 768 ? 12 : 14,
    },
  };

  const ComingSoonTag = () => (
    <View style={styles.comingSoonContainer}>
      <LinearGradient
        colors={['rgba(244, 228, 9, 0.2)', 'rgba(244, 228, 9, 0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.comingSoonGradient}
      />
      <Text style={styles.comingSoonText}>Soon</Text>
    </View>
  );

  return (
    <View style={[styles.navbar, dynamicStyles.navbar]}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logo, dynamicStyles.logo]}>
            <Text style={styles.logoE}>E</Text>
            <Text style={styles.logoVE}>VE</Text>
            <Text style={[styles.logoVersion, dynamicStyles.logoVersion]}>v1</Text>
          </Text>
          <View style={styles.logoUnderline} />
        </View>
      </Link>
      <View style={[styles.navRight, dynamicStyles.navRight]}>
        <View style={styles.buttonWrapper}>
          <View style={[styles.protocolButton, styles.disabledButton]}>
            <View style={styles.protocolButtonGlow} />
            <Text style={[styles.docsButtonText, dynamicStyles.docsButtonText, styles.disabledText]}>
              <Text style={styles.docsPrefix}>{'//'}</Text> E.V.E.
            </Text>
            <View style={styles.protocolButtonBorder} />
          </View>
          <ComingSoonTag />
        </View>

        <View style={styles.buttonWrapper}>
          <View style={[styles.docsButton, dynamicStyles.docsButton, styles.disabledButton]}>
            <View style={styles.docsButtonGlow} />
            <Text style={[styles.docsButtonText, dynamicStyles.docsButtonText, styles.disabledText]}>
              <Text style={styles.docsPrefix}>{'//'}</Text> DOCS
            </Text>
            <View style={styles.docsButtonBorder} />
          </View>
          <ComingSoonTag />
        </View>

        <View style={styles.buttonWrapper}>
          <View style={[styles.connectButton, dynamicStyles.connectButton, styles.disabledButton]}>
            <Text style={[styles.connectButtonText, dynamicStyles.connectButtonText, styles.disabledText]}>
              CONNECT
            </Text>
          </View>
          <ComingSoonTag />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244, 228, 9, 0.1)',
  },
  logoContainer: {
    position: 'relative',
    paddingHorizontal: 8,
  },
  logo: {
    fontSize: 36,
    fontFamily: 'Orbitron_700Bold',
    letterSpacing: 1,
  },
  logoE: {
    color: '#F4E409',
    textShadow: '0 0 20px rgba(244, 228, 9, 0.8)',
  },
  logoVE: {
    color: '#F4E409',
    opacity: 0.7,
  },
  logoVersion: {
    color: '#F4E409',
    fontSize: 16,
    opacity: 0.4,
    marginLeft: 4,
    fontFamily: 'Orbitron_400Regular',
  },
  logoUnderline: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#F4E409',
    opacity: 0.3,
    transform: [{ scaleX: 0.8 }],
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#F4E409',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 16,
  },
  docsButton: {
    position: 'relative',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'rgba(244, 228, 9, 0.05)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  docsButtonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F4E409',
    opacity: 0.1,
    filter: 'blur(8px)',
    transform: [{ scale: 0.85 }],
  },
  docsButtonText: {
    color: '#F4E409',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
    letterSpacing: 2,
    position: 'relative',
    zIndex: 2,
  },
  docsPrefix: {
    color: '#F4E409',
    opacity: 0.5,
    marginRight: 4,
  },
  docsButtonBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#F4E409',
    opacity: 0.3,
    zIndex: 1,
  },
  connectButton: {
    borderWidth: 1,
    borderColor: '#F4E409',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(244, 228, 9, 0.1)',
  },
  connectButtonText: {
    color: '#F4E409',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 40,
  },
  protocolButton: {
    position: 'relative',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'rgba(244, 228, 9, 0.05)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  protocolButtonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F4E409',
    opacity: 0.1,
    filter: 'blur(8px)',
    transform: [{ scale: 0.85 }],
  },
  protocolButtonText: {
    color: '#F4E409',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
    letterSpacing: 2,
    position: 'relative',
    zIndex: 2,
  },
  protocolButtonBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#F4E409',
    opacity: 0.3,
    zIndex: 1,
  },
  buttonWrapper: {
    position: 'relative',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  disabledText: {
    opacity: 0.7,
  },
  comingSoonContainer: {
    position: 'absolute',
    top: -6,
    right: -6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(244, 228, 9, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  comingSoonGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  comingSoonText: {
    color: '#F4E409',
    fontSize: 8,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 0.5,
    textShadow: '0 0 8px rgba(244, 228, 9, 0.5)',
  },
});

export default Navbar; 