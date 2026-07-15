import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { CredentialCard } from '@/src/components/CredentialCard';
import { Screen } from '@/src/components/Screen';
import { useProtectedStudent } from '@/src/controllers/CredentialController';
import { privateRoutes } from '@/src/navigation/routes';

export default function CredentialView() {
  const { loading, signOut, student } = useProtectedStudent();

  if (loading || !student) {
    return (
      <Screen>
        <ActivityIndicator color="#1E3A8A" />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.top}>
        <Text style={styles.heading}>Mi credencial</Text>
        <AppButton label="Salir" onPress={signOut} variant="danger" />
      </View>

      <CredentialCard student={student} />

      <View style={styles.grid}>
        <AppButton label="Notas" onPress={() => router.push(privateRoutes.notes)} variant="secondary" />
        <AppButton label="Biblioteca" onPress={() => router.push(privateRoutes.library)} variant="secondary" />
        <AppButton label="Beneficios" onPress={() => router.push(privateRoutes.benefits)} variant="secondary" />
        <AppButton label="Actualizar foto" onPress={() => router.push(privateRoutes.profilePhoto)} variant="secondary" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    color: '#111827',
    fontSize: 26,
    fontWeight: '900',
  },
  grid: {
    gap: 10,
  },
});
