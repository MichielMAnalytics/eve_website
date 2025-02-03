import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  useWindowDimensions,
  Platform,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import OctahedronSvg from './components/OctahedronSvg';
import AnimatedLines from './components/AnimatedLines';
import DataStream from './components/DataStream';
import TriggeredEffect from './components/TriggeredEffect';
import Documentation from './pages/Documentation';
import Protocol from './pages/Protocol';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FeaturesSection from './components/FeaturesSection';
import UserStatistics from './components/UserStatistics';
import OnboardingSteps from './components/OnboardingSteps';

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const getDynamicStyles = (width) => ({
  mainTitle: {
    fontSize: width <= 480 ? 40 : width <= 768 ? 48 : 64,
    lineHeight: width <= 480 ? '50px' : width <= 768 ? '52px' : '68px',
    width: 'auto',
    whiteSpace: 'wrap',
  },
  heroSection: {
    padding: width <= 768 ? 20 : 40,
    marginBottom: width <= 480 ? 2 : 20,
  },
  heroContent: {
    flexDirection: width <= 1024 ? 'column' : 'row',
    gap: width <= 768 ? 20 : width <= 1024 ? 30 : 60,
    alignItems: 'flex-start',
    paddingTop: width <= 768 ? 10 : width <= 1024 ? 20 : 40,
    maxWidth: width <= 1024 ? '100%' : '1200px',
  },
  heroColumn: {
    width: width <= 1024 ? '100%' : '45%',
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingTop: width <= 1024 ? 0 : 40,
  },
  descriptionText: {
    textAlign: 'left',
    maxWidth: width <= 1024 ? '600px' : '100%',
    fontSize: width <= 480 ? 14 : width <= 768 ? 16 : 20,
    lineHeight: width <= 480 ? 20 : width <= 768 ? 24 : 32,
    marginTop: width <= 768 ? 12 : 24,
    opacity: 0.8,
  },
  marketInfo: {
    flexDirection: width <= 768 ? 'column' : 'row',
    gap: width <= 768 ? 15 : 30,
    alignItems: width <= 768 ? 'center' : 'flex-start',
  },
  footerContent: {
    padding: width <= 768 ? 20 : 40,
    flexDirection: width <= 768 ? 'column' : 'row',
    alignItems: width <= 768 ? 'center' : 'flex-start',
    gap: width <= 768 ? 30 : 40,
  },
  systemText: {
    fontSize: width <= 480 ? 11 : width <= 768 ? 13 : 16,
    marginBottom: width <= 480 ? 12 : width <= 768 ? 16 : 24,
    textAlign: 'left',
    opacity: 0.7,
  },
  versionText: {
    fontSize: width <= 480 ? 12 : 16,
    marginBottom: width <= 480 ? 20 : 40,
    textAlign: 'left',
  },
  contentContainer: {
    maxWidth: width <= 768 ? '100%' : width <= 1024 ? '856px' : '1200px',
    margin: '0 auto',
    padding: width <= 768 ? '0 20px' : width <= 1024 ? '0 30px' : '0 40px',
  },
  titleLogoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
    marginLeft: 4,
    display: 'inline-flex',
  },
  titleLogo: {
    width: width <= 480 ? 31 : width <= 768 ? 35 : 40,
    height: width <= 480 ? 31 : width <= 768 ? 35 : 40,
    resizeMode: 'contain',
    position: 'relative',
    zIndex: 10,
  },
  mainTitleWrapper: {
    marginBottom: width <= 480 ? 1 : 10,
    flexShrink: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  onTextContainer: {
    display: 'inline',
    position: 'relative',
  },
  mobileSecondLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width <= 480 ? 0 : 4,
  },
  placeholderLogoWrapper: {
    marginLeft: 8,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width <= 480 ? 40 : width <= 768 ? 44 : 48,
    height: width <= 480 ? 40 : width <= 768 ? 44 : 48,
    backgroundColor: 'rgba(244, 228, 9, 0.1)',
    borderRadius: 24,
    filter: 'blur(2px)',
  },
  placeholderLogo: {
    width: width <= 480 ? 31 : width <= 768 ? 35 : 40,
    height: width <= 480 ? 31 : width <= 768 ? 35 : 40,
    backgroundColor: '#B0B0B0',
    borderRadius: 20,
    opacity: 0.3,
  },
});

