import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii } from '@/src/constants/theme';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

export function AppButton({ disabled, icon, label, onPress, variant = 'primary' }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {icon ? (
        <MaterialCommunityIcons color={variant === 'primary' ? colors.cardSolid : colors.primaryDark} name={icon} size={20} />
      ) : null}
      <Text style={[styles.label, variant !== 'primary' && styles.darkLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: radii.md,
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primarySoft,
  },
  danger: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.border,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  label: {
    color: colors.cardSolid,
    fontSize: 16,
    fontWeight: '800',
  },
  darkLabel: {
    color: colors.text,
  },
});
