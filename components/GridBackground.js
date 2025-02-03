import React from 'react';
import { View, StyleSheet } from 'react-native';

const GridBackground = () => (
  <View style={styles.container}>
    <View style={styles.grid} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    overflow: 'hidden',
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default GridBackground; 