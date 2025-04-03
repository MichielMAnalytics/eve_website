import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Globe from 'react-globe.gl';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

const WorldGlobe = forwardRef((props, ref) => {
  const globeRef = useRef();
  const { width, height } = useWindowDimensions();
  const [countries, setCountries] = useState([]);
  const [hoverD, setHoverD] = useState();
  const [showLabel, setShowLabel] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Amsterdam coordinates
  const amsterdam = {
    lat: 52.3676,
    lng: 4.9041,
    name: "Amsterdam",
    desc: "Herengracht 105-107, 1015AS, North-Holland, Netherlands",
    subline: "Building the personalization layer for a society with humans augmented by AI Agents."
  };
  
  // Europe coordinates for initial centering
  const europeCoordinates = {
    lat: 50.0,
    lng: 10.0,
    altitude: 2.5
  };

  // Expose the spin method to parent components
  useImperativeHandle(ref, () => ({
    spinOneRotation: () => {
      if (globeRef.current && !isSpinning) {
        setIsSpinning(true);
        
        // Capture exact current state
        const controls = globeRef.current.controls();
        const originalState = {
          position: { ...controls.object.position },
          target: { ...controls.target },
          zoom: controls.object.zoom,
          autoRotate: controls.autoRotate,
          autoRotateSpeed: controls.autoRotateSpeed
        };
        
        // Set to fast rotation
        controls.autoRotate = true;
        controls.autoRotateSpeed = 200; // Very fast rotation speed
        
        // Let it spin for enough time to complete one full rotation
        setTimeout(() => {
          // Stop the rotation first
          controls.autoRotate = false;
          
          // Then forcibly reset to original state
          setTimeout(() => {
            // Reset position and orientation
            controls.object.position.set(
              originalState.position.x,
              originalState.position.y,
              originalState.position.z
            );
            controls.target.set(
              originalState.target.x,
              originalState.target.y,
              originalState.target.z
            );
            controls.object.zoom = originalState.zoom;
            controls.object.updateProjectionMatrix();
            
            // Reset autorotation settings
            controls.autoRotate = originalState.autoRotate;
            controls.autoRotateSpeed = originalState.autoRotateSpeed;
            
            // Update and notify of completion
            controls.update();
            setIsSpinning(false);
          }, 50); // Short delay to ensure the autoRotate stops first
        }, 700); // Spin duration for full rotation
      }
    }
  }));
  
  useEffect(() => {
    // Add Orbitron font to the document head
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    
    // Load country data
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(({ features }) => {
        setCountries(features);
      });
      
    // Auto-rotate
    if (globeRef.current) {
      // Set initial view to Europe
      globeRef.current.pointOfView(europeCoordinates, 0);
      
      // Start auto-rotate after a delay
      setTimeout(() => {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.5;
      }, 1000);
      
      // Stop autorotation when user interacts
      globeRef.current.controls().addEventListener('start', () => {
        if (!isSpinning) {
          globeRef.current.controls().autoRotate = false;
        }
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Globe
        ref={globeRef}
        width={width}
        height={height * 0.8}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#F4E409"
        atmosphereAltitude={0.15}
        globeMaterial={{
          shininess: 0.9,
          specular: '#F4E409'
        }}
        
        // Polygons layer for countries - with empty label function
        polygonsData={countries}
        polygonCapColor={d => d === hoverD ? 'rgba(244, 228, 9, 0.3)' : 'rgba(244, 228, 9, 0.05)'}
        polygonSideColor={() => 'rgba(244, 228, 9, 0.15)'}
        polygonStrokeColor={() => '#111'}
        polygonAltitude={0.01}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
        polygonLabel={() => ''} // Empty label function to remove country labels
        
        // Amsterdam marker - render points after polygons
        pointsData={[amsterdam]}
        pointAltitude={0.05}
        pointColor={() => 'rgba(244, 228, 9, 0.8)'}
        pointRadius={0.8}
        pointsMerge={false}
        pointsTransitionDuration={0}
        renderOrder={1}
        
        // Customized label with Orbitron font
        pointLabel={({ name, desc, subline }) => `
          <div style="
            background-color: rgba(0, 0, 0, 0.9);
            color: #F4E409;
            border: 1px solid #F4E409;
            border-radius: 6px;
            padding: 14px;
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            width: 300px;
            pointer-events: none;
            z-index: 1000;
            letter-spacing: 0.5px;
          ">
            <div style="margin-bottom: 8px; font-weight: 500;">${desc}</div>
            <div style="font-size: 12px; opacity: 0.8; font-weight: 400; line-height: 1.4;">${subline}</div>
          </div>
        `}
        onPointClick={(point) => {
          // Fly to Amsterdam when clicked
          if (globeRef.current) {
            globeRef.current.pointOfView({
              lat: point.lat,
              lng: point.lng,
              altitude: 1.5
            }, 1000);
          }
          setShowLabel(!showLabel);
        }}
        labelDotRadius={0}
        labelSize={showLabel ? 1 : 0}
        labelResolution={2}
        labelIncludeDot={false}
        labelsDepth={1}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  }
});

export default WorldGlobe; 