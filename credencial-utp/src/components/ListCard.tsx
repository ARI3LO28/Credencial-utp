import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows } from '@/src/constants/theme';

type ListCardProps = PropsWithChildren<{
  title: string;
  detail?: string;
}>;

export function ListCard({ children, detail, title }: ListCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: 6,
    padding: 14,
    ...shadows.soft,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  detail: {
    color: colors.muted,
    fontSize: 14,
  },
});
