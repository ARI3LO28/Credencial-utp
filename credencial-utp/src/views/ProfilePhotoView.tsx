import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { useProtectedStudent } from '@/src/controllers/CredentialController';
import { uploadProfilePhoto } from '@/src/services/StudentService';

export default function ProfilePhotoView() {
  const { refreshStudent, student } = useProtectedStudent();
  const [previewUri, setPreviewUri] = useState<string | undefined>(student?.fotoUrl);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 5],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPreviewUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!student || !previewUri) {
      return;
    }

    setLoading(true);
    setMessage('');
    await uploadProfilePhoto(student.matricula, previewUri);
    await refreshStudent();
    setLoading(false);
    setMessage('Fotografia actualizada.');
  };

  return (
    <Screen>
      <Text style={styles.heading}>Actualizar fotografia</Text>
      {previewUri ? <Image source={{ uri: previewUri }} style={styles.preview} /> : null}
      <AppButton label="Seleccionar foto" onPress={handlePick} variant="secondary" />
      {loading ? <ActivityIndicator color="#1E3A8A" /> : <AppButton label="Guardar foto" onPress={handleUpload} />}
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <AppButton label="Volver" onPress={() => router.back()} variant="secondary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '900',
  },
  preview: {
    alignSelf: 'center',
    backgroundColor: '#E8EDF7',
    borderRadius: 8,
    height: 220,
    width: 176,
  },
  message: {
    color: '#12643A',
    fontWeight: '800',
  },
});
