import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { ListCard } from '@/src/components/ListCard';
import { Screen } from '@/src/components/Screen';
import { useProtectedStudent } from '@/src/controllers/CredentialController';
import { StudentBenefit } from '@/src/models/Student';
import { getBenefits } from '@/src/services/StudentService';

export default function BenefitsView() {
  const { student } = useProtectedStudent();
  const [benefits, setBenefits] = useState<StudentBenefit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student) {
      return;
    }

    getBenefits(student.matricula).then(setBenefits).finally(() => setLoading(false));
  }, [student]);

  return (
    <Screen>
      <Text style={styles.heading}>Beneficios estudiantiles</Text>
      {loading ? <ActivityIndicator color="#1E3A8A" /> : null}
      {benefits.map((benefit) => (
        <ListCard key={benefit.id} detail={benefit.descripcion} title={benefit.nombre}>
          <Text style={styles.discount}>{benefit.descuento}</Text>
          <Text style={styles.validity}>Vigencia {benefit.vigencia}</Text>
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
  discount: {
    color: '#1E3A8A',
    fontSize: 22,
    fontWeight: '900',
  },
  validity: {
    color: '#5B6472',
    fontSize: 13,
  },
});
