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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import OctahedronSvg from './components/OctahedronSvg';
import AnimatedLines from './components/AnimatedLines';
import DataStream from './components/DataStream';
import TriggeredEffect from './components/TriggeredEffect';
import Terminal from './components/TerminalBackup';
import Documentation from './pages/Documentation';
import Protocol from './pages/Protocol';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FeaturesSection from './components/FeaturesSection';

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
    fontSize: width <= 480 ? 28 : width <= 768 ? 36 : width <= 1024 ? 48 : 64,
    lineHeight: width <= 480 ? '32px' : width <= 768 ? '40px' : width <= 1024 ? '52px' : '68px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  heroSection: {
    padding: width <= 768 ? 20 : 40,
  },
  marketInfo: {
    flexDirection: width <= 768 ? 'column' : 'row',
    gap: width <= 768 ? 15 : 30,
  },
  footerContent: {
    padding: width <= 768 ? 20 : 40,
  },
  systemText: {
    fontSize: width <= 480 ? 12 : 16,
    marginBottom: width <= 480 ? 10 : 15,
  },
  versionText: {
    fontSize: width <= 480 ? 12 : 16,
    marginBottom: width <= 480 ? 20 : 40,
  }
});

const Home = () => {
  const { width } = useWindowDimensions();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  // Add state for octahedron visibility
  const [showOctahedron, setShowOctahedron] = useState(true);

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
        <View style={styles.octahedron}>
          <OctahedronSvg width={700} height={700} />
        </View>
      )}

      {/* Content layer */}
      <SafeAreaView style={styles.content}>
        <Navbar />

        <View style={[styles.heroSection, dynamicStyles.heroSection]}>
          <View style={styles.heroContent}>
            <Text style={[styles.systemText, dynamicStyles.systemText]}>
              SYSTEM://INITIALIZED
            </Text>
            <Text style={[styles.mainTitle, dynamicStyles.mainTitle]}>
              AUTONOMOUS
            </Text>
            <Text style={[styles.mainTitle, dynamicStyles.mainTitle]}>
              INTELLIGENCE
            </Text>
            <Text style={[styles.versionText, dynamicStyles.versionText]}>
              V.1.0.0 | Powered by the E.V.E. Protocol
            </Text>
            <View style={styles.terminalContainer}>
              <Terminal />
            </View>
          </View>
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
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/protocol" element={<Protocol />} />
        </Routes>
      </View>
    </Router>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    minHeight: Platform.OS === 'web' ? '100vh' : '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
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
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
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
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    pointerEvents: 'none',
  },
  octahedron: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: '35%',
    right: '5%',
    transform: Platform.OS === 'web' 
      ? [{ translateY: -250 }, { rotate: '15deg' }]
      : [{ translateY: -125 }, { rotate: '15deg' }],
    zIndex: 3,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    minHeight: Platform.OS === 'web' ? '100vh' : '100%',
    position: 'relative',
    zIndex: 4,
    display: Platform.OS === 'web' ? 'flex' : undefined,
    flexDirection: 'column',
  },
  heroSection: {
    flex: 1,
    minHeight: Platform.OS === 'web' ? 'calc(100vh - 80px)' : undefined,
    paddingTop: Platform.select({
      web: 60,
      default: 30,
    }),
    paddingBottom: Platform.select({
      web: 60,
      default: 30,
    }),
    paddingHorizontal: Platform.select({
      web: 40,
      default: 20,
    }),
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    maxWidth: 1200,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    zIndex: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  systemText: {
    color: '#E8E8E8',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 4,
    marginBottom: 15,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  mainTitle: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadow: '0 0 15px rgba(229, 209, 4, 0.3), 0 0 45px rgba(229, 209, 4, 0.1)',
    marginBottom: 15,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    opacity: 0.95,
  },
  versionText: {
    color: '#E8E8E8',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 4,
    marginBottom: 40,
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
  terminalContainer: {
    position: 'relative',
    zIndex: 3,
    width: '100%',
    display: 'flex',
    marginBottom: 40,
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
});

export default App; 