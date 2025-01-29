import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import OctahedronSvg from './components/OctahedronSvg';

const App = () => {
  const { width: windowWidth } = useWindowDimensions();
  const [isSmallScreen, setIsSmallScreen] = useState(windowWidth < 768);

  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  useEffect(() => {
    setIsSmallScreen(windowWidth < 768);
  }, [windowWidth]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Dark gradient background with noise texture */}
      <LinearGradient
        colors={['#000000', '#0A0A0A', '#060714', '#000000']}
        style={styles.background}
      />

      {/* Animated grid overlay */}
      <View style={styles.gridOverlay} />

      {/* Add decorative octahedrons */}
      <View style={styles.decorativeShapes}>
        <View style={styles.octahedronMain}>
          <OctahedronSvg width={300} height={300} />
        </View>
        <View style={styles.octahedronSmall1}>
          <OctahedronSvg width={100} height={100} />
        </View>
        <View style={styles.octahedronSmall2}>
          <OctahedronSvg width={80} height={80} />
        </View>
      </View>

      {/* Main content */}
      <SafeAreaView style={styles.content}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <Text style={styles.logo}>
            <Text style={styles.logoGlitch}>E</Text>
            <Text style={styles.logoMain}>VE</Text>
          </Text>
          <View style={styles.navRight}>
            <Text style={styles.price}>$0.0150</Text>
            <Pressable style={styles.connectButton}>
              <Text style={styles.connectButtonText}>CONNECT</Text>
            </Pressable>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.systemText}>SYSTEM://INITIALIZED</Text>
            <Text style={styles.mainTitle}>AUTONOMOUS</Text>
            <Text style={styles.mainTitle}>INTELLIGENCE</Text>
            <Text style={styles.versionText}>V.1.0.0</Text>

            {/* Terminal Window */}
            <View style={styles.terminalWindow}>
              <View style={styles.terminalHeader}>
                <Text style={styles.terminalTitle}>> EVE_TERMINAL</Text>
                <View style={styles.terminalControls}>
                  <View style={[styles.terminalDot, { backgroundColor: '#FF5F57' }]} />
                  <View style={[styles.terminalDot, { backgroundColor: '#FFBD2E' }]} />
                  <View style={[styles.terminalDot, { backgroundColor: '#28CA41' }]} />
                </View>
              </View>
              <View style={styles.terminalBody}>
                <View style={styles.terminalLines}>
                  <Text style={styles.terminalLine}>
                    <Text style={styles.terminalPrompt}>{"> "}</Text>
                    <Text>Initializing EVE protocol...</Text>
                  </Text>
                  <Text style={styles.terminalLine}>
                    <Text style={styles.terminalPrompt}>{"> "}</Text>
                    <Text>Connecting to decentralized network...</Text>
                  </Text>
                  <Text style={styles.terminalLine}>
                    <Text style={styles.terminalPrompt}>{"> "}</Text>
                    <Text>Loading AI modules...</Text>
                  </Text>
                  <Text style={styles.terminalLine}>
                    <Text style={styles.terminalPrompt}>{"> "}</Text>
                    <Text style={styles.terminalHighlight}>Ready for interaction.</Text>
                  </Text>
                </View>
                <View style={styles.terminalInputLine}>
                  <Text style={styles.terminalPrompt}>{">_ "}</Text>
                  <TextInput
                    style={styles.terminalInput}
                    placeholder="Enter command..."
                    placeholderTextColor="rgba(244, 228, 9, 0.3)"
                    inputMode="text"
                    readOnly={false}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gridOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(244, 228, 9, .05) 25%, rgba(244, 228, 9, .05) 26%, transparent 27%, transparent 74%, rgba(244, 228, 9, .05) 75%, rgba(244, 228, 9, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(244, 228, 9, .05) 25%, rgba(244, 228, 9, .05) 26%, transparent 27%, transparent 74%, rgba(244, 228, 9, .05) 75%, rgba(244, 228, 9, .05) 76%, transparent 77%, transparent)',
    backgroundSize: '50px 50px',
  },
  content: {
    flex: 1,
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
  logo: {
    fontSize: 28,
    fontFamily: 'Orbitron_700Bold',
  },
  logoGlitch: {
    color: '#FF0000',
    textShadow: '2px 2px rgba(244, 228, 9, 0.5)',
  },
  logoMain: {
    color: '#F4E409',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  price: {
    color: '#F4E409',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 16,
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
  heroSection: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 40,
    position: 'relative',
    zIndex: 1,
    background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 100%)',
  },
  heroContent: {
    maxWidth: 1200,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  systemText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 4,
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  mainTitle: {
    fontSize: 90,
    color: '#F4E409',
    fontFamily: 'Orbitron_700Bold',
    letterSpacing: 2,
    lineHeight: 100,
    textTransform: 'uppercase',
    textShadow: '0 0 20px rgba(244, 228, 9, 0.5)',
    marginBottom: 15,
  },
  versionText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 4,
    marginBottom: 40,
    textTransform: 'uppercase',
  },
  terminalWindow: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    border: '1px solid #F4E409',
    overflow: 'hidden',
  },
  terminalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(244, 228, 9, 0.1)',
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
    minHeight: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  terminalLines: {
    marginBottom: 20,
  },
  terminalLine: {
    color: '#F4E409',
    fontFamily: 'monospace',
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  terminalPrompt: {
    color: '#F4E409',
    fontFamily: 'monospace',
    fontSize: 14,
    marginRight: 8,
  },
  terminalHighlight: {
    color: '#fff',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
  },
  terminalInputLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
  },
  decorativeShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  octahedronMain: {
    position: 'absolute',
    top: '50%',
    right: '-5%',
    transform: [
      { translateY: -150 },
      { rotate: '15deg' }
    ],
    opacity: 0.4,
    shadowColor: '#F4E409',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  octahedronSmall1: {
    position: 'absolute',
    top: '30%',
    right: '15%',
    opacity: 0.3,
    transform: [{ rotate: '-20deg' }],
    shadowColor: '#F4E409',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  octahedronSmall2: {
    position: 'absolute',
    top: '70%',
    right: '25%',
    opacity: 0.2,
    transform: [{ rotate: '45deg' }],
    shadowColor: '#F4E409',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
});

export default App; 