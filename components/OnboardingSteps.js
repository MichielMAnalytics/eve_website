import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StepIcon = ({ children, isXLogo }) => (
  <View style={styles.iconContainer}>
    <LinearGradient
      colors={['rgba(244, 228, 9, 0.1)', 'rgba(229, 209, 4, 0.2)']}
      style={styles.iconGradient}
    >
      {isXLogo ? (
        <svg width={32} height={32} viewBox="0 0 24 24" fill="#F4E409">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ) : (
        <Text style={styles.iconText}>{children}</Text>
      )}
    </LinearGradient>
  </View>
);

const OnboardingSteps = () => {
  const { width } = useWindowDimensions();
  
  const getResponsiveStyles = () => {
    if (width <= 480) {
      // Mobile styles
      return {
        container: {
          paddingVertical: 40,
        },
        content: {
          paddingHorizontal: 15,
        },
        title: {
          fontSize: 28,
          marginBottom: 12,
        },
        subtitle: {
          fontSize: 14,
          lineHeight: 20,
          paddingHorizontal: 20,
        },
        stepsContainer: {
          flexDirection: 'column',
          gap: 30,
          paddingHorizontal: 15,
        },
        stepColumn: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
          paddingHorizontal: 10,
          marginBottom: 25,
        },
        iconContainer: {
          width: 60,
          height: 60,
          marginBottom: 0,
          marginRight: 5,
        },
        textGroup: {
          flex: 1,
          justifyContent: 'center',
          minHeight: 60,
        },
        stepTitle: {
          fontSize: 18,
          marginBottom: 4,
          textAlign: 'left',
          color: '#F4E409',
        },
        stepDescription: {
          fontSize: 13,
          lineHeight: 18,
          textAlign: 'left',
          opacity: 0.7,
          paddingRight: 10,
        },
        // Hide connectors on mobile
        connector: {
          display: 'none',
        }
      };
    }
    // Desktop styles remain unchanged
    return {};
  };

  const responsiveStyles = getResponsiveStyles();

  const steps = [
    {
      icon: "x-logo",
      title: "Share your Stats",
      description: "Share your Telegram activity stats with us on X.",
      link: "https://x.com/intent/tweet?text=Help%20me%20get%20some%20precious%20time%20back%20%40eveprotocolai" // Updated tweet format
    },
    {
      icon: "⌛",
      title: "Whitelist",
      description: "Whitelist through the received link."
    },
    {
      icon: "🚀",
      title: "Get access",
      description: "Begin your journey with Eve."
    }
  ];

  return (
    <View style={[styles.container, responsiveStyles.container]}>
      <View style={[styles.content, responsiveStyles.content]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, responsiveStyles.title]}>
            3 Steps to Launch
          </Text>
          <Text style={[styles.subtitle, responsiveStyles.subtitle]}>
            get whitelisted and start your journey with Eve.
          </Text>
        </View>

        <View style={[styles.stepsContainer, responsiveStyles.stepsContainer]}>
          {steps.map((step, index) => (
            <Pressable
              key={index}
              style={({ hovered }) => [
                styles.stepColumn,
                responsiveStyles.stepColumn,
                hovered && styles.hoveredStep, // Apply hover style
              ]}
              onPress={() => step.link && Linking.openURL(step.link)}
            >
              <StepIcon isXLogo={step.icon === "x-logo"} style={responsiveStyles.iconContainer}>
                {step.icon !== "x-logo" && step.icon}
              </StepIcon>
              
              <View style={responsiveStyles.textGroup}>
                <Text style={[styles.stepTitle, responsiveStyles.stepTitle]}>
                  {step.title}
                </Text>
                <Text style={[styles.stepDescription, responsiveStyles.stepDescription]}>
                  {step.description}
                </Text>
              </View>
              
              {/* Connector dots (hidden on mobile) */}
              {index < steps.length - 1 && (
                <View style={[styles.connector, responsiveStyles.connector]}>
                  <View style={styles.connectorDot} />
                  <View style={styles.connectorDot} />
                  <View style={styles.connectorDot} />
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(244, 228, 9, 0.1)',
  },
  content: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    color: '#F4E409',
    fontSize: 36,
    fontFamily: 'Orbitron_700Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    color: '#E8E8E8',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    textAlign: 'center',
    maxWidth: 600,
    opacity: 0.8,
    lineHeight: 24,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
    paddingHorizontal: 40,
  },
  stepColumn: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 20,
    cursor: 'pointer', // Change cursor to pointer
    transition: 'transform 0.2s ease-in-out', // Smooth transition
  },
  hoveredStep: {
    transform: [{ scale: 1.05 }], // Slightly enlarge on hover
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 24,
    padding: 2,
    backgroundColor: 'rgba(244, 228, 9, 0.1)',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 32,
  },
  stepTitle: {
    color: '#F4E409',
    fontSize: 20,
    fontFamily: 'Orbitron_700Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDescription: {
    color: '#E8E8E8',
    fontSize: 14,
    fontFamily: 'Orbitron_400Regular',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 20,
    maxWidth: 250,
  },
  connector: {
    position: 'absolute',
    top: 40,
    right: -30,
    width: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: -1,
  },
  connectorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(244, 228, 9, 0.3)',
  },
});

export default OnboardingSteps; 