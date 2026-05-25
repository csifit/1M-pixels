import { useRef } from 'react';
import {
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

interface UseGesturesProps {
  canvasWidth: number;
  canvasHeight: number;
  onPixelPress: (pixelId: string) => void;
}

export const useGestures = ({ canvasWidth, canvasHeight, onPixelPress }: UseGesturesProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const offsetXAnim = useRef(new Animated.Value(0)).current;
  const offsetYAnim = useRef(new Animated.Value(0)).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        // Start the rubber effect - scale up slightly
        Animated.spring(scaleAnim, {
          toValue: 1.05,
          useNativeDriver: true,
        }).start();
      },
      
      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const { dx, dy } = gestureState;
        
        // Apply drag offset with resistance
        const resistanceFactor = 0.3;
        offsetXAnim.setValue(dx * resistanceFactor);
        offsetYAnim.setValue(dy * resistanceFactor);
        
        // Scale based on drag distance (rubber effect)
        const dragDistance = Math.sqrt(dx * dx + dy * dy);
        const scaleAmount = 1 + (dragDistance / 500) * 0.1;
        scaleAnim.setValue(Math.min(scaleAmount, 1.15));
      },
      
      onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        // Animate back to original position (spring effect)
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            speed: 8,
            bounciness: 12,
            useNativeDriver: true,
          }),
          Animated.spring(offsetXAnim, {
            toValue: 0,
            speed: 8,
            bounciness: 12,
            useNativeDriver: true,
          }),
          Animated.spring(offsetYAnim, {
            toValue: 0,
            speed: 8,
            bounciness: 12,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;
  
  return {
    panResponder,
    scaleAnim,
    offsetXAnim,
    offsetYAnim,
  };
};
