import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { ListCard } from '@/src/components/ListCard';
import { Screen } from '@/src/components/Screen';
import { useProtectedStudent } from '@/src/controllers/CredentialController';
import { AcademicNote } from '@/src/models/Student';
import { getNotes } from '@/src/services/StudentService';

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
      <Text style={styles.heading}>Notas academicas</Text>
      {loading ? <ActivityIndicator color="#1E3A8A" /> : null}
      {notes.map((note) => (
        <ListCard key={note.id} detail={`${note.parcial} - ${note.periodo}`} title={note.asignatura}>
          <Text style={styles.score}>{note.calificacion.toFixed(1)}</Text>
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
    color: '#1E3A8A',
    fontSize: 22,
    fontWeight: '900',
  },
});
