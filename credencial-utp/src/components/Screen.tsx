import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export function Screen({ children }: PropsWithChildren) {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <View style={styles.inner}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F8FB',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  inner: {
    gap: 16,
    marginHorizontal: 'auto',
    maxWidth: 520,
    width: '100%',
  },
});
