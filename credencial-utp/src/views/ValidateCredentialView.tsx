import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { SectionHeader } from '@/src/components/SectionHeader';
import { colors, radii, shadows } from '@/src/constants/theme';
import { Student } from '@/src/models/Student';
import { getStudentByMatricula } from '@/src/services/StudentService';

export default function ValidateCredentialView() {
  const params = useLocalSearchParams<{ matricula?: string | string[] }>();
  const matricula = useMemo(() => {
    const value = Array.isArray(params.matricula) ? params.matricula[0] : params.matricula;
    return String(value ?? '').trim();
  }, [params.matricula]);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!matricula) {
      setError('No se recibio una matricula para validar.');
      setLoading(false);
      return;
    }

    getStudentByMatricula(matricula)
      .then((result) => {
        setStudent(result);
        setError(result ? '' : 'No existe una credencial registrada con esta matricula.');
      })
      .catch(() => {
        setError('No se pudo consultar la credencial. Revisa la conexion o las reglas de Firestore.');
      })
      .finally(() => setLoading(false));
  }, [matricula]);

  return (
    <Screen>
      <SectionHeader eyebrow="Validacion UTP" title="Credencial estudiantil" />

      {loading ? <ActivityIndicator color={colors.primary} /> : null}

      {!loading && !student ? (
        <View style={styles.card}>
          <Text style={styles.title}>Credencial no encontrada</Text>
          <Text style={styles.text}>{error}</Text>
          <AppButton label="Volver" onPress={() => router.back()} variant="secondary" />
        </View>
      ) : null}

      {student ? (
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <Text style={styles.status}>Validada</Text>
            <Text style={styles.school}>UTP</Text>
          </View>

          <View style={styles.identity}>
            <Image
              source={student.fotoUrl ? { uri: student.fotoUrl } : require('@/assets/images/icon.png')}
              style={styles.photo}
            />
            <View style={styles.identityText}>
              <Text style={styles.title}>{student.nombre}</Text>
              <Text style={styles.text}>Matricula {student.matricula}</Text>
              <Text style={styles.text}>{student.carrera}</Text>
            </View>
          </View>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Estado academico</Text>
              <Text style={styles.value}>{student.estadoAcademico}</Text>
            </View>
            {student.cuatrimestre ? (
              <View style={styles.detailItem}>
                <Text style={styles.label}>Cuatrimestre</Text>
                <Text style={styles.value}>{student.cuatrimestre}</Text>
              </View>
            ) : null}
            {student.grupo ? (
              <View style={styles.detailItem}>
                <Text style={styles.label}>Grupo</Text>
                <Text style={styles.value}>{student.grupo}</Text>
              </View>
            ) : null}
            <View style={styles.detailItem}>
              <Text style={styles.label}>Correo institucional</Text>
              <Text style={styles.value}>{student.correo}</Text>
            </View>
          </View>

          <Text style={styles.note}>Esta informacion se consulta directamente desde Firestore por matricula.</Text>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: 18,
    padding: 22,
    ...shadows.card,
  },
  statusRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    backgroundColor: colors.successSoft,
    borderRadius: radii.pill,
    color: colors.success,
    fontSize: 14,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  school: {
    color: colors.primary,
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '900',
  },
  identity: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  identityText: {
    flex: 1,
    gap: 6,
    minWidth: 220,
  },
  photo: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.cardSolid,
    borderRadius: radii.lg,
    borderWidth: 3,
    height: 118,
    width: 96,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
  },
  text: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  details: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingTop: 16,
  },
  detailItem: {
    backgroundColor: colors.cardSolid,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexGrow: 1,
    gap: 5,
    minWidth: 180,
    padding: 12,
  },
  label: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  value: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  note: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
});
