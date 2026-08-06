import { router } from 'expo-router';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

import { ActionTile } from '@/src/components/ActionTile';
import { AppButton } from '@/src/components/AppButton';
import { CampusDashboard } from '@/src/components/CampusDashboard';
import { CredentialCard } from '@/src/components/CredentialCard';
import { Screen } from '@/src/components/Screen';
import { SectionHeader } from '@/src/components/SectionHeader';
import { colors, radii, shadows } from '@/src/constants/theme';
import { useProtectedStudent } from '@/src/controllers/CredentialController';
import { privateRoutes } from '@/src/navigation/routes';

export default function CredentialView() {
  const { loading, signOut, student, studentError, user } = useProtectedStudent();

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator color={colors.primary} />
      </Screen>
    );
  }

  if (!student) {
    return (
      <Screen>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No encontramos tu registro de alumno</Text>
          <Text style={styles.emptyText}>
            {studentError ||
              `Iniciaste sesion como ${user?.email ?? 'usuario autenticado'}, pero no hay un documento relacionado en Firestore.`}
          </Text>
          <AppButton icon="logout-variant" label="Salir" onPress={signOut} variant="danger" />
        </View>
      </Screen>
    );
  }

  const firstName = student.nombre.trim().split(/\s+/)[0] || 'alumno';

  return (
    <Screen>
      <View style={styles.portalBar}>
        <View style={styles.logoGroup}>
          <Text style={styles.logoText}>UTP</Text>
          <Text style={styles.logoLabel}>Universidad Tecnologica de Puebla</Text>
        </View>
        <View style={styles.accountMini}>
          <Image
            source={student.fotoUrl ? { uri: student.fotoUrl } : require('@/assets/images/icon.png')}
            style={styles.avatarSmall}
          />
          <Text style={styles.accountText}>Alumno</Text>
        </View>
      </View>

      <View style={styles.top}>
        <View>
          <Text style={styles.eyebrow}>Portal estudiantil</Text>
          <Text style={styles.heading}>Hola, {firstName}</Text>
          <Text style={styles.subheading}>Accede a tus servicios y recursos academicos</Text>
        </View>
        <View style={styles.headerActions}>
          <Image
            source={student.fotoUrl ? { uri: student.fotoUrl } : require('@/assets/images/icon.png')}
            style={styles.avatar}
          />
          <AppButton icon="logout-variant" label="Salir" onPress={signOut} variant="danger" />
        </View>
      </View>

      <CredentialCard student={student} />

      <SectionHeader eyebrow="Servicios" title="Accesos rapidos" />
      <View style={styles.grid}>
        <ActionTile
          detail="Calificaciones por parcial"
          icon="clipboard-text-outline"
          label="Notas academicas"
          onPress={() => router.push(privateRoutes.notes)}
        />
        <ActionTile
          detail="Prestamos y devoluciones"
          icon="book-open-page-variant-outline"
          label="Biblioteca"
          onPress={() => router.push(privateRoutes.library)}
        />
        <ActionTile
          detail="Descuentos vigentes"
          icon="ticket-percent-outline"
          label="Beneficios"
          onPress={() => router.push(privateRoutes.benefits)}
        />
        <ActionTile
          detail="Foto institucional"
          icon="account-box-outline"
          label="Actualizar foto"
          onPress={() => router.push(privateRoutes.profilePhoto)}
        />
      </View>

      <SectionHeader eyebrow="Campus" title="Informacion para estudiantes" />
      <CampusDashboard />
    </Screen>
  );
}

const styles = StyleSheet.create({
  portalBar: {
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginHorizontal: -20,
    marginTop: -20,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  logoGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  logoText: {
    color: colors.cardSolid,
    fontSize: 32,
    fontStyle: 'italic',
    fontWeight: '900',
  },
  logoLabel: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 12,
    fontWeight: '900',
    maxWidth: 180,
    textTransform: 'uppercase',
  },
  accountMini: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  avatarSmall: {
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
    height: 34,
    width: 34,
  },
  accountText: {
    color: colors.cardSolid,
    fontSize: 14,
    fontWeight: '900',
  },
  top: {
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingTop: 18,
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatar: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.cardSolid,
    borderRadius: radii.pill,
    borderWidth: 3,
    height: 58,
    width: 58,
    ...shadows.soft,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  heading: {
    color: colors.text,
    fontSize: 38,
    fontWeight: '900',
  },
  subheading: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: 14,
    padding: 22,
    ...shadows.card,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
});