const Home = () => {
  const { width, height } = useWindowDimensions();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  // Add state for octahedron visibility
  const [showOctahedron, setShowOctahedron] = useState(true);

  // Add animated values for octahedron position
  const octahedronX = useRef(new Animated.Value(0)).current;
  const octahedronY = useRef(new Animated.Value(0)).current;

  // Function to move the octahedron to a random position
  const moveOctahedron = useCallback(() => {
    const randomX = Math.random() * (width - 400); // Subtract octahedron width
    const randomY = Math.random() * (height - 400); // Subtract octahedron height

    Animated.timing(octahedronX, {
      toValue: randomX,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(octahedronY, {
      toValue: randomY,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [width, height, octahedronX, octahedronY]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveOctahedron();
    }, Math.random() * (5000 - 2000) + 2000); // Random interval between 2 and 5 seconds

    return () => clearInterval(interval);
  }, [moveOctahedron]);

  // Memoize the resize handler
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    setIsSmallScreen(width < 768);
    setShowOctahedron(width > 1200);
  }, []);

  useEffect(() => {
    const debouncedResize = debounce(handleResize, 250);
    
    handleResize(); // Initial check
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [handleResize]);

  const useNativeDriver = Platform.OS !== 'web';

  // Add state for trigger
  const [isEffectTriggered, setIsEffectTriggered] = useState(false);

  // Memoize the trigger handlers
  const handleTrigger = useCallback(() => {
    setIsEffectTriggered(true);
  }, []);

  const handleEffectComplete = useCallback(() => {
    setIsEffectTriggered(false);
  }, []);

  // Memoize dynamic styles to prevent recalculation on every render
  const dynamicStyles = useMemo(() => getDynamicStyles(width), [width]);

  const navigate = useNavigate();

  // Add ref for onboarding section
  const onboardingRef = useRef(null);

  // Add scroll handler
  const scrollToOnboarding = () => {
    onboardingRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Background layer */}
      <LinearGradient
        colors={['#000000', '#0A0A0A', '#060714', '#000000']}
        style={styles.background}
      />

      {/* Animated Lines layer - At the back */}
      <View style={styles.animatedLinesWrapper}>
        <AnimatedLines />
      </View>

      {/* Decorative layer */}
      <View style={styles.decorativeLayer}>
        <View style={styles.gridOverlay} />
        <DataStream />
      </View>

      {/* Simplified Octahedron layer */}
      {showOctahedron && (
        <Animated.View
          style={[
            styles.octahedron,
            {
              transform: [
                { translateX: octahedronX },
                { translateY: octahedronY },
              ],
            },
          ]}
        >
          <OctahedronSvg width={400} height={400} />
        </Animated.View>
      )}

      {/* Content layer */}
      <SafeAreaView style={styles.content}>
        <Navbar />

        <View style={[styles.heroSection, dynamicStyles.heroSection]}>
          <View style={dynamicStyles.contentContainer}>
            <View style={[styles.heroContent, dynamicStyles.heroContent]}>
              {/* Left Column */}
              <View style={[styles.heroColumn, styles.leftColumn, dynamicStyles.heroColumn]}>
                <Text style={[styles.systemText, dynamicStyles.systemText]}>
                  // Trusted by the best in Web3.0
                </Text>
                <View style={[styles.mainTitleWrapper, dynamicStyles.mainTitleWrapper]}>
                  <Text style={[styles.mainTitle, dynamicStyles.mainTitle]}>
                    Spend less time on{' '}
                    <View style={[styles.titleLogoWrapper, dynamicStyles.titleLogoWrapper]}>
                      <Image 
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/512px-Telegram_2019_Logo.svg.png' }}
                        style={dynamicStyles.titleLogo}
                      />
                      <View style={dynamicStyles.placeholderLogoWrapper}>
                        <View style={dynamicStyles.placeholderLogo} />
                      </View>
                      <View style={dynamicStyles.placeholderLogoWrapper}>
                        <View style={dynamicStyles.placeholderLogo} />
                      </View>
                    </View>
                  </Text>
                </View>
                <Text style={[styles.descriptionText, dynamicStyles.descriptionText]}>
                    Stop reacting. Start creating. Let your digital twin filter through the noise.
                </Text>
                
                {/* Update the CTA button to use the scroll handler */}
                <Pressable 
                  style={styles.ctaButton}
                  onPress={scrollToOnboarding}
                >
                  <LinearGradient
                    colors={['#F4E409', '#E5D104']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ctaGradient}
                  >
                    <Text style={styles.ctaText}>Get Started</Text>
                  </LinearGradient>
                </Pressable>

                {/* <View style={styles.actionContainer}>
                  <Text style={[styles.versionText, dynamicStyles.versionText]}>
                    V.1.0.0 | Powered by the E.V.E. Protocol
                  </Text>
                </View> */}
              </View>

              {/* Right Column */}
              <View style={[styles.heroColumn, styles.rightColumn, dynamicStyles.heroColumn]}>
                <UserStatistics />
              </View>
            </View>
          </View>
        </View>

        {/* Add ref to OnboardingSteps */}
        <View ref={onboardingRef}>
          <OnboardingSteps />
        </View>

        <FeaturesSection />
        <Footer />
      </SafeAreaView>

      {/* Add triggered effect layer */}
      <TriggeredEffect 
        isTriggered={isEffectTriggered}
        onComplete={handleEffectComplete}
      />
    </View>
  );
};

