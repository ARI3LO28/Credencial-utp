import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/theme';

type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
};

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
});
