import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '@/src/constants/theme';

export function Screen({ children }: PropsWithChildren) {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowRight} />
      <View style={styles.orbLeft} />
      <View style={styles.patternDots}>
        {Array.from({ length: 18 }).map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
      </View>
      <View style={styles.inner}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: 20,
    position: 'relative',
  },
  inner: {
    gap: 20,
    marginHorizontal: 'auto',
    maxWidth: 920,
    width: '100%',
    zIndex: 2,
  },
  glowTop: {
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 240,
    height: 360,
    left: -80,
    position: 'absolute',
    right: -80,
    top: -170,
    pointerEvents: 'none',
  },
  glowRight: {
    backgroundColor: 'rgba(0,132,61,0.16)',
    borderRadius: 280,
    height: 420,
    position: 'absolute',
    right: -180,
    top: 170,
    width: 420,
    pointerEvents: 'none',
  },
  orbLeft: {
    backgroundColor: 'rgba(255,255,255,0.56)',
    borderRadius: 160,
    height: 260,
    left: -120,
    position: 'absolute',
    top: 430,
    width: 260,
    pointerEvents: 'none',
  },
  patternDots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    left: 20,
    opacity: 0.28,
    position: 'absolute',
    top: 300,
    width: 86,
    pointerEvents: 'none',
  },
  dot: {
    backgroundColor: colors.primary,
    borderRadius: 3,
    height: 5,
    width: 5,
  },
});
