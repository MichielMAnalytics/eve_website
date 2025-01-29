import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const SNAKE_CONFIG = {
  SEGMENT_LENGTH: 37.5,
  BASE_LENGTH: 52,
  LENGTH: 35,
  BASE_SPEED: 6,
  MAX_TURNS: 3,
  LENGTH_VARIATION: 20,
  SPEED_VARIATION: 3,
  FPS: 30,
  MIN_SNAKES: 5,
  MAX_SNAKES: 15
};

const AnimatedLines = React.memo(() => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [snakes, setSnakes] = useState([]);
  const animationFrameRef = useRef();
  const lastUpdateTime = useRef(0);
  const snakesRef = useRef([]);
  
  // Memoize frame delay
  const frameDelay = useMemo(() => 1000 / SNAKE_CONFIG.FPS, []);

  // Memoize snake creation function
  const createSnake = useCallback(() => ({
    id: Math.random(),
    dots: Array(SNAKE_CONFIG.BASE_LENGTH + Math.floor(Math.random() * SNAKE_CONFIG.LENGTH_VARIATION))
      .fill(0)
      .map(() => ({
        x: new Animated.Value(-SNAKE_CONFIG.SEGMENT_LENGTH),
        y: new Animated.Value(0),
      })),
    direction: { x: 1, y: 0 },
    position: { 
      x: -SNAKE_CONFIG.SEGMENT_LENGTH, 
      y: Math.random() * screenHeight * 0.8 + screenHeight * 0.1 
    },
    path: [],
    turnsRemaining: SNAKE_CONFIG.MAX_TURNS,
    lastTurnX: -SNAKE_CONFIG.SEGMENT_LENGTH,
    speed: SNAKE_CONFIG.BASE_SPEED + (Math.random() * SNAKE_CONFIG.SPEED_VARIATION),
  }), [screenHeight]);

  // Initialize snakes only once
  useEffect(() => {
    if (snakesRef.current.length === 0) {
      const initialSnakes = Array(SNAKE_CONFIG.MIN_SNAKES)
        .fill(0)
        .map(() => createSnake());
      snakesRef.current = initialSnakes;
      setSnakes(initialSnakes);
    }
  }, [createSnake]);

  // Optimize moveSnakes function
  const moveSnakes = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateTime.current < 100) {
      animationFrameRef.current = requestAnimationFrame(moveSnakes);
      return;
    }
    
    lastUpdateTime.current = now;
    
    // Process only a subset of snakes each frame
    const MAX_SNAKES = 10; // Limit maximum number of snakes
    const currentSnakes = snakesRef.current.slice(0, MAX_SNAKES);
    
    // Simple position updates without complex calculations
    const updatedSnakes = currentSnakes.map(snake => ({
      ...snake,
      x: snake.position.x + snake.direction.x * snake.speed,
      y: snake.position.y + snake.direction.y * snake.speed,
      speedX: (snake.position.x <= 0 || snake.position.x >= screenWidth + SNAKE_CONFIG.SEGMENT_LENGTH) ? -snake.direction.x * snake.speed : snake.direction.x * snake.speed,
      speedY: (snake.position.y <= 0 || snake.position.y >= screenHeight + SNAKE_CONFIG.SEGMENT_LENGTH) ? -snake.direction.y * snake.speed : snake.direction.y * snake.speed
    }));
    
    // Simple bounds check
    const viewport = {
      minX: -50,
      maxX: screenWidth + 50,
      minY: -50,
      maxY: screenHeight + 50
    };
    
    snakesRef.current = updatedSnakes.filter(snake => 
      snake.x >= viewport.minX && 
      snake.x <= viewport.maxX && 
      snake.y >= viewport.minY && 
      snake.y <= viewport.maxY
    );
    
    // Add new snakes less frequently
    if (snakesRef.current.length < SNAKE_CONFIG.MIN_SNAKES) {
      snakesRef.current.push(createSnake());
    }
    
    setSnakes([...snakesRef.current]);
    animationFrameRef.current = requestAnimationFrame(moveSnakes);
  }, [createSnake, screenWidth, screenHeight]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(moveSnakes);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [moveSnakes]);

  // Memoize snake rendering
  const renderSnakes = useMemo(() => (
    snakes.map((snake) => (
      <View key={snake.id}>
        {snake.dots.map((dot, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                opacity: Math.max(0.4, (SNAKE_CONFIG.LENGTH - index) / SNAKE_CONFIG.LENGTH),
                transform: [
                  { translateX: dot.x },
                  { translateY: dot.y }
                ]
              },
            ]}
          />
        ))}
      </View>
    ))
  ), [snakes]);

  return (
    <View style={styles.container}>
      {renderSnakes}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1,
    isolation: 'auto',
  },
  dot: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#FFEB3B',
    borderRadius: 2,
    opacity: 0.8,
  },
});

export default AnimatedLines; 