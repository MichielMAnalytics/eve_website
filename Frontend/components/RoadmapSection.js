import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

const RoadmapSection = () => {
  const breatheAnim = useBreathingAnimation(2000);

  const cardScale = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.025],
  });

  return (
    <View style={styles.roadmapSection}>
      <Text style={styles.roadmapTitle}>DEVELOPMENT ROADMAP</Text>
      <View style={styles.roadmapContainer}>
        <Animated.View style={[
          styles.roadmapPhase,
          styles.activePhase,
          {
            transform: [
              { scale: cardScale }
            ]
          }
        ]}>
          <LinearGradient
            colors={['rgba(244, 228, 9, 0.15)', 'rgba(244, 228, 9, 0.05)', 'rgba(244, 228, 9, 0.1)']}
            style={styles.phaseGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.phaseHeader}>
            <View style={[styles.phaseIndicator, styles.activeIndicator]}>
              <Text style={[styles.phaseNumber, styles.activeNumber]}>01</Text>
              <View style={[styles.activeDot]} />
            </View>
            <Text style={[styles.phaseTitle, styles.activeTitle]}>Foundation Phase</Text>
            <Text style={[styles.phaseStatus, styles.activeStatus]}>IN PROGRESS</Text>
          </View>
          <View style={styles.phaseContent}>
            <Text style={[styles.phaseDescription, styles.activeDescription]}>
              Establishing the core infrastructure and fundamental protocols that will power the E.V.E. ecosystem.
            </Text>
            <View style={styles.milestoneList}>
              <View style={styles.milestone}>
                <View style={[styles.milestoneIcon, styles.activeMilestoneIcon]} />
                <Text style={[styles.milestoneText, styles.activeMilestoneText]}>Core Protocol Development</Text>
              </View>
              <View style={styles.milestone}>
                <View style={[styles.milestoneIcon, styles.activeMilestoneIcon]} />
                <Text style={[styles.milestoneText, styles.activeMilestoneText]}>Security Framework Implementation</Text>
              </View>
              <View style={styles.milestone}>
                <View style={[styles.milestoneIcon, styles.activeMilestoneIcon]} />
                <Text style={[styles.milestoneText, styles.activeMilestoneText]}>Initial Testing Phase</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={[styles.roadmapPhase, styles.phaseMiddle]}>
          <LinearGradient
            colors={['rgba(244, 228, 9, 0.1)', 'rgba(244, 228, 9, 0)', 'rgba(244, 228, 9, 0.05)']}
            style={styles.phaseGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.phaseHeader}>
            <View style={styles.phaseIndicator}>
              <Text style={styles.phaseNumber}>02</Text>
            </View>
            <Text style={styles.phaseTitle}>Evolution Phase</Text>
          </View>
          <View style={styles.phaseContent}>
            <Text style={styles.phaseDescription}>
              Expanding capabilities and introducing advanced features for enhanced autonomous operations.
            </Text>
            <View style={styles.milestoneList}>
              <View style={styles.milestone}>
                <View style={styles.milestoneIcon} />
                <Text style={styles.milestoneText}>Advanced AI Integration</Text>
              </View>
              <View style={styles.milestone}>
                <View style={styles.milestoneIcon} />
                <Text style={styles.milestoneText}>Cross-Chain Compatibility</Text>
              </View>
              <View style={styles.milestone}>
                <View style={styles.milestoneIcon} />
                <Text style={styles.milestoneText}>Performance Optimization</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.roadmapPhase, styles.phaseFuture]}>
          <LinearGradient
            colors={['rgba(244, 228, 9, 0.1)', 'rgba(244, 228, 9, 0)', 'rgba(244, 228, 9, 0.05)']}
            style={styles.phaseGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.phaseHeader}>
            <View style={styles.phaseIndicator}>
              <Text style={styles.phaseNumber}>03</Text>
            </View>
            <Text style={styles.phaseTitle}>Ascension Phase</Text>
          </View>
          <View style={styles.phaseContent}>
            <Text style={styles.phaseDescription}>
              Achieving full autonomy and establishing E.V.E. as the leading protocol for decentralized intelligence.
            </Text>
            <View style={styles.milestoneList}>
              <View style={styles.milestone}>
                <View style={styles.milestoneIcon} />
                <Text style={styles.milestoneText}>Full Autonomous Operation</Text>
              </View>
              <View style={styles.milestone}>
                <View style={styles.milestoneIcon} />
                <Text style={styles.milestoneText}>Global Network Integration</Text>
              </View>
              <View style={styles.milestone}>
                <View style={styles.milestoneIcon} />
                <Text style={styles.milestoneText}>Ecosystem Expansion</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roadmapSection: {
    padding: 80,
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 20,
  },
  roadmapTitle: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    fontSize: 36,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 80,
    opacity: 0.9,
    textShadow: '0 0 15px rgba(229, 209, 4, 0.2)',
    position: 'relative',
    zIndex: 20,
  },
  roadmapContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 1400,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    zIndex: 20,
  },
  roadmapPhase: {
    flex: 1,
    minWidth: 300,
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(229, 209, 4, 0.1)',
    padding: 30,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 20,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  phaseHeader: {
    marginBottom: 30,
    position: 'relative',
    zIndex: 21,
  },
  phaseIndicator: {
    position: 'absolute',
    top: -15,
    left: -15,
    width: 50,
    height: 50,
    background: 'linear-gradient(135deg, rgba(244, 228, 9, 0.1), rgba(244, 228, 9, 0), rgba(244, 228, 9, 0.05))',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 21,
  },
  phaseNumber: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    fontSize: 18,
    opacity: 0.9,
    zIndex: 21,
  },
  phaseDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#E5D104',
    borderRadius: 3,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -3 }, { translateY: -3 }],
    boxShadow: '0 0 10px rgba(229, 209, 4, 0.5)',
    zIndex: 21,
  },
  phaseTitle: {
    color: '#E5D104',
    fontFamily: 'Orbitron_700Bold',
    fontSize: 24,
    letterSpacing: 2,
    marginBottom: 10,
    paddingLeft: 40,
    position: 'relative',
    zIndex: 21,
  },
  phaseStatus: {
    color: '#4CAF50',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 12,
    letterSpacing: 2,
    paddingLeft: 40,
    position: 'relative',
    zIndex: 21,
  },
  statusUpcoming: {
    color: '#FFC107',
  },
  statusFuture: {
    color: '#2196F3',
  },
  phaseContent: {
    position: 'relative',
    zIndex: 21,
  },
  phaseDescription: {
    color: '#E8E8E8',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
    lineHeight: 24,
    opacity: 0.7,
    marginBottom: 30,
    position: 'relative',
    zIndex: 21,
  },
  milestoneList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    position: 'relative',
    zIndex: 21,
  },
  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    position: 'relative',
    zIndex: 21,
  },
  milestoneIcon: {
    width: 8,
    height: 8,
    backgroundColor: '#E5D104',
    borderRadius: 4,
    opacity: 0.5,
  },
  milestoneText: {
    color: '#E8E8E8',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
    opacity: 0.8,
  },
  phaseMiddle: {
    transform: [{ translateY: 0 }],
  },
  phaseFuture: {
    transform: [{ translateY: 0 }],
  },
  phaseGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  activePhase: {
    borderColor: 'rgba(229, 209, 4, 0.3)',
    boxShadow: '0 0 30px rgba(229, 209, 4, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    transform: [{ scale: 1.02 }],
  },
  activeIndicator: {
    background: 'linear-gradient(135deg, rgba(244, 228, 9, 0.2), rgba(244, 228, 9, 0.1), rgba(244, 228, 9, 0.15))',
    boxShadow: '0 0 20px rgba(229, 209, 4, 0.2)',
  },
  activeNumber: {
    opacity: 1,
    textShadow: '0 0 10px rgba(229, 209, 4, 0.5)',
  },
  activeDot: {
    backgroundColor: '#E5D104',
    opacity: 1,
    boxShadow: '0 0 15px rgba(229, 209, 4, 0.7)',
  },
  activeTitle: {
    opacity: 1,
    textShadow: '0 0 15px rgba(229, 209, 4, 0.3)',
  },
  activeStatus: {
    color: '#4CAF50',
    opacity: 1,
    textShadow: '0 0 10px rgba(76, 175, 80, 0.3)',
  },
  activeDescription: {
    opacity: 0.9,
  },
  activeMilestoneIcon: {
    opacity: 0.8,
    boxShadow: '0 0 8px rgba(229, 209, 4, 0.4)',
  },
  activeMilestoneText: {
    opacity: 0.9,
  },
});

export default RoadmapSection; 