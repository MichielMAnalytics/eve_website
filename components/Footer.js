import React from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Footer = ({ dynamicStyles }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width <= 900;
  const isMobileScreen = width <= 600;
  const isVerySmallScreen = width <= 480;
  const iconSize = width <= 900 ? 20 : 24;

  const responsiveStyles = {
    footerContent: {
      paddingHorizontal: isMobileScreen ? 15 : isSmallScreen ? 20 : 40,
      paddingVertical: isMobileScreen ? 12 : isSmallScreen ? 15 : 20,
      maxWidth: 1280,
      marginHorizontal: 'auto',
    },
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      justifyContent: 'space-between',
    },
    policyLinksContainer: {
      flexDirection: 'row',
      gap: isMobileScreen ? 5 : 10,
      alignItems: 'center',
      justifyContent: 'center',
      flex: isSmallScreen ? 1 : 2,
      width: 'auto',
      flexWrap: 'nowrap',
      marginLeft: isVerySmallScreen ? 15 : isMobileScreen ? 20 : 0,
    },
    policyLinkText: {
      fontSize: isVerySmallScreen ? 9 : isMobileScreen ? 10 : 12,
      textAlign: 'center',
      color: '#666',
    },
    policyDivider: {
      display: 'flex',
      marginHorizontal: isVerySmallScreen ? 2 : isMobileScreen ? 4 : 10,
      fontSize: isVerySmallScreen ? 10 : isMobileScreen ? 12 : 14,
    },
    sideSection: {
      flex: isSmallScreen ? 0 : 1,
      maxWidth: isVerySmallScreen ? '25%' : isSmallScreen ? 'auto' : '30%',
    },
    socialLink: {
      padding: isVerySmallScreen ? 6 : isMobileScreen ? 8 : 8,
      backgroundColor: 'rgba(244, 228, 9, 0.1)',
      borderRadius: 5,
      alignSelf: 'flex-end',
    },
    copyrightText: {
      fontSize: isVerySmallScreen ? 8 : isMobileScreen ? 9 : 11,
      textAlign: 'left',
      color: '#666',
      whiteSpace: 'nowrap',
    },
    leftSection: {
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    policyLink: {
      padding: isVerySmallScreen ? 4 : 6,
      minWidth: isVerySmallScreen ? 'auto' : isMobileScreen ? 70 : 80,
    }
  };

  const handlePolicyClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <View style={styles.footer}>
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.95)']}
        style={styles.footerGradient}
      />
      <View style={[styles.footerContent, responsiveStyles.footerContent]}>
        <View style={[styles.footerRow, responsiveStyles.footerRow]}>
          <View style={[styles.sideSection, styles.leftSection, responsiveStyles.sideSection]}>
            <Text style={[styles.copyrightText, responsiveStyles.copyrightText]}>
              © 2025 E.V.E.
            </Text>
          </View>
          
          <View style={[styles.policyLinksContainer, responsiveStyles.policyLinksContainer]}>
            <Pressable 
              style={[styles.policyLink, responsiveStyles.policyLink]}
              onPress={() => handlePolicyClick('https://app.termly.io/policy-viewer/policy.html?policyUUID=8e73b71f-0dff-46c4-a312-a7a418937749')}
            >
              <Text style={[styles.policyLinkText, responsiveStyles.policyLinkText]}>Privacy Policy</Text>
            </Pressable>
            <Text style={[styles.policyDivider, responsiveStyles.policyDivider]}>|</Text>
            <Pressable 
              style={[styles.policyLink, responsiveStyles.policyLink]}
              onPress={() => handlePolicyClick('https://app.termly.io/policy-viewer/policy.html?policyUUID=2512b9fa-1f74-489a-be43-d5336e089119')}
            >
              <Text style={[styles.policyLinkText, responsiveStyles.policyLinkText]}>Terms</Text>
            </Pressable>
            <Text style={[styles.policyDivider, responsiveStyles.policyDivider]}>|</Text>
            <Pressable 
              style={[styles.policyLink, responsiveStyles.policyLink]}
              onPress={() => handlePolicyClick('https://app.termly.io/policy-viewer/policy.html?policyUUID=7fe0551c-b80a-4508-a25d-3b92faa89653')}
            >
              <Text style={[styles.policyLinkText, responsiveStyles.policyLinkText]}>Cookies</Text>
            </Pressable>
          </View>

          <View style={[styles.sideSection, styles.rightSection, responsiveStyles.sideSection]}>
            <Pressable 
              style={[styles.socialLink, responsiveStyles.socialLink]} 
              onPress={() => window.open('https://x.com/eveprotocolai', '_blank')}
            >
              <svg 
                width={isVerySmallScreen ? 16 : iconSize} 
                height={isVerySmallScreen ? 16 : iconSize} 
                viewBox="0 0 24 24" 
                fill="#F4E409"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'relative',
    height: 'auto',
    minHeight: 50,
    width: '100%',
    overflow: 'hidden',
  },
  footerGradient: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    height: 100,
    pointerEvents: 'none',
  },
  footerContent: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(244, 228, 9, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 1,
  },
  footerRow: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sideSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSection: {
    alignItems: 'flex-start',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  policyLinksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  policyLink: {
    padding: 6,
    cursor: 'pointer',
    minWidth: 80,
  },
  policyLinkText: {
    color: '#666',
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 1,
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#F4E409',
      textShadow: '0 0 8px rgba(244, 228, 9, 0.3)',
    }
  },
  policyDivider: {
    color: '#666',
    opacity: 0.3,
    fontSize: 14,
    marginHorizontal: 10,
  },
  socialLink: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(244, 228, 9, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  copyrightText: {
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 1,
    opacity: 0.7,
  },
});

export default Footer; 