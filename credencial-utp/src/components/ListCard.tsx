import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E8F0',
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    padding: 14,
  },
  title: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
  },
  detail: {
    color: '#5B6472',
    fontSize: 14,
  },
});
