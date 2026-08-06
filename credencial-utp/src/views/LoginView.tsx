import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { colors, radii, shadows } from '@/src/constants/theme';
import { useAuth } from '@/src/controllers/AuthController';

export default function LoginView() {
  const { loading, signIn, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!loading && user) {
    router.replace('/credential');
  }

  const handleLogin = async () => {
    setError('');

    try {
      await signIn({ email, password });
      router.replace('/credential');
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : 'No se pudo iniciar sesion.');
    }
  };

  return (
    <Screen>
      <View style={styles.panel}>
        <View style={styles.brandMark}>
          <Text style={styles.brandText}>UTP</Text>
        </View>
        <Text style={styles.title}>Credencial Digital UTP</Text>
        <Text style={styles.subtitle}>Acceso institucional para estudiantes</Text>

        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="correo@alumno.utpuebla.edu.mx"
          style={styles.input}
          value={email}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Contrasena"
          secureTextEntry
          style={styles.input}
          value={password}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {loading ? <ActivityIndicator color={colors.primary} /> : <AppButton label="Iniciar sesion" onPress={handleLogin} />}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: 14,
    marginTop: 44,
    padding: 20,
    ...shadows.card,
  },
  brandMark: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    height: 54,
    justifyContent: 'center',
    width: 72,
  },
  brandText: {
    color: colors.card,
    fontSize: 20,
    fontWeight: '900',
  },
  title: {
    color: colors.primaryDark,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
  },
  input: {
    backgroundColor: '#FAFCFB',
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  error: {
    color: colors.danger,
    fontWeight: '700',
  },
});
