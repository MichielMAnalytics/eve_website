import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Rect, Defs, LinearGradient, Stop, Text } from 'react-native-svg';

const OctahedronSvg = ({ width = 60, height = 60, style, ...props }) => {
  return (
    <View style={[
      {
        width: width,
        height: height,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      style
    ]}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 492 467"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        {...props}
      >
        <Defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </Defs>
        
        {/* Apply the glow filter to the existing SVG content */}
        <g filter="url(#glow)">
          {/* X symbols in corners - made more elegant with thinner strokes */}
          <Rect x={215} y={1} width={64} height={47} rx={3} stroke="#A3930A" strokeWidth={1.5}/>
          <Path d="M239.499 32V31.98L245.539 24.8L239.499 17.62V17.6H241.579L246.599 23.54L251.599 17.6H253.679V17.62L247.639 24.8L253.699 31.98V32H251.599L246.599 26.06L241.579 32H239.499Z" fill="#F4E409"/>
          <Rect x={215} y={419} width={64} height={47} rx={3} stroke="#A3930A" strokeWidth={1.5}/>
          <Path d="M239.499 450V449.98L245.539 442.8L239.499 435.62V435.6H241.579L246.599 441.54L251.599 435.6H253.679V435.62L247.639 442.8L253.699 449.98V450H251.599L246.599 444.06L241.579 450H239.499Z" fill="#F4E409"/>
          <Rect x={427} y={211} width={64} height={47} rx={3} stroke="#A3930A" strokeWidth={1.5}/>
          <Path d="M451.499 242V241.98L457.539 234.8L451.499 227.62V227.6H453.579L458.599 233.54L463.599 227.6H465.679V227.62L459.639 234.8L465.699 241.98V242H463.599L458.599 236.06L453.579 242H451.499Z" fill="#F4E409"/>
          <Rect x={4} y={211} width={64} height={47} rx={3} stroke="#A3930A" strokeWidth={1.5}/>
          <Path d="M28.4992 242V241.98L34.5392 234.8L28.4992 227.62V227.6H30.5792L35.5992 233.54L40.5992 227.6H42.6792V227.62L36.6392 234.8L42.6992 241.98V242H40.5992L35.5992 236.06L30.5792 242H28.4992Z" fill="#F4E409"/>

          {/* Text Elements - slightly increased opacity for better readability */}
          <Text
            x="157"
            y="139"
            fill="#F4E409"
            fillOpacity="0.15"
            fontFamily="Orbitron"
            fontSize="24"
            textAnchor="end"
          >
            Personalised
          </Text>

          <Text
            x="337.891"
            y="139"
            fill="#F4E409"
            fillOpacity="0.15"
            fontFamily="Orbitron"
            fontSize="24"
            textAnchor="start"
          >
            Easy to use
          </Text>

          <Text
            x="157"
            y="327.891"
            fill="#F4E409"
            fillOpacity="0.15"
            fontFamily="Orbitron"
            fontSize="24"
            textAnchor="end"
          >
            Web 3 native
          </Text>

          <Text
            x="337.891"
            y="327.891"
            fill="#F4E409"
            fillOpacity="0.15"
            fontFamily="Orbitron"
            fontSize="24"
            textAnchor="start"
          >
            Secure
          </Text>

          {/* Central Octahedron - enhanced colors and gradients */}
          <Path d="M197.91 231.032L223.165 243.006L244.986 285.922L197.91 231.032Z" fill="#2C1A0B" stroke="#F4E409" strokeWidth={1.5}/>
          <Path d="M196.853 229.424L246.063 179.975L223.253 241.941L196.853 229.424Z" fill="#A3930A" fillOpacity="0.9" stroke="#F4E409" strokeWidth={1.5}/>
          <Path d="M224.323 243.077L297.36 238.425L247.456 288.573L224.323 243.077Z" fill="#A3930A" fillOpacity="0.9" stroke="#F4E409" strokeWidth={1.5}/>
          <Path d="M224.267 242.079L247.498 178.972L297.614 237.407L224.267 242.079Z" fill="#2C1A0B" stroke="#F4E409" strokeWidth={1.5}/>

          {/* Dotted Lines - refined dash pattern and gradient */}
          <Path d="M247 158.5V78" stroke="url(#paint0_linear)" strokeWidth={1.5} strokeDasharray="8 12"/>
          <Path d="M337.891 139L299 177.891" stroke="url(#paint1_linear)" strokeWidth={1.5} strokeDasharray="8 12"/>
          <Path d="M157 139.001L195.891 177.892" stroke="url(#paint2_linear)" strokeWidth={1.5} strokeDasharray="8 12"/>
          <Path d="M157 327.891L195.891 289" stroke="url(#paint3_linear)" strokeWidth={1.5} strokeDasharray="8 12"/>
          <Path d="M337.891 327.891L299 289" stroke="url(#paint4_linear)" strokeWidth={1.5} strokeDasharray="8 12"/>
          <Path d="M247 309V389.5" stroke="url(#paint5_linear)" strokeWidth={1.5} strokeDasharray="8 12"/>
          <Path d="M176.5 230H96" stroke="url(#paint6_linear)" strokeWidth={1.5} strokeDasharray="8 12"/>
          <Path d="M319 238H399.5" stroke="url(#paint7_linear)" strokeWidth={1.5} strokeDasharray="8 12"/>

          {/* Enhanced gradients in Defs */}
          <Defs>
            <LinearGradient id="paint0_linear" x1="247.5" y1="78" x2="247.5" y2="158.5" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#F4E409"/>
              <Stop offset="0.8" stopColor="#8E8505"/>
              <Stop offset="1" stopColor="#5F5906"/>
            </LinearGradient>
            
            <LinearGradient id="paint1_linear" x1="298.646" y1="177.537" x2="337.537" y2="138.646" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#F4E409"/>
              <Stop offset="0.555" stopColor="#5F5906"/>
            </LinearGradient>

            <LinearGradient id="paint2_linear" x1="195.537" y1="178.245" x2="156.646" y2="139.354" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#F4E409"/>
              <Stop offset="0.555" stopColor="#5F5906"/>
            </LinearGradient>

            <LinearGradient id="paint3_linear" x1="196.244" y1="289.354" x2="157.353" y2="328.244" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#F4E409"/>
              <Stop offset="0.555" stopColor="#5F5906"/>
            </LinearGradient>

            <LinearGradient id="paint4_linear" x1="299.354" y1="288.646" x2="338.244" y2="327.537" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#F4E409"/>
              <Stop offset="0.555" stopColor="#5F5906"/>
            </LinearGradient>

            <LinearGradient id="paint5_linear" x1="247.5" y1="389.5" x2="247.5" y2="309" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#F4E409"/>
              <Stop offset="1" stopColor="#8E8505"/>
            </LinearGradient>

            <LinearGradient id="paint6_linear" x1="96" y1="229.5" x2="176.5" y2="229.5" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#F4E409"/>
              <Stop offset="1" stopColor="#8E8505"/>
            </LinearGradient>

            <LinearGradient id="paint7_linear" x1="399.5" y1="238.5" x2="319" y2="238.5" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#F4E409"/>
              <Stop offset="1" stopColor="#8E8505"/>
            </LinearGradient>
          </Defs>
        </g>
      </Svg>
    </View>
  );
};

export default OctahedronSvg; 