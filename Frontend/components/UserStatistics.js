import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Updated mock data with more relevant AI/protocol metrics
const mockData = {
  dailyUsage: [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 4.1 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 4.7 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 3.9 },
    { day: 'Sun', hours: 1.1 },
  ],
  avgUsagePerDay: 3.5,
  totalScreenTime: '3h 45',
  metrics: {
    dailyaverage: { value: '1.55h', trend: 'down' },
    notifications: { value: '13', trend: 'down' },
    timesaved: { value: '2.8h', trend: 'up' }
  },
  protocolHealth: {
    status: 'Live',
  },
};

const BlinkingDot = () => {
  const opacity = React.useRef(new Animated.Value(0.4)).current;

  React.useEffect(() => {
    const blink = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.4,
        duration: 1000,
        useNativeDriver: true,
      })
    ]);

    Animated.loop(blink).start();
  }, []);

  return (
    <Animated.View style={[styles.statusDot, { opacity }]} />
  );
};

const UserStatistics = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;
  const maxHours = 6;
  const gridLines = [0, 2, 4, 6];
  const [hoveredBar, setHoveredBar] = useState(null);
  const [isFlowPlaying, setIsFlowPlaying] = useState(false);

  // Add breathing animation
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.025,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Add responsive styles
  const responsiveStyles = {
    container: {
      padding: isMobile ? 15 : 35,
      height: 'auto',
      maxWidth: isMobile ? '100%' : 500,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      transform: [{ scale: scaleValue }], // Apply breathing effect
    },
    chartContainer: {
      height: isMobile ? 120 : 180,
      marginBottom: isMobile ? 8 : 15,
    },
    metricsGrid: {
      padding: isMobile ? 10 : 25,
      gap: isMobile ? 8 : 15,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    telegramLogo: {
      width: isMobile ? 28 : 40,
      height: isMobile ? 28 : 40,
    },
    screenTime: {
      fontSize: isMobile ? 18 : 24,
    },
    metricLabel: {
      fontSize: width <= 480 ? 8 : width <= 768 ? 10 : 11,
    },
    metricValue: {
      fontSize: width <= 480 ? 12 : width <= 768 ? 16 : 18,
    },
    trendIndicator: {
      fontSize: width <= 480 ? 9 : width <= 768 ? 11 : 12,
    },
    metricItem: {
      padding: isMobile ? 6 : 12,
      minWidth: '30%',
      maxWidth: '33%',
      flex: 1,
    }
  };

  // Update the animation effect
  useEffect(() => {
    let flowTimeout;
    
    const playFlow = async () => {
      setIsFlowPlaying(true);
      
      // Smoother sequential animation
      const animateBar = async (index) => {
        return new Promise(resolve => {
          setHoveredBar(mockData.dailyUsage[index].day);
          setTimeout(() => {
            resolve();
          }, 150); // Faster transition between bars
        });
      };

      // First wave: left to right
      for (let i = 0; i < mockData.dailyUsage.length; i++) {
        await animateBar(i);
      }

      // Optional: Subtle fade out wave right to left
      for (let i = mockData.dailyUsage.length - 1; i >= 0; i--) {
        await new Promise(resolve => {
          setTimeout(() => {
            setHoveredBar(mockData.dailyUsage[i].day);
            resolve();
          }, 100);
        });
      }
      
      // Reset smoothly
      setTimeout(() => {
        setHoveredBar(null);
        setIsFlowPlaying(false);
      }, 200);
    };

    const scheduleNextFlow = () => {
      const nextDelay = Math.random() * (8000 - 6000) + 6000; // Slightly more frequent (6-8 seconds)
      flowTimeout = setTimeout(() => {
        playFlow().then(() => scheduleNextFlow());
      }, nextDelay);
    };

    scheduleNextFlow();

    return () => {
      clearTimeout(flowTimeout);
      setHoveredBar(null);
      setIsFlowPlaying(false);
    };
  }, []);

  const avgLinePosition = `${(mockData.avgUsagePerDay / maxHours) * 100}%`;

  const renderUsageBar = (hours, day) => {
    const heightPercentage = (hours / maxHours) * 100;
    const isHovered = hoveredBar === day;
    
    return (
      <View key={day} style={styles.barContainer}>
        <Pressable 
          style={styles.barWrapper}
          onMouseEnter={() => !isFlowPlaying && setHoveredBar(day)}
          onMouseLeave={() => !isFlowPlaying && setHoveredBar(null)}
        >
          {/* Only show tooltip when manually hovering (not during flow animation) */}
          {isHovered && !isFlowPlaying && (
            <View style={[
              styles.hoursTooltipContainer,
              { bottom: `${heightPercentage}%` }
            ]}>
              <View style={styles.hoursTooltip}>
                <Text style={styles.hoursTooltipText}>{hours}h</Text>
              </View>
            </View>
          )}
          <LinearGradient
            colors={['#F4E409', '#E5D104']}
            style={[
              styles.bar, 
              { height: `${heightPercentage}%` },
              isHovered && styles.barHovered
            ]}
          />
          {isHovered && (
            <LinearGradient
              colors={['rgba(244, 228, 9, 0.2)', 'rgba(244, 228, 9, 0.05)']}
              style={[
                styles.barGlow,
                { height: `${heightPercentage}%` }
              ]}
            />
          )}
        </Pressable>
        <Text style={styles.dayLabel}>{day}</Text>
      </View>
    );
  };

  const renderAvgLine = () => {
    // Use percentages instead of fixed pixel values
    const dashWidthPercent = 4; // 4% of container width
    const dashGapPercent = 2;   // 2% of container width
    const labelSpacePercent = 15; // 15% reserved for label
    const dashUnit = dashWidthPercent + dashGapPercent;
    
    // Calculate number of dashes to fill remaining space
    const availableSpace = 100 - labelSpacePercent;
    const numberOfDashes = Math.floor(availableSpace / dashUnit);

    return Array.from({ length: numberOfDashes }).map((_, index) => (
      <View key={index} style={styles.dash} />
    ));
  };

  return (
    <Animated.View style={[styles.container, responsiveStyles.container]}>
      <LinearGradient
        colors={['rgba(251, 250, 247, 0.1)', 'rgba(245, 240, 240, 0.3)']}
        style={styles.backgroundGradient}
      />
      
      <View style={styles.contentWrapper}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerLeft}>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/512px-Telegram_2019_Logo.svg.png' }}
              style={[styles.telegramLogo, responsiveStyles.telegramLogo]}
            />
            <View>
              <Text style={[styles.screenTime, responsiveStyles.screenTime]}>{mockData.totalScreenTime}</Text>
              <Text style={styles.lastUpdated}>Powered by E.V.E.</Text>
            </View>
          </View>
          <View style={styles.protocolStatus}>
            <Text style={styles.statusLabel}>Eve</Text>
            <View style={styles.statusValueContainer}>
              <BlinkingDot />
              <Text style={styles.statusValue}>{mockData.protocolHealth.status}</Text>
            </View>
          </View>
        </View>

        {/* Chart Section */}
        <View style={[styles.chartContainer, responsiveStyles.chartContainer]}>
          <View style={styles.chart}>
            <View style={[styles.avgLineContainer, { bottom: avgLinePosition }]}>
              <View style={styles.avgLine}>
                {renderAvgLine()}
              </View>
              <View style={styles.avgLabelContainer}>
                <Text style={styles.avgLabel}>avg</Text>
              </View>
            </View>
            {mockData.dailyUsage.map(({ day, hours }) => 
              renderUsageBar(hours, day)
            )}
          </View>
          
          <View style={styles.gridContainer}>
            {gridLines.map((value) => (
              <View key={value} style={styles.gridLine}>
                <Text style={styles.gridLabel}>{value}h</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Metrics Grid */}
        <View style={[styles.metricsGrid, responsiveStyles.metricsGrid]}>
          <View style={[styles.metricItem, responsiveStyles.metricItem]}>
            <View style={styles.metricLabelContainer}>
              <Text style={[styles.metricLabel, responsiveStyles.metricLabel]}>Daily usage</Text>
              <Text style={[styles.trendIndicator, styles.trendDown, responsiveStyles.trendIndicator]}>↓</Text>
            </View>
            <Text style={[styles.metricValue, responsiveStyles.metricValue]}>{mockData.metrics.dailyaverage.value}</Text>
          </View>
          <View style={[styles.metricItem, responsiveStyles.metricItem]}>
            <View style={styles.metricLabelContainer}>
              <Text style={[styles.metricLabel, responsiveStyles.metricLabel]}>Notifications</Text>
              <Text style={[styles.trendIndicator, styles.trendDown, responsiveStyles.trendIndicator]}>↓</Text>
            </View>
            <Text style={[styles.metricValue, responsiveStyles.metricValue]}>{mockData.metrics.notifications.value}</Text>
          </View>
          <View style={[styles.metricItem, responsiveStyles.metricItem]}>
            <View style={styles.metricLabelContainer}>
              <Text style={[styles.metricLabel, responsiveStyles.metricLabel]}>Time saved</Text>
              <Text style={[styles.trendIndicator, styles.trendUp, responsiveStyles.trendIndicator]}>↑</Text>
            </View>
            <Text style={[styles.metricValue, responsiveStyles.metricValue]}>{mockData.metrics.timesaved.value}</Text>
          </View>
        </View>

        {/* Protocol Health */}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(244, 228, 9, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    backdropFilter: 'blur(10px)',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.3,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 2,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244, 228, 9, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  telegramLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  screenTime: {
    fontSize: 24,
    color: '#F4E409',
    fontFamily: 'Orbitron_700Bold',
    marginBottom: 4,
    textShadow: '0 0 15px rgba(244, 228, 9, 0.2)',
  },
  lastUpdated: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Orbitron_400Regular',
  },
  protocolStatus: {
    alignItems: 'flex-end',
  },
  statusLabel: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Orbitron_400Regular',
    marginBottom: 4,
  },
  statusValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusValue: {
    color: '#4CAF50',
    fontSize: 16,
    fontFamily: 'Orbitron_700Bold',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    boxShadow: '0 0 10px #4CAF50',
  },
  chartContainer: {
    height: 180,
    marginBottom: 15,
    position: 'relative',
    paddingBottom: 30,
    flexDirection: 'row',
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'relative',
    zIndex: 2,
    marginBottom: 30,
  },
  gridContainer: {
    position: 'relative',
    width: 30,
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column-reverse',
    zIndex: 1,
    marginLeft: 10,
  },
  gridLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 20,
  },
  gridLabel: {
    color: '#666',
    fontSize: 11,
    fontFamily: 'Orbitron_400Regular',
    width: 25,
    textAlign: 'right',
    opacity: 0.8,
  },
  avgLineContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 30,
    paddingLeft: '3%',
  },
  avgLine: {
    flex: 1,
    height: 1,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.5,
    marginRight: '2%',
  },
  dash: {
    width: '5.5%',
    height: 1,
    backgroundColor: '#FF6B6B',
    marginRight: '2%',
    zIndex: 30,
  },
  avgLabelContainer: {
    position: 'absolute',
    right: '-12%',
    paddingLeft: '1%',
  },
  avgLabel: {
    color: '#FF6B6B',
    fontSize: 10,
    fontFamily: 'Orbitron_400Regular',
    opacity: 1,
    textAlign: 'right',
  },
  barContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barWrapper: {
    width: 25,
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
    cursor: 'pointer',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 3,
    zIndex: 2,
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 0 10px rgba(244, 228, 9, 0.1)',
  },
  barHovered: {
    transform: [{ scaleX: 1.15 }],
    filter: 'brightness(1.3)',
    boxShadow: '0 0 15px rgba(244, 228, 9, 0.2)',
  },
  barGlow: {
    position: 'absolute',
    bottom: 0,
    left: -10,
    right: -10,
    borderRadius: 6,
    zIndex: 1,
    opacity: 0.6,
    filter: 'blur(12px)',
    transition: 'all 0.2s ease-in-out',
  },
  dayLabel: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Orbitron_400Regular',
    position: 'absolute',
    bottom: -25,
    width: '100%',
    textAlign: 'center',
  },
  hoursTooltipContainer: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    transform: [{ translateY: -24 }],
  },
  hoursTooltip: {
    backgroundColor: 'rgba(244, 228, 9, 0.1)',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(244, 228, 9, 0.3)',
    minWidth: 45,
    backdropFilter: 'blur(5px)',
    boxShadow: '0 0 15px rgba(244, 228, 9, 0.1)',
  },
  hoursTooltipText: {
    color: '#F4E409',
    fontSize: 12,
    fontFamily: 'Orbitron_400Regular',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 25,
    borderRadius: 15,
    backgroundColor: 'rgba(244, 228, 9, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(244, 228, 9, 0.1)',
    gap: 15,
    minWidth: 'fit-content',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(244, 228, 9, 0.01)',
    maxWidth: '33%',
    minWidth: 'fit-content',
  },
  metricLabelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 6,
    width: '100%',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  metricLabel: {
    color: '#666',
    fontSize: 11,
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 0.5,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  metricValue: {
    color: '#F4E409',
    fontSize: 18,
    fontFamily: 'Orbitron_700Bold',
  },
  trendIndicator: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  trendUp: {
    color: '#4CAF50',
  },
  trendDown: {
    color: '#FF6B6B',
  },
  protocolHealthSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(244, 228, 9, 0.1)',
  },
  healthMetric: {
    alignItems: 'center',
  },
  healthLabel: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Orbitron_400Regular',
    marginBottom: 4,
  },
  healthValue: {
    color: '#F4E409',
    fontSize: 16,
    fontFamily: 'Orbitron_700Bold',
  },
});

export default UserStatistics; 