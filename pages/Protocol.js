import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import AnimatedLines from '../components/AnimatedLines';
import DataStream from '../components/DataStream';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OctahedronSvg from '../components/OctahedronSvg';
import RoadmapSection from '../components/RoadmapSection';
import ProtocolCards from '../components/ProtocolCards';

const Protocol = () => {
  const { width } = useWindowDimensions();
  const [scrollY] = useState(new Animated.Value(0));
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showOctahedron, setShowOctahedron] = useState(true);

  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(width < 768);
      setShowOctahedron(width >= 768);
    };
    handleResize();
  }, [width]);

  const useNativeDriver = Platform.OS !== 'web';

  const parallaxOffset = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#060714', '#0A0A0A', '#000000']}
        style={styles.background}
      />

      <View style={styles.decorativeLayer}>
        <View style={styles.gridOverlay} />
        <View style={styles.animatedLinesWrapper}>
          <AnimatedLines />
        </View>
        <DataStream />
        {showOctahedron && (
          <View style={styles.decorativeShapes}>
            <View style={styles.octahedronMain}>
              <OctahedronSvg width={700} height={700} />
            </View>
          </View>
        )}
      </View>

      <SafeAreaView style={styles.content}>
        <Navbar />
        
        <ScrollView
          style={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.heroSection}>
            <Animated.View 
              style={[
                styles.heroContent,
                { transform: [{ translateY: parallaxOffset }] }
              ]}
            >
              <View style={styles.heroTop}>
                <Text style={styles.crypticText}>INITIALIZING PROTOCOL</Text>
                <View style={styles.statusLine}>
                  <View style={styles.statusDot} />
                  <Text style={[styles.statusText, { color: '#4CAF50' }]}>STATUS: OPERATIONAL</Text>
                </View>
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.preTitle}>HYPER PERSONALIZATION</Text>
                <Text style={styles.mainTitle}>E.V.E.</Text>
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitlePrefix}>{'{'}</Text>
                  <View style={styles.subtitleContent}>
                    <Text style={styles.subtitle}>ENHANCED</Text>
                    <Text style={styles.subtitle}>VERSATILE</Text>
                    <Text style={styles.subtitle}>ENTITY</Text>
                  </View>
                  <Text style={styles.subtitlePrefix}>{'}'}</Text>
                </View>
              </View>

              <View style={styles.separator} />
              
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  Redefining how human-first data will be stored and utilized by agents.
                </Text>
                <View style={styles.versionTag}>
                  <Text style={styles.versionText}> v1.0.0 </Text>
                </View>
              </View>
            </Animated.View>
          </View>

          <ProtocolCards />
          <RoadmapSection />
        </ScrollView>

        <Footer />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    minHeight: '100vh',
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
    zIndex: 1,
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
  gridOverlay: Platform.select({
    web: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.05,
      backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(229, 209, 4, .05) 25%, rgba(229, 209, 4, .05) 26%, transparent 27%, transparent 74%, rgba(229, 209, 4, .05) 75%, rgba(229, 209, 4, .05) 76%, transparent 77%, transparent)',
      backgroundSize: '50px 50px',
      zIndex: 1,
    },
    default: {},
  }),
  content: {
    flex: 1,
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 20,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: 900,
    width: '100%',
    textAlign: 'center',
    position: 'relative',
  },
  heroTop: {
    marginBottom: 60,
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },
  crypticText: {
    color: '#E5D104',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
    letterSpacing: 4,
    opacity: 0.7,
  },
  statusLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    boxShadow: '0 0 10px rgba(229, 209, 4, 0.5)',
    animation: 'pulse 2s infinite',
  },
  statusText: {
    color: '#E5D104',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 12,
    letterSpacing: 2,
    opacity: 0.9,
  },
  titleContainer: {
    marginBottom: 40,
  },
  preTitle: {
    color: '#E8E8E8',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 16,
    letterSpacing: 6,
    opacity: 0.5,
    marginBottom: 20,
  },
  mainTitle: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    fontSize: 140,
    letterSpacing: 12,
    marginBottom: 20,
    textShadow: '0 0 20px rgba(229, 209, 4, 0.3), 0 0 60px rgba(229, 209, 4, 0.1)',
    position: 'relative',
  },
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  subtitlePrefix: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    fontSize: 32,
    opacity: 0.4,
  },
  subtitleContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  subtitle: {
    color: '#E8E8E8',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 20,
    letterSpacing: 8,
    opacity: 0.6,
  },
  separator: {
    width: 120,
    height: 2,
    backgroundColor: '#E5D104',
    opacity: 0.3,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,
  },
  descriptionContainer: {
    position: 'relative',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  descriptionLabel: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    fontSize: 14,
    letterSpacing: 4,
    marginBottom: 15,
    opacity: 0.8,
  },
  description: {
    color: '#E8E8E8',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 16,
    lineHeight: 28,
    opacity: 0.8,
  },
  versionTag: {
    position: 'absolute',
    top: -30,
    right: -60,
    backgroundColor: 'rgba(229, 209, 4, 0.1)',
    padding: '4px 8px',
    borderRadius: 4,
    border: '1px solid rgba(229, 209, 4, 0.2)',
  },
  versionText: {
    color: '#E5D104',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 12,
    opacity: 0.7,
  },
  animatedLinesWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
    pointerEvents: 'none',
  },
  decorativeShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  octahedronMain: {
    position: 'fixed',
    top: '35%',
    right: '5%',
    transform: [
      { translateY: -250 },
      { rotate: '15deg' }
    ],
    opacity: 2,
    backgroundColor: 'transparent',
  },
});

export default Protocol; 