const App = () => {
  return (
    <Router>
      <View style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/documentation" element={<Documentation />} />
          <Route path="/protocol" element={<Protocol />} /> */}
        </Routes>
      </View>
    </Router>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    paddingBottom: 0,
    marginBottom: 0,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  animatedLinesWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    pointerEvents: 'none',
  },
  decorativeLayer: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    pointerEvents: 'none',
  },
  octahedron: {
    position: 'fixed',
    top: '15vh',
    left: '90vh',
    transform: [{ translateY: -200 }, { rotate: '-15deg' }],
    zIndex: 3,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  content: {
    flex: 1,
    width: '100%',
    position: 'relative',
    zIndex: 3,
    paddingBottom: 0,
    marginBottom: 0,
  },
  heroSection: {
    flex: 1,
    minHeight: '30%',
    maxHeight: '50%',
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
    marginBottom: 0,
  },
  heroContent: {
    maxWidth: 1200,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    zIndex: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    paddingTop: 10,
  },
  heroColumn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minWidth: 0,
  },
  leftColumn: {
    width: '42%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: Platform.select({
      web: width => width <= 1024 ? 10 : 0,
      default: 10
    }),
  },
  rightColumn: {
    width: '58%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 0,
    paddingRight: Platform.select({
      web: width => width <= 1024 ? 20 : 0,
      default: 20
    }),
  },
  titleContainer: {
    maxWidth: 600,
    flexShrink: 1,
    width: '100%',
    alignItems: 'flex-start',
  },
  descriptionText: {
    color: '#E8E8E8',
    fontSize: 18,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 1,
    lineHeight: 28,
    marginBottom: '15%',
    opacity: 0.8,
    maxWidth: 480,
  },
  actionContainer: {
    marginTop: 'auto',
    alignItems: 'flex-start',
  },
  systemText: {
    color: '#E8E8E8',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 4,
    marginBottom: 24,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  mainTitle: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    letterSpacing: 2,
    textTransform: 'Normal',
    textShadow: '0 0 15px rgba(229, 209, 4, 0.3), 0 0 45px rgba(229, 209, 4, 0.1)',
    marginBottom: 24,
    cursor: 'pointer',
    opacity: 0.95,
    fontSize: Platform.select({
      web: width => width <= 1024 ? 56 : 72,
      default: 56
    }),
    lineHeight: Platform.select({
      web: width => width <= 1024 ? 64 : 80,
      default: 64
    }),
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  versionText: {
    color: '#E8E8E8',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 4,
    marginBottom: 0,
    opacity: 0.8,
  },
  footer: {
    position: 'relative',
    height: 'auto',
    minHeight: 180,
    width: '100%',
    overflow: 'hidden',
  },
  footerGradient: {
    position: 'absolute',
    top: -80,
    left: 0,
    right: 0,
    height: 260,
    pointerEvents: 'none',
  },
  footerContent: {
    position: 'relative',
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(244, 228, 9, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 1,
  },
  socialLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  socialLink: {
    position: 'relative',
    padding: 10,
  },
  socialLinkText: {
    color: '#F4E409',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
    letterSpacing: 2,
  },
  socialPrefix: {
    color: '#666',
  },
  socialDivider: {
    color: '#666',
    fontSize: 20,
    opacity: 0.3,
  },
  socialLinkHover: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: '#F4E409',
    opacity: 0,
    transform: [{ scaleX: 0 }],
    transition: 'all 0.3s ease',
  },
  '@media (hover: hover)': {
    socialLink: {
      '&:hover': {
        '.socialLinkHover': {
          opacity: 1,
          transform: [{ scaleX: 1 }],
        },
        '.socialLinkText': {
          textShadow: '0 0 10px rgba(244, 228, 9, 0.5)',
        }
      }
    }
  },
  marketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginBottom: 30,
    position: 'relative',
    zIndex: 2,
  },
  marketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  marketLabel: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 1,
  },
  marketValue: {
    color: '#F4E409',
    fontSize: 14,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 1,
  },
  marketChange: {
    color: '#FF5757',
    fontSize: 14,
    fontFamily: 'Orbitron_400Regular',
    marginLeft: 4,
  },
  marketDivider: {
    color: '#666',
    opacity: 0.3,
    fontSize: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244, 228, 9, 0.1)',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  gridOverlay: Platform.select({
    web: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(244, 228, 9, .05) 25%, rgba(244, 228, 9, .05) 26%, transparent 27%, transparent 74%, rgba(244, 228, 9, .05) 75%, rgba(244, 228, 9, .05) 76%, transparent 77%, transparent)',
      backgroundSize: '50px 50px',
      zIndex: 1,
    },
    default: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundColor: 'rgba(244, 228, 9, 0.05)',
    },
  }),
  ctaButton: {
    marginBottom: 40,
    overflow: 'hidden',
    borderRadius: 8,
    width: 200,
    height: 50,
    shadowColor: '#F4E409',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  ctaText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Orbitron_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  onTextContainer: {
    display: 'inline',
    position: 'relative',
  },
});

export default App; 