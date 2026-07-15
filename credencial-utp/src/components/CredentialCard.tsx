import { Image, StyleSheet, Text, View } from 'react-native';

import { Student } from '@/src/models/Student';
import { qrCodeContext } from '@/src/services/QRCodeStrategy';

type CredentialCardProps = {
  student: Student;
};

export function CredentialCard({ student }: CredentialCardProps) {
  const qrUrl = qrCodeContext.getCredentialQR(student.matricula);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.school}>Universidad Tecnologica de Puebla</Text>
        <Text style={styles.title}>Credencial Digital</Text>
      </View>

      <View style={styles.identity}>
        <Image
          source={student.fotoUrl ? { uri: student.fotoUrl } : require('@/assets/images/icon.png')}
          style={styles.photo}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{student.nombre}</Text>
          <Text style={styles.text}>{student.matricula}</Text>
          <Text style={styles.text}>{student.carrera}</Text>
          <Text style={styles.status}>{student.estadoAcademico}</Text>
        </View>
      </View>

      <View style={styles.qrRow}>
        <Image source={{ uri: qrUrl }} style={styles.qr} />
        <Text style={styles.qrText}>QR de validacion generado por servicio externo.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D4A574',
    borderRadius: 8,
    borderWidth: 2,
    gap: 18,
    padding: 18,
  },
  header: {
    borderBottomColor: '#E4E8F0',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  school: {
    color: '#1E3A8A',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: '#1D2433',
    fontSize: 24,
    fontWeight: '800',
  },
  identity: {
    flexDirection: 'row',
    gap: 14,
  },
  photo: {
    backgroundColor: '#E8EDF7',
    borderRadius: 8,
    height: 110,
    width: 88,
  },
  info: {
    flex: 1,
    gap: 5,
  },
  name: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '800',
  },
  text: {
    color: '#4B5563',
    fontSize: 14,
  },
  status: {
    alignSelf: 'flex-start',
    backgroundColor: '#DFF7EA',
    borderRadius: 6,
    color: '#12643A',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  qrRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  qr: {
    height: 116,
    width: 116,
  },
  qrText: {
    color: '#4B5563',
    flex: 1,
    fontSize: 13,
  },
});
