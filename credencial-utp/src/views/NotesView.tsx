import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { ListCard } from '@/src/components/ListCard';
import { Screen } from '@/src/components/Screen';
import { SectionHeader } from '@/src/components/SectionHeader';
import { colors } from '@/src/constants/theme';
import { useProtectedStudent } from '@/src/controllers/CredentialController';
import { AcademicNote } from '@/src/models/Student';
import { getNotes } from '@/src/services/StudentService';

function formatScore(score: number) {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}

export default function NotesView() {
  const { student } = useProtectedStudent();
  const [notes, setNotes] = useState<AcademicNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student) {
      return;
    }

    getNotes(student.matricula).then(setNotes).finally(() => setLoading(false));
  }, [student]);

  return (
    <Screen>
      <SectionHeader eyebrow="Historial academico" title="Notas academicas" />
      {loading ? <ActivityIndicator color={colors.primary} /> : null}
      {!loading && notes.length === 0 ? (
        <ListCard detail="Agrega documentos en alumnos/{matricula}/notas para mostrar calificaciones." title="Sin notas registradas" />
      ) : null}
      {notes.map((note) => (
        <ListCard
          key={note.id}
          detail={[note.parcial, note.periodo, note.profesor ? `Profesor: ${note.profesor}` : '']
            .filter(Boolean)
            .join(' - ')}
          title={note.asignatura}
        >
          <Text style={styles.score}>{formatScore(note.calificacion)}</Text>
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
  score: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '900',
  },
});
