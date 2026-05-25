import { Colors, TextColors } from './colors';
import { Spacing, BorderRadius, FontSize, FontWeight } from './spacing';

export const Theme = {
  colors: Colors,
  textColors: TextColors,
  spacing: Spacing,
  borderRadius: BorderRadius,
  fontSize: FontSize,
  fontWeight: FontWeight,
  
  // Common styles
  styles: {
    card: {
      backgroundColor: Colors.gray.medium,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      shadowColor: Colors.gray.darkest,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    button: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      backgroundColor: Colors.primary.teal,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: Colors.gray.white,
      fontSize: FontSize.md,
      fontWeight: FontWeight.semibold,
    },
    input: {
      backgroundColor: Colors.gray.dark,
      borderColor: Colors.gray.light,
      borderWidth: 1,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      color: Colors.gray.white,
      fontSize: FontSize.md,
    },
  },
};

export default Theme;
