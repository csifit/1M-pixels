import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Colors, TextColors } from '@styles/colors';
import { Spacing, FontSize, BorderRadius, FontWeight } from '@styles/spacing';
import { usePayment } from '@hooks/usePayment';
import { usePixelStore } from '@store/pixelStore';
import { PixelService } from '@services/pixelService';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const { selectedPixels } = usePixelStore();
  const { loading, error, success, processPayment } = usePayment();
  
  const [companyName, setCompanyName] = useState('');
  const [advertiserURL, setAdvertiserURL] = useState('');
  const [selectedColor, setSelectedColor] = useState(Colors.primary.teal);
  const [paymentMethod, setPaymentMethod] = useState<string>('stripe');
  
  const pixelCount = selectedPixels.length;
  const totalCost = PixelService.calculatePixelCost(pixelCount);
  
  const colors = [
    Colors.primary.teal,
    Colors.primary.darkTeal,
    Colors.primary.lightTeal,
    Colors.status.success,
    Colors.status.error,
    Colors.status.warning,
  ];
  
  const handlePayment = async () => {
    if (!companyName.trim()) {
      alert('Please enter your company name');
      return;
    }
    
    try {
      await processPayment(companyName, advertiserURL, selectedColor, paymentMethod);
      onSuccess();
      handleClose();
    } catch (err) {
      console.error('Payment error:', err);
    }
  };
  
  const handleClose = () => {
    setCompanyName('');
    setAdvertiserURL('');
    setSelectedColor(Colors.primary.teal);
    onClose();
  };
  
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Purchase Pixels</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>
          
          {success ? (
            <View style={styles.successContainer}>
              <Text style={styles.successTitle}>✓ Purchase Successful!</Text>
              <Text style={styles.successText}>
                You purchased {pixelCount} pixels for ${totalCost.toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleClose}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={styles.label}>Selected Pixels: {pixelCount}</Text>
                <Text style={styles.cost}>
                  Total Cost: ${totalCost.toFixed(2)} ({pixelCount} × $1)
                </Text>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.label}>Company Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your company name"
                  placeholderTextColor={Colors.gray.lighter}
                  value={companyName}
                  onChangeText={setCompanyName}
                />
              </View>
              
              <View style={styles.section}>
                <Text style={styles.label}>Website URL (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="https://example.com"
                  placeholderTextColor={Colors.gray.lighter}
                  value={advertiserURL}
                  onChangeText={setAdvertiserURL}
                />
              </View>
              
              <View style={styles.section}>
                <Text style={styles.label}>Pixel Color</Text>
                <View style={styles.colorGrid}>
                  {colors.map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.colorOption,
                        { backgroundColor: color },
                        selectedColor === color && styles.colorSelected,
                      ]}
                      onPress={() => setSelectedColor(color)}
                    />
                  ))}
                </View>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.label}>Payment Method</Text>
                <View style={styles.paymentOptions}>
                  <TouchableOpacity
                    style={[
                      styles.paymentOption,
                      paymentMethod === 'stripe' && styles.paymentSelected,
                    ]}
                    onPress={() => setPaymentMethod('stripe')}
                  >
                    <Text style={styles.paymentText}>Stripe</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.paymentOption,
                      paymentMethod === 'paypal' && styles.paymentSelected,
                    ]}
                    onPress={() => setPaymentMethod('paypal')}
                  >
                    <Text style={styles.paymentText}>PayPal</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}
              
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handlePayment}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.gray.white} />
                ) : (
                  <Text style={styles.buttonText}>
                    Pay ${totalCost.toFixed(2)}
                  </Text>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.gray.medium,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    color: TextColors.primary,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  closeBtn: {
    color: TextColors.secondary,
    fontSize: FontSize.xxl,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  label: {
    color: TextColors.secondary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.sm,
  },
  cost: {
    color: Colors.primary.teal,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  input: {
    backgroundColor: Colors.gray.dark,
    borderColor: Colors.gray.light,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    color: TextColors.primary,
    fontSize: FontSize.md,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: '32%',
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: Colors.gray.white,
  },
  paymentOptions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  paymentOption: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.gray.dark,
    borderWidth: 2,
    borderColor: Colors.gray.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentSelected: {
    borderColor: Colors.primary.teal,
  },
  paymentText: {
    color: TextColors.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: Colors.status.error,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  errorText: {
    color: Colors.status.error,
    fontSize: FontSize.sm,
  },
  button: {
    backgroundColor: Colors.primary.teal,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.gray.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  cancelButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray.light,
  },
  cancelButtonText: {
    color: TextColors.secondary,
    fontSize: FontSize.md,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  successTitle: {
    color: Colors.status.success,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.md,
  },
  successText: {
    color: TextColors.secondary,
    fontSize: FontSize.md,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
});
