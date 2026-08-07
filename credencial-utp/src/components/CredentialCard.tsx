import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows } from '@/src/constants/theme';
import { Student } from '@/src/models/Student';
import { qrCodeContext } from '@/src/services/QRCodeStrategy';

type CredentialCardProps = {
  student: Student;
};

export function CredentialCard({ student }: CredentialCardProps) {
  const qrUrl = qrCodeContext.getCredentialQR(student.matricula);
  const validationUrl = qrCodeContext.getValidationUrl(student.matricula);

  return (
    <View style={styles.card}>
      <View style={styles.ribbon} />
      <View style={styles.waveOne} />
      <View style={styles.waveTwo} />
      <View style={styles.header}>
        <View>
          <Text style={styles.school}>Universidad Tecnologica de Puebla</Text>
          <Text style={styles.title}>Credencial Digital</Text>
        </View>
        <Text style={styles.badge}>UTP</Text>
      </View>

      <View style={styles.identity}>
        <View style={styles.photoFrame}>
          <Image
            source={student.fotoUrl ? { uri: student.fotoUrl } : require('@/assets/images/icon.png')}
            style={styles.photo}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{student.nombre}</Text>
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Text style={styles.label}>Matricula</Text>
              <Text style={styles.text}>{student.matricula}</Text>
            </View>
            <View style={styles.metaItemWide}>
              <Text style={styles.label}>Carrera</Text>
              <Text style={styles.text}>{student.carrera}</Text>
            </View>
            {student.cuatrimestre ? (
              <View style={styles.metaItem}>
                <Text style={styles.label}>Cuatrimestre</Text>
                <Text style={styles.text}>{student.cuatrimestre}</Text>
              </View>
            ) : null}
            {student.grupo ? (
              <View style={styles.metaItem}>
                <Text style={styles.label}>Grupo</Text>
                <Text style={styles.text}>{student.grupo}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.status}>{student.estadoAcademico}</Text>
        </View>
      </View>

      <View style={styles.qrRow}>
        <View style={styles.qrFrame}>
          <Image source={{ uri: qrUrl }} style={styles.qr} />
        </View>
        <View style={styles.qrCopy}>
          <Text style={styles.qrTitle}>Validacion de identidad</Text>
          <Text style={styles.qrText}>Escanea el codigo QR para consultar la validacion publica de esta credencial.</Text>
          <Text selectable style={styles.qrLink}>
            {validationUrl}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: 22,
    overflow: 'hidden',
    padding: 24,
    ...shadows.card,
  },
  ribbon: {
    backgroundColor: colors.primary,
    height: 9,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  waveOne: {
    backgroundColor: 'rgba(0,132,61,0.07)',
    borderRadius: 180,
    height: 210,
    position: 'absolute',
    right: -80,
    top: 120,
    width: 260,
    pointerEvents: 'none',
  },
  waveTwo: {
    backgroundColor: 'rgba(0,75,50,0.05)',
    borderRadius: 180,
    height: 160,
    position: 'absolute',
    right: -32,
    top: 168,
    width: 220,
    pointerEvents: 'none',
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingBottom: 16,
  },
  school: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  badge: {
    backgroundColor: colors.primaryDark,
    borderRadius: radii.md,
    color: colors.cardSolid,
    fontSize: 18,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  identity: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 22,
  },
  photoFrame: {
    backgroundColor: 'rgba(234,247,240,0.86)',
    borderColor: 'rgba(0,132,61,0.18)',
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: 8,
    ...shadows.soft,
  },
  photo: {
    backgroundColor: colors.primarySoft,
    borderRadius: radii.md,
    height: 126,
    width: 104,
  },
  info: {
    flex: 1,
    gap: 10,
    minWidth: 220,
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    minWidth: 120,
  },
  metaItemWide: {
    flex: 1,
    minWidth: 220,
  },
  label: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  text: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
  status: {
    alignSelf: 'flex-start',
    backgroundColor: colors.successSoft,
    borderRadius: radii.pill,
    color: colors.success,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  qrRow: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    paddingTop: 18,
  },
  qrFrame: {
    backgroundColor: colors.cardSolid,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: 10,
    ...shadows.soft,
  },
  qr: {
    height: 156,
    width: 156,
  },
  qrCopy: {
    flex: 1,
    gap: 6,
    minWidth: 220,
  },
  qrTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  qrText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  qrLink: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
});
