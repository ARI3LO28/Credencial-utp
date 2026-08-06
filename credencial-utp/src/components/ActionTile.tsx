import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows } from '@/src/constants/theme';

type ActionTileProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  detail: string;
  onPress: () => void;
};

export function ActionTile({ detail, icon, label, onPress }: ActionTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={(state) => [
        styles.tile,
        'hovered' in state && state.hovered && styles.hovered,
        state.pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons color={colors.primary} name={icon} size={23} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <MaterialCommunityIcons color={colors.muted} name="chevron-right" size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexBasis: 260,
    flexGrow: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 76,
    padding: 16,
    ...shadows.soft,
  },
  hovered: {
    backgroundColor: colors.cardSolid,
    borderColor: 'rgba(0,132,61,0.24)',
    transform: [{ translateY: -2 }],
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.md,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  detail: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
});
