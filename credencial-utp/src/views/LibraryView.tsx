import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { ListCard } from '@/src/components/ListCard';
import { Screen } from '@/src/components/Screen';
import { SectionHeader } from '@/src/components/SectionHeader';
import { colors } from '@/src/constants/theme';
import { useProtectedStudent } from '@/src/controllers/CredentialController';
import { LibraryLoan } from '@/src/models/Student';
import { getLibraryLoans } from '@/src/services/StudentService';

export default function LibraryView() {
  const { student } = useProtectedStudent();
  const [loans, setLoans] = useState<LibraryLoan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student) {
      return;
    }

    getLibraryLoans(student.matricula).then(setLoans).finally(() => setLoading(false));
  }, [student]);

  return (
    <Screen>
      <SectionHeader eyebrow="Servicios escolares" title="Prestamos de biblioteca" />
      {loading ? <ActivityIndicator color={colors.primary} /> : null}
      {!loading && loans.length === 0 ? (
        <ListCard detail="Agrega documentos en alumnos/{matricula}/biblioteca para mostrar prestamos." title="Sin prestamos registrados" />
      ) : null}
      {loans.map((loan) => (
        <ListCard key={loan.id} detail={`${loan.fechaPrestamo} a ${loan.fechaDevolucion}`} title={loan.titulo}>
          <Text style={styles.status}>{loan.estado}</Text>
        </ListCard>
      ))}
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
  status: {
    color: colors.success,
    fontSize: 16,
    fontWeight: '800',
  },
});
