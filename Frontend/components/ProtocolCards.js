import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProtocolCards = () => {
  return (
    <View style={styles.protocolSection}>
      <View style={styles.protocolCard}>
        <View style={styles.cardBackground}>
          <LinearGradient
            colors={['rgba(244, 228, 9, 0.15)', 'rgba(244, 228, 9, 0)', 'rgba(244, 228, 9, 0.05)']}
            style={styles.cardGlow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.hexagonPattern}>
            {[...Array(6)].map((_, i) => (
              <View key={i} style={[styles.hexagon, { opacity: 0.03 + (i * 0.01) }]} />
            ))}
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.titleSection}>
            <Text style={styles.cardTitle}>en·hanced</Text>
            <View style={styles.titleDecoration} />
          </View>
          <View style={styles.phoneticsContainer}>
            <Text style={styles.phonetic}>/inˈhanst, enˈhanst/</Text>
            <View style={styles.wordTypeTag}>
              <Text style={styles.partOfSpeech}> verb </Text>
            </View>
          </View>
          <View style={styles.definitionBox}>
            <Text style={styles.definition}>
              To increase or improve in value, quality, desirability, or attractiveness
            </Text>
          </View>
          <View style={styles.cardDecoration} />
        </View>
      </View>

      <View style={styles.protocolCard}>
        <View style={styles.cardBackground}>
          <LinearGradient
            colors={['rgba(244, 228, 9, 0.15)', 'rgba(244, 228, 9, 0)', 'rgba(244, 228, 9, 0.05)']}
            style={styles.cardGlow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.hexagonPattern}>
            {[...Array(6)].map((_, i) => (
              <View key={i} style={[styles.hexagon, { opacity: 0.03 + (i * 0.01) }]} />
            ))}
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.titleSection}>
            <Text style={styles.cardTitle}>ver·sa·tile</Text>
            <View style={styles.titleDecoration} />
          </View>
          <View style={styles.phoneticsContainer}>
            <Text style={styles.phonetic}>/ˈvərsətl/</Text>
            <View style={styles.wordTypeTag}>
              <Text style={styles.partOfSpeech}> adjective </Text>
            </View>
          </View>
          <View style={styles.definitionBox}>
            <Text style={styles.definition}>
              Able to adapt or be adapted to many different functions or activities; having varied uses or serving many functions
            </Text>
          </View>
          <View style={styles.cardDecoration} />
        </View>
      </View>

      <View style={styles.protocolCard}>
        <View style={styles.cardBackground}>
          <LinearGradient
            colors={['rgba(244, 228, 9, 0.15)', 'rgba(244, 228, 9, 0)', 'rgba(244, 228, 9, 0.05)']}
            style={styles.cardGlow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.hexagonPattern}>
            {[...Array(6)].map((_, i) => (
              <View key={i} style={[styles.hexagon, { opacity: 0.03 + (i * 0.01) }]} />
            ))}
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.titleSection}>
            <Text style={styles.cardTitle}>en·ti·ty</Text>
            <View style={styles.titleDecoration} />
          </View>
          <View style={styles.phoneticsContainer}>
            <Text style={styles.phonetic}>/ˈen(t)ədē/</Text>
            <View style={styles.wordTypeTag}>
              <Text style={styles.partOfSpeech}> noun </Text>
            </View>
          </View>
          <View style={styles.definitionBox}>
            <Text style={styles.definition}>
              A thing with distinct and independent existence; something that exists as itself, as a subject or as an object
            </Text>
          </View>
          <View style={styles.cardDecoration} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  protocolSection: {
    padding: 80,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 40,
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 20,
  },
  protocolCard: {
    width: 320,
    height: 400,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 0 30px rgba(229, 209, 4, 0.1)',
    transition: 'transform 0.3s ease',
    ...Platform.select({
      web: {
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 0 40px rgba(229, 209, 4, 0.15)',
        }
      }
    })
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  hexagonPattern: {
    position: 'absolute',
    top: '50%',
    right: -50,
    transform: [{ translateY: -100 }],
    zIndex: 2,
  },
  hexagon: {
    width: 100,
    height: 115,
    backgroundColor: '#E5D104',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    position: 'absolute',
    transform: [{ rotate: '30deg' }],
  },
  cardContent: {
    padding: 30,
    height: '100%',
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  titleSection: {
    marginBottom: 20,
    position: 'relative',
  },
  cardTitle: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    fontSize: 28,
    letterSpacing: 2,
    textShadow: '0 0 15px rgba(229, 209, 4, 0.3)',
  },
  titleDecoration: {
    position: 'absolute',
    left: 0,
    bottom: -8,
    width: 60,
    height: 2,
    backgroundColor: '#E5D104',
    opacity: 0.5,
    boxShadow: '0 0 10px rgba(229, 209, 4, 0.5)',
  },
  phoneticsContainer: {
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  phonetic: {
    color: '#E8E8E8',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
    opacity: 0.6,
  },
  wordTypeTag: {
    backgroundColor: 'rgba(229, 209, 4, 0.1)',
    borderRadius: 4,
    padding: '4px 8px',
    borderWidth: 1,
    borderColor: 'rgba(229, 209, 4, 0.2)',
  },
  partOfSpeech: {
    color: '#E5D104',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 12,
    opacity: 0.8,
  },
  definitionBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(229, 209, 4, 0.1)',
  },
  definition: {
    color: '#E8E8E8',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  cardDecoration: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'rgba(229, 209, 4, 0.2)',
    transform: [{ rotate: '45deg' }],
  },
});

export default ProtocolCards; 