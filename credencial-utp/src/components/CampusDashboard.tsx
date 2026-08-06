import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows } from '@/src/constants/theme';
import { AcademicEvent, CampusWeather, UniversityNews } from '@/src/models/Campus';
import { getCampusDashboard } from '@/src/services/CampusApiService';

type CampusDashboardState = {
  weather: CampusWeather;
  events: AcademicEvent[];
  news: UniversityNews[];
};

function formatDate(value: string) {
  if (/^\d{8}$/.test(value)) {
    return `${value.slice(6, 8)}/${value.slice(4, 6)}/${value.slice(0, 4)}`;
  }

  return value;
}

export function CampusDashboard() {
  const [dashboard, setDashboard] = useState<CampusDashboardState | null>(null);

  useEffect(() => {
    getCampusDashboard().then(setDashboard);
  }, []);

  if (!dashboard) {
    return (
      <View style={styles.loadingCard}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.loadingText}>Cargando servicios universitarios</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.weatherCard}>
        <View style={styles.weatherTop}>
          <View>
            <Text style={styles.eyebrow}>Clima del campus</Text>
            <Text style={styles.weatherTitle}>{dashboard.weather.condition}</Text>
          </View>
          <MaterialCommunityIcons color={colors.primary} name="weather-partly-cloudy" size={34} />
        </View>
        <View style={styles.weatherStats}>
          <Text style={styles.temperature}>{dashboard.weather.temperature}°C</Text>
          <View style={styles.statGroup}>
            <Text style={styles.stat}>Sensacion {dashboard.weather.apparentTemperature}°C</Text>
            <Text style={styles.stat}>Humedad {dashboard.weather.humidity}%</Text>
            <Text style={styles.stat}>Lluvia {dashboard.weather.rainProbability}%</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Calendario academico</Text>
      <View style={styles.cardList}>
        {dashboard.events.map((event) => (
          <View key={event.id} style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.badge}>{event.category}</Text>
              <Text style={styles.date}>{formatDate(event.date)}</Text>
            </View>
            <Text style={styles.infoTitle}>{event.title}</Text>
            <Text style={styles.infoText}>{event.description}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Noticias y avisos</Text>
      <View style={styles.cardList}>
        {dashboard.news.map((news) => (
          <View key={news.id} style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.source}>{news.source}</Text>
              <Text style={styles.date}>{formatDate(news.date)}</Text>
            </View>
            <Text style={styles.infoTitle}>{news.title}</Text>
            <Text style={styles.infoText}>{news.summary}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  loadingCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  loadingText: {
    color: colors.muted,
    fontWeight: '700',
  },
  weatherCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: 14,
    padding: 18,
    ...shadows.card,
  },
  weatherTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  weatherTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  weatherStats: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
  },
  temperature: {
    color: colors.primaryDark,
    fontSize: 42,
    fontWeight: '900',
  },
  statGroup: {
    flex: 1,
    gap: 4,
  },
  stat: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 6,
  },
  cardList: {
    gap: 10,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: 8,
    padding: 14,
    ...shadows.soft,
  },
  infoHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: colors.primarySoft,
    borderRadius: radii.sm,
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: '900',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  source: {
    color: colors.primary,
    flex: 1,
    fontSize: 12,
    fontWeight: '900',
  },
  date: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  infoTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  infoText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
});
