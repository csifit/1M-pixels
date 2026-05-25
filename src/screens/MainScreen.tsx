import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, TextColors } from '@styles/colors';
import { Spacing, FontSize, FontWeight, BorderRadius } from '@styles/spacing';
import { PixelCanvas } from '@components/PixelCanvas';
import { PaymentModal } from '@components/PaymentModal';
import { usePixelStore } from '@store/pixelStore';

export const MainScreen: React.FC = () => {
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const { selectedPixels, clearSelection } = usePixelStore();
  
  const handlePixelPress = () => {
    // Pixel press logic
  };
  
  const handleStartPurchase = () => {
    if (selectedPixels.length === 0) {
      alert('Please select at least one pixel');
      return;
    }
    setPaymentModalVisible(true);
  };
  
  const handlePaymentSuccess = () => {
    clearSelection();
    setPaymentModalVisible(false);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.gray.darkest} />
      
      <LinearGradient
        colors={[Colors.gray.darkest, Colors.gray.dark]}
        style={styles.header}
      >
        <Text style={styles.title}>1M Pixels</Text>
        <Text style={styles.subtitle}>Advertise Your Brand</Text>
      </LinearGradient>
      
      <View style={styles.canvasContainer}>
        <PixelCanvas onPixelPress={handlePixelPress} />
      </View>
      
      <View style={styles.footer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsContainer}
        >
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Selected</Text>
            <Text style={styles.statValue}>{selectedPixels.length}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Cost</Text>
            <Text style={styles.statValue}>${selectedPixels.length}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Total Grid</Text>
            <Text style={styles.statValue}>1M</Text>
          </View>
        </ScrollView>
        
        <TouchableOpacity
          style={[
            styles.purchaseButton,
            selectedPixels.length === 0 && styles.purchaseButtonDisabled,
          ]}
          onPress={handleStartPurchase}
          disabled={selectedPixels.length === 0}
        >
          <Text style={styles.purchaseButtonText}>
            Purchase {selectedPixels.length > 0 ? selectedPixels.length : ''} Pixels
          </Text>
        </TouchableOpacity>
        
        {selectedPixels.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearSelection}
          >
            <Text style={styles.clearButtonText}>Clear Selection</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onSuccess={handlePaymentSuccess}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray.darkest,
  },
  header: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.medium,
  },
  title: {
    color: Colors.primary.teal,
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: TextColors.secondary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.normal,
  },
  canvasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  footer: {
    backgroundColor: Colors.gray.medium,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray.light,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    paddingRight: Spacing.lg,
  },
  stat: {
    marginRight: Spacing.xl,
    alignItems: 'center',
  },
  statLabel: {
    color: TextColors.secondary,
    fontSize: FontSize.sm,
    marginBottom: Spacing.xs,
  },
  statValue: {
    color: Colors.primary.teal,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  purchaseButton: {
    backgroundColor: Colors.primary.teal,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  purchaseButtonDisabled: {
    opacity: 0.4,
  },
  purchaseButtonText: {
    color: Colors.gray.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  clearButton: {
    borderWidth: 1,
    borderColor: Colors.gray.light,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: TextColors.secondary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});
