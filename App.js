import React, { useState } from 'react';
import OctahedronSvg from './components/OctahedronSvg';
import AnimatedLines from './components/AnimatedLines';
import DataStream from './components/DataStream';
import TriggeredEffect from './components/TriggeredEffect';
import Terminal from './components/Terminal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useWindowDimensions } from 'react-native';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LinearGradient } from 'expo-linear-gradient';
import { View, SafeAreaView } from 'react-native';
import Documentation from './pages/Documentation';

const MainContent = () => {
  const [showOctahedron, setShowOctahedron] = useState(true);
  
  return (
    <View style={styles.mainContent}>
      <TriggeredEffect />
      <Terminal />
    </View>
  );
};

const App = () => {
  const { width } = useWindowDimensions();
  const [showOctahedron, setShowOctahedron] = useState(true);

  return (
    <Router>
      <View style={styles.container}>
        {/* Background layer */}
        <LinearGradient
          colors={['#000000', '#0A0A0A', '#060714', '#000000']}
          style={styles.background}
        />

        {/* Decorative layer */}
        <View style={styles.decorativeLayer}>
          <View style={styles.gridOverlay} />
          <View style={styles.animatedLinesWrapper}>
            <AnimatedLines />
          </View>
          {showOctahedron && (
            <View style={styles.decorativeShapes}>
              <View style={styles.octahedronMain}>
                <OctahedronSvg width={700} height={700} />
              </View>
            </View>
          )}
          <DataStream />
        </View>

        <SafeAreaView style={styles.content}>
          {/* Navbar */}
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>

          {/* Footer */}
          <Footer width={width} />
        </SafeAreaView>
      </View>
    </Router>
  );
};

const styles = {
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
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  decorativeLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    pointerEvents: 'none',
  },
  gridOverlay: {
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
  content: {
    flex: 1,
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 3,
  },
  mainContent: {
    flex: 1,
    padding: 40,
    maxWidth: 1200,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    zIndex: 20,
    isolation: 'isolate',
  },
  decorativeShapes: {
    position: 'absolute',
    right: -200,
    top: '40%',
    transform: [{ translateY: -350 }],
    zIndex: 1,
  },
  octahedronMain: {
    opacity: 0.15,
    transform: [{ scale: 1.2 }],
  },
  animatedLinesWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
  },
};

export default App;