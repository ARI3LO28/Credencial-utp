import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { ListCard } from '@/src/components/ListCard';
import { Screen } from '@/src/components/Screen';
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
      <Text style={styles.heading}>Prestamos de biblioteca</Text>
      {loading ? <ActivityIndicator color="#1E3A8A" /> : null}
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
    color: '#12643A',
    fontSize: 16,
    fontWeight: '800',
  },
});
