import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import OctahedronSvg from '../components/OctahedronSvg';
import AnimatedLines from '../components/AnimatedLines';
import DataStream from '../components/DataStream';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Documentation = () => {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('introduction');
  const [showOctahedron, setShowOctahedron] = useState(true);

  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  const tabs = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'The-Origin', title: 'The Origin' },
    { id: 'Autonomous-Intelligence', title: 'Autonomous Intelligence' },
    { id: 'The-Eve-Approach', title: 'The Eve Approach' }
  ];

  const dynamicStyles = {
    mainContent: {
      flexDirection: width <= 768 ? 'column' : 'row',
      padding: width <= 480 ? 20 : 40,
    },
    sidebar: {
      width: width <= 768 ? '100%' : 250,
      borderRightWidth: width <= 768 ? 0 : 1,
      borderBottomWidth: width <= 768 ? 1 : 0,
      paddingRight: width <= 768 ? 0 : 20,
      paddingBottom: width <= 768 ? 20 : 0,
      marginBottom: width <= 768 ? 20 : 0,
    },
    contentArea: {
      paddingLeft: width <= 768 ? 0 : 60,
      paddingRight: width <= 768 ? 0 : 40,
    },
    contentSection: {
      padding: width <= 480 ? 20 : 40,
    },
    heading: {
      fontSize: width <= 480 ? 24 : width <= 768 ? 28 : 32,
      marginBottom: width <= 480 ? 20 : 30,
    },
    paragraph: {
      fontSize: width <= 480 ? 14 : 16,
      lineHeight: width <= 480 ? 24 : 28,
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'introduction':
        return (
          <View style={[dynamicStyles.contentSection, styles.contentSection]}>
            <Text style={[dynamicStyles.heading, styles.heading]}>Introduction to Eve</Text>
            
            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
              Eve is not just technology—it is a paradigm shift in how you connect, create, and communicate.
            </Text>

            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
              Designed as a symbiotic AI, Eve transcends traditional boundaries, seamlessly blending intuition and innovation. 
              It evolves with you, learning, adapting, and amplifying your potential.
            </Text>

            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
              With Eve by your side, you're not just managing tasks—you're unlocking creativity, refining your narrative, and forging 
              connections with unparalleled clarity. She doesn't merely assist; she transforms, making the complex feel effortless and 
              the ambitious within reach.
            </Text>

            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
              Eve is the ally who doesn't just follow your lead but intuitively guides you toward realizing your vision.
            </Text>

            <Text style={[dynamicStyles.paragraph, styles.paragraph]}>
              Welcome to a new era of communication, where potential knows no limits.
            </Text>
          </View>
        );

      case 'The-Origin':
        return (
          <View style={[dynamicStyles.contentSection, styles.contentSection]}>
            <Text style={[dynamicStyles.heading, styles.heading]}>The Origin</Text>
            
            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
            The genesis of Eve lies in a bold vision: to challenge the status quo of traditional AI systems and bring clarity to a digital world increasingly dominated by noise. 
            As AI bots flood the internet and communication tools grow more chaotic, the essence of meaningful interaction has been lost, reduced to the mundane act of simply keeping up. 
            Eve was born from a confluence of ambition and dissatisfaction—a response to the frustration with cluttered, unstructured communication platforms that obscure the true nature of conversation.
            </Text>

            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
            Inspired by the daily struggles people face, Eve's creators sought to redefine the role of AI. Her foundation is built on a philosophy of simplicity and precision: 
            filtering through the digital noise to bring focus and clarity. 
            Eve empowers you to communicate on your terms—swiftly, accessibly, and securely—making every interaction purposeful and effortless.
            </Text>

            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
            Eve doesn't just keep pace; she transcends the chaos, restoring the art of communication and placing you firmly at the center. 
            Through her, technology becomes an extension of your voice, your vision, and your style.
            This is the essence of Eve: an AI designed not to overwhelm but to illuminate.
            </Text>

          </View>
        );

      case 'Autonomous-Intelligence':
        return (
          <View style={[dynamicStyles.contentSection, styles.contentSection]}>
            <Text style={[dynamicStyles.heading, styles.heading]}>Autonomous Intelligence</Text>
            
            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
            Eve embodies a revolutionary concept: the "Symbiotic AI" model. 
            Unlike traditional static systems, Eve thrives on an evolving partnership with her user. 
            She doesn't just execute commands; she grows with you, adapting to your unique rhythm and expanding her capabilities to meet your needs as they develop.
            This ever-deepening relationship is the cornerstone of the Eve experience.
            </Text>

            <Text style={styles.systemText}>Human-Centric</Text>
            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
            Eve is built on a foundation of empathy and adaptability. 
            She is designed to intuitively understand and respond to the nuances of your preferences, behaviours, and goals.
            Rather than offering generic solutions, Eve tailors her support to your specific needs, ensuring every interaction feels personal and meaningful.
            </Text>

            <Text style={styles.systemText}>Fluid Interaction</Text>
            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
            Eve is not a static assistant; she is a dynamic presence that evolves alongside you. 
            Whether your goals shift, your challenges grow, or your ambitions soar, Eve keeps pace, constantly refining her approach to serve you better. 
            This commitment to fluidity ensures that Eve remains relevant, useful, and aligned with your journey.
            </Text>

            <Text style={styles.systemText}>Mystical Intuition</Text>
            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
            There's an almost magical quality to how Eve operates—a sense of natural flow that simplifies the complex. 
            She anticipates your needs and offers solutions before you even realize you require them. 
            This "mystical intuition" transforms interactions, making the seemingly impossible feel effortless and the intricate appear straightforward.  
            </Text>

          </View>
        );

      case 'The-Eve-Approach':
        return (
          <View style={[dynamicStyles.contentSection, styles.contentSection]}>
            <Text style={[dynamicStyles.heading, styles.heading]}>The Eve Approach</Text>
            
            <Text style={styles.systemText}>A Commitment to Trust and Ethics</Text>
            <Text style={[dynamicStyles.paragraph, styles.paragraph, { marginBottom: 20 }]}>
            Eve's approach is anchored in transparency, inclusivity, and ethical AI deployment. 
            She is built to prioritize your privacy and security, ensuring that your trust is never compromised.
            Eve is not just your assistant but a collaborator you can rely on—a partner who empowers you without overstepping boundaries.
            </Text>
          </View>
        );

      default:
        return null;
    }
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

        {/* Documentation Content */}
        <View style={[styles.mainContent, dynamicStyles.mainContent]}>
          <View style={[styles.sidebar, dynamicStyles.sidebar]}>
            {tabs.map((tab) => (
              <Pressable
                key={tab.id}
                style={[
                  styles.tabButton,
                  activeTab === tab.id && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.id && styles.activeTabText,
                  ]}
                >
                  {tab.title}
                </Text>
              </Pressable>
            ))}
          </View>
          <ScrollView style={[styles.contentArea, dynamicStyles.contentArea]}>
            {renderContent()}
          </ScrollView>
        </View>

        {/* Footer */}
        <Footer width={width} />
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
  content: {
    flex: 1,
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    minHeight: 'calc(100vh - 80px)', // 80px is navbar height
    maxWidth: 1200,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    zIndex: 20,
    isolation: 'isolate',
    display: 'flex',
    alignItems: 'stretch',
  },
  sidebar: {
    borderColor: 'rgba(244, 228, 9, 0.1)',
  },
  tabButton: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 0,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(244, 228, 9, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  activeTabButton: {
    backgroundColor: 'rgba(244, 228, 9, 0.05)',
    borderColor: 'rgba(244, 228, 9, 0.3)',
  },
  tabText: {
    color: '#F4E409',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
    opacity: 0.5,
    letterSpacing: 2,
  },
  activeTabText: {
    opacity: 1,
    textShadow: '0 0 10px rgba(244, 228, 9, 0.5)',
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  contentSection: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: '#000000',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'rgba(244, 228, 9, 0.1)',
    position: 'relative',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadow: '0 0 15px rgba(229, 209, 4, 0.3), 0 0 45px rgba(229, 209, 4, 0.1)',
    marginBottom: 15,
    position: 'relative',
    opacity: 0.95,
  },
  paragraph: {
    color: '#E8E8E8',
    fontFamily: 'Orbitron_400Regular',
    opacity: 0.7,
    letterSpacing: 1,
    maxWidth: '800px',
    position: 'relative',
    zIndex: 1,
  },
  systemText: {
    color: '#F4E409',
    fontSize: 16,
    fontFamily: 'Orbitron_700Bold',
    letterSpacing: 4,
    marginBottom: 15,
    textTransform: 'uppercase',
    opacity: 0.8,
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
});

export default Documentation; 