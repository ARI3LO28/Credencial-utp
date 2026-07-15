import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
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
        <Text style={styles.title}>Credencial Digital UTP</Text>
        <Text style={styles.subtitle}>Acceso con correo institucional</Text>

        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="correo@utpuebla.edu.mx"
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
        {loading ? <ActivityIndicator color="#1E3A8A" /> : <AppButton label="Iniciar sesion" onPress={handleLogin} />}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E8F0',
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    marginTop: 44,
    padding: 20,
  },
  title: {
    color: '#1E3A8A',
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: '#5B6472',
    fontSize: 15,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  error: {
    color: '#B42318',
    fontWeight: '700',
  },
});
