import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponder,
  StyleSheet,
} from 'react-native';
import { Colors } from '@styles/colors';
import { usePixelGrid } from '@hooks/usePixelGrid';
import { usePixelStore } from '@store/pixelStore';

interface PixelCanvasProps {
  onPixelPress: (pixelId: string) => void;
}

export const PixelCanvas: React.FC<PixelCanvasProps> = ({ onPixelPress }) => {
  const { grid, cols } = usePixelGrid();
  const { selectedPixels, selectPixel, deselectPixel } = usePixelStore();
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const offsetXAnim = useRef(new Animated.Value(0)).current;
  const offsetYAnim = useRef(new Animated.Value(0)).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: () => {
        Animated.spring(scaleAnim, {
          toValue: 1.08,
          useNativeDriver: true,
        }).start();
      },
      
      onPanResponderMove: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const { dx, dy } = gestureState;
        const resistanceFactor = 0.25;
        
        offsetXAnim.setValue(dx * resistanceFactor);
        offsetYAnim.setValue(dy * resistanceFactor);
        
        const dragDistance = Math.sqrt(dx * dx + dy * dy);
        const scaleAmount = 1 + (dragDistance / 400) * 0.12;
        scaleAnim.setValue(Math.min(scaleAmount, 1.2));
      },
      
      onPanResponderRelease: () => {
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            speed: 10,
            bounciness: 15,
            useNativeDriver: true,
          }),
          Animated.spring(offsetXAnim, {
            toValue: 0,
            speed: 10,
            bounciness: 15,
            useNativeDriver: true,
          }),
          Animated.spring(offsetYAnim, {
            toValue: 0,
            speed: 10,
            bounciness: 15,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;
  
  const handlePixelPress = (pixelId: string) => {
    if (selectedPixels.includes(pixelId)) {
      deselectPixel(pixelId);
    } else {
      selectPixel(pixelId);
    }
    onPixelPress(pixelId);
  };
  
  const animatedStyle = {
    transform: [
      { scale: scaleAnim },
      { translateX: offsetXAnim },
      { translateY: offsetYAnim },
    ],
  };
  
  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      {...panResponder.panHandlers}
    >
      <View style={styles.grid}>
        {grid.pixels.map((pixel, index) => (
          <Pixel
            key={pixel.id}
            pixel={pixel}
            isSelected={selectedPixels.includes(pixel.id)}
            onPress={() => handlePixelPress(pixel.id)}
          />
        ))}
      </View>
    </Animated.View>
  );
};

interface PixelProps {
  pixel: any;
  isSelected: boolean;
  onPress: () => void;
}

const Pixel: React.FC<PixelProps> = ({ pixel, isSelected, onPress }) => {
  const backgroundColor = pixel.owned
    ? pixel.color || Colors.primary.teal
    : isSelected
    ? Colors.primary.darkTeal
    : Colors.gray.medium;
  
  return (
    <Animated.View
      style={[
        styles.pixel,
        {
          backgroundColor,
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? Colors.primary.lightTeal : Colors.gray.light,
        },
      ]}
      onTouchEnd={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: 1000,
    height: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.gray.dark,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pixel: {
    width: '1%',
    height: '1%',
    margin: 0,
    padding: 0,
  },
});
