import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FeatureCard = ({ title, description, icon, index, responsiveStyles }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      delay: index * 150,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
    opacity: animatedValue,
  };

  return (
    <Animated.View style={[styles.featureCard, responsiveStyles.card, animatedStyle]}>
      <LinearGradient
        colors={['rgba(244, 228, 9, 0.1)', 'rgba(244, 228, 9, 0)', 'rgba(244, 228, 9, 0.05)']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.cardBorder} />
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { height: responsiveStyles.iconSize.height }]}>
          <View style={styles.iconGlow} />
          {icon}
        </View>
        <View style={[styles.textContainer, { padding: responsiveStyles.textContainer.padding }]}>
          <Text style={[styles.cardTitle, { fontSize: responsiveStyles.cardTitle.fontSize }]}>{title}</Text>
          <Text style={[styles.cardDescription, { fontSize: responsiveStyles.cardDescription.fontSize, lineHeight: responsiveStyles.cardDescription.lineHeight }]}>{description}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const FeaturesSection = () => {
  const { width } = useWindowDimensions();
  
  const NetworkIcon = () => (
    <View style={styles.icon}>
      <View style={styles.networkGrid}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.networkDot}>
            <View style={styles.dotGlow} />
          </View>
        ))}
      </View>
    </View>
  );

  const Web3Icon = () => (
    <View style={styles.icon}>
      <View style={styles.web3Diamond}>
        <View style={styles.diamondGlow} />
      </View>
    </View>
  );

  const SecurityIcon = () => (
    <View style={styles.icon}>
      <View style={styles.securityShield}>
        <View style={styles.shieldGlow} />
        <View style={styles.lockIcon}>
          <View style={styles.lockGlow} />
        </View>
      </View>
    </View>
  );

  // Add responsive style calculations
  const getResponsiveStyles = () => {
    if (width <= 480) {
      // Mobile styles
      return {
        container: {
          padding: 20,
          marginVertical: 40,
        },
        titleText: {
          fontSize: 24,
          letterSpacing: 4,
          marginBottom: 10,
        },
        highlightText: {
          fontSize: 36,
          letterSpacing: 6,
        },
        card: {
          minWidth: '100%',
          margin: 10,
        },
        iconSize: {
          height: 100,
        },
        cardTitle: {
          fontSize: 22,
        },
        cardDescription: {
          fontSize: 14,
          lineHeight: 22,
        },
        textContainer: {
          padding: 20,
        }
      };
    } else if (width <= 768) {
      // Tablet styles
      return {
        container: {
          padding: 30,
          marginVertical: 60,
        },
        titleText: {
          fontSize: 28,
          letterSpacing: 5,
          marginBottom: 12,
        },
        highlightText: {
          fontSize: 44,
          letterSpacing: 7,
        },
        card: {
          minWidth: '100%',
          margin: 15,
        },
        iconSize: {
          height: 120,
        },
        cardTitle: {
          fontSize: 24,
        },
        cardDescription: {
          fontSize: 14,
          lineHeight: 24,
        },
        textContainer: {
          padding: 25,
        }
      };
    }
    // Desktop styles (default)
    return {
      container: {
        padding: 40,
        marginVertical: 80,
      },
      titleText: {
        fontSize: 32,
        letterSpacing: 6,
        marginBottom: 15,
      },
      highlightText: {
        fontSize: 56,
        letterSpacing: 8,
      },
      card: {
        minWidth: 320,
        margin: 0,
      },
      iconSize: {
        height: 140,
      },
      cardTitle: {
        fontSize: 26,
      },
      cardDescription: {
        fontSize: 15,
        lineHeight: 26,
      },
      textContainer: {
        padding: 35,
      }
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <View style={[styles.container, responsiveStyles.container]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.sectionTitle, { fontSize: responsiveStyles.titleText.fontSize, letterSpacing: responsiveStyles.titleText.letterSpacing, marginBottom: responsiveStyles.titleText.marginBottom }]}>
          Simplify daily tasks,
        </Text>
        <Text style={[styles.sectionTitleHighlight, { fontSize: responsiveStyles.highlightText.fontSize, letterSpacing: responsiveStyles.highlightText.letterSpacing }]}>
          amplify results
        </Text>
      </View>
      <View style={[styles.featuresGrid, { flexDirection: width <= 768 ? 'column' : 'row' }]}>
        <FeatureCard
          index={0}
          title="Hyper Personalized"
          description="Combining long and short term memory to build a PA that truly understands your needs."
          icon={<NetworkIcon />}
          responsiveStyles={responsiveStyles}
        />
        <FeatureCard
          index={1}
          title="Made for Web3"
          description="Eve's built on the intersection of Web3, Crypto, Finance and VC."
          icon={<Web3Icon />}
          responsiveStyles={responsiveStyles}
        />
        <FeatureCard
          index={2}
          title="Security First"
          description="Enterprise grade security. Eve will never share your data or violate any GDPR law."
          icon={<SecurityIcon />}
          responsiveStyles={responsiveStyles}
        />
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
    zIndex: 1,
  },
  titleContainer: {
    marginBottom: 40,
    alignItems: 'center',
    position: 'relative',
  },
  sectionTitle: {
    color: '#E8E8E8',
    fontSize: 32,
    fontFamily: 'Orbitron_400Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 6,
    marginBottom: 15,
    opacity: 0.7,
  },
  sectionTitleHighlight: {
    color: '#F4E409',
    fontSize: 56,
    fontFamily: 'Orbitron_700Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 8,
    textShadow: '0 0 30px rgba(244, 228, 9, 0.2)',
  },
  featuresGrid: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
    flexWrap: 'wrap',
    perspective: 1000,
  },
  featureCard: {
    flex: 1,
    minWidth: 320,
    maxWidth: 380,
    minHeight: 500,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backdropFilter: 'blur(10px)',
    transform: [{ rotateX: '5deg' }],
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  cardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F4E409',
    opacity: 0.2,
    zIndex: 1,
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  cardContent: {
    padding: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 2,
  },
  iconContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: 28,
    marginTop: 36,
    flexShrink: 0,
  },
  textContainer: {
    position: 'relative',
    flex: 1,
    padding: 35,
    height: 280,
    display: 'flex',
    flexDirection: 'column',
  },
  iconGlow: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    backgroundColor: '#F4E409',
    opacity: 0.08,
    filter: 'blur(25px)',
    borderRadius: 70,
  },
  cardTitle: {
    color: '#F4E409',
    fontSize: 26,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 3,
    textShadow: '0 0 15px rgba(244, 228, 9, 0.25)',
    marginBottom: 20,
    flexShrink: 0,
  },
  cardDescription: {
    color: '#E8E8E8',
    opacity: 0.75,
    fontSize: 15,
    lineHeight: 26,
    fontFamily: 'monospace',
    letterSpacing: 0.7,
    position: 'absolute',
    top: 120,
    left: 35,
    right: 35,
  },
  icon: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  networkGrid: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  networkDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F4E409',
    margin: 2,
    position: 'relative',
  },
  dotGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 14,
    backgroundColor: '#F4E409',
    opacity: 0.2,
    filter: 'blur(4px)',
  },
  web3Diamond: {
    width: 50,
    height: 50,
    transform: [{ rotate: '45deg' }],
    borderWidth: 2,
    borderColor: '#F4E409',
    position: 'relative',
  },
  diamondGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    backgroundColor: '#F4E409',
    opacity: 0.2,
    filter: 'blur(8px)',
  },
  securityShield: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: '#F4E409',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  shieldGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 30,
    backgroundColor: '#F4E409',
    opacity: 0.2,
    filter: 'blur(8px)',
  },
  lockIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#F4E409',
    borderRadius: 12,
    position: 'relative',
  },
  lockGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 14,
    backgroundColor: '#F4E409',
    opacity: 0.2,
    filter: 'blur(4px)',
  },
});

export default FeaturesSection; 