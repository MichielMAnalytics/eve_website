import React from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MarketInfo = React.memo(({ styles, dynamicStyles }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width <= 768;
  const isMobileScreen = width <= 480;

  return (
    <View style={[styles.marketInfo, dynamicStyles?.marketInfo]}>
      {isSmallScreen ? (
        // Mobile layout
        <>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Text style={[styles.marketValue, { color: '#FFFFFF' }]}>watch closely and you may find</Text>
          </View>
        </>
      ) : (
        // Desktop layout
        <>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Text style={[styles.marketValue, { color: '#FFFFFF' }]}>watch closely and you may find</Text>
          </View>
        </>
      )}
    </View>
  );
});

const SocialLinks = React.memo(({ styles }) => {
  const { width } = useWindowDimensions();
  const iconSize = width <= 768 ? 20 : 24;

  return (
    <View style={[styles.socialLinks, { marginTop: 20 }]}>
      <Pressable 
        style={[styles.socialLink, { 
          padding: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(244, 228, 9, 0.1)',
        }]} 
        onPress={() => window.open('https://x.com/eveprotocolai', '_blank')}
      >
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 24 24" 
          fill="#F4E409"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Pressable>
    </View>
  );
});

const PolicyLinks = React.memo(({ styles, responsiveStyles }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width <= 768;

  const handlePolicyClick = (url, isConsentManager = false) => {
    if (isConsentManager) {
      // Display the consent manager
      if (window.displayPreferenceModal) {
        window.displayPreferenceModal();
      }
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <View style={[styles.policyLinksContainer, responsiveStyles.policyLinksContainer]}>
      <Pressable 
        style={styles.policyLink}
        onPress={() => handlePolicyClick('https://app.termly.io/policy-viewer/policy.html?policyUUID=8e73b71f-0dff-46c4-a312-a7a418937749')}
      >
        <Text style={styles.policyLinkText}>Privacy Policy</Text>
      </Pressable>
      <Text style={styles.policyDivider}>|</Text>
      <Pressable 
        style={styles.policyLink}
        onPress={() => handlePolicyClick('https://app.termly.io/policy-viewer/policy.html?policyUUID=2512b9fa-1f74-489a-be43-d5336e089119')}
      >
        <Text style={styles.policyLinkText}>Terms & Conditions</Text>
      </Pressable>
      <Text style={styles.policyDivider}>|</Text>
      <Pressable 
        style={styles.policyLink}
        onPress={() => handlePolicyClick('https://app.termly.io/policy-viewer/policy.html?policyUUID=7fe0551c-b80a-4508-a25d-3b92faa89653')}
      >
        <Text style={styles.policyLinkText}>Cookie Policy</Text>
      </Pressable>
    </View>
  );
});

const Footer = ({ dynamicStyles }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width <= 768;
  const isMobileScreen = width <= 480;

  const responsiveStyles = {
    footerContent: {
      paddingHorizontal: isMobileScreen ? 15 : isSmallScreen ? 20 : 40,
      paddingVertical: isMobileScreen ? 20 : isSmallScreen ? 30 : 40,
    },
    footerRow: {
      flexDirection: isSmallScreen ? 'column' : 'row',
      gap: isSmallScreen ? 20 : 0,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingBottom: 20,
    },
    marketInfo: {
      flexDirection: isSmallScreen ? 'column' : 'row',
      gap: isMobileScreen ? 10 : isSmallScreen ? 15 : 30,
    },
    socialContainer: {
      alignSelf: isSmallScreen ? 'center' : 'flex-end',
      paddingRight: isSmallScreen ? 0 : 40,
      paddingTop: isSmallScreen ? 20 : 0,
    },
    policyLinksContainer: {
      flexDirection: isSmallScreen ? 'column' : 'row',
      gap: isSmallScreen ? 15 : 10,
      marginTop: isSmallScreen ? 20 : 0,
      alignItems: 'center',
    }
  };

  return (
    <View style={styles.footer}>
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.95)']}
        style={styles.footerGradient}
      />
      <View style={[styles.footerContent, responsiveStyles.footerContent]}>
        <View style={[styles.footerRow, responsiveStyles.footerRow]}>
          <View style={styles.spacer} />
          <MarketInfo styles={styles} dynamicStyles={responsiveStyles} />
          <View style={[styles.socialContainer, responsiveStyles.socialContainer]}>
            <SocialLinks styles={styles} />
          </View>
        </View>
        <PolicyLinks styles={styles} responsiveStyles={responsiveStyles} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(244, 228, 9, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 1,
  },
  footerRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  spacer: {
    width: 100,
  },
  marketInfo: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  marketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    width: '100%',
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
  marketLabelMobile: {
    fontSize: 10,
  },
  marketValue: {
    color: '#F4E409',
    fontSize: 14,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 1,
  },
  marketValueMobile: {
    fontSize: 12,
  },
  marketChange: {
    color: '#FF5757',
    fontSize: 14,
    fontFamily: 'Orbitron_400Regular',
    marginLeft: 4,
  },
  marketChangeMobile: {
    fontSize: 12,
  },
  marketDivider: {
    color: '#666',
    opacity: 0.3,
    fontSize: 16,
  },
  socialContainer: {
    minWidth: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  socialLink: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(244, 228, 9, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(244, 228, 9, 0.2)',
      transform: 'translateY(-2px)',
    }
  },
  policyLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(244, 228, 9, 0.1)',
  },
  policyLink: {
    padding: 8,
    cursor: 'pointer',
  },
  policyLinkText: {
    color: '#666',
    fontSize: 12,
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
});

export default Footer; 