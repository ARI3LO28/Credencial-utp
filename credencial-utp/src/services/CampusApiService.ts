import { AcademicEvent, CampusWeather, UniversityNews } from '@/src/models/Campus';

const UTP_LATITUDE = 19.0578;
const UTP_LONGITUDE = -98.1931;

function weatherLabel(code: number) {
  if ([0, 1].includes(code)) {
    return 'Despejado';
  }

  if ([2, 3].includes(code)) {
    return 'Parcialmente nublado';
  }

  if ([45, 48].includes(code)) {
    return 'Niebla';
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return 'Lluvia';
  }

  if ([95, 96, 99].includes(code)) {
    return 'Tormenta';
  }

  return 'Clima variable';
}

const fallbackEvents: AcademicEvent[] = [
  {
    id: 'reinscripcion-2026',
    title: 'Reinscripciones de cuatrimestre',
    date: '2026-08-12',
    category: 'Reinscripcion',
    description: 'Periodo sugerido para reinscripcion y actualizacion de datos academicos.',
  },
  {
    id: 'taller-web-2026',
    title: 'Taller de desarrollo web integral',
    date: '2026-08-20',
    category: 'Evento',
    description: 'Sesion practica sobre integracion de servicios web y Firebase.',
  },
  {
    id: 'examen-parcial-2026',
    title: 'Primer periodo de examenes',
    date: '2026-09-02',
    category: 'Examen',
    description: 'Aplicacion de evaluaciones parciales del cuatrimestre.',
  },
];

const fallbackNews: UniversityNews[] = [
  {
    id: 'becas-2026',
    title: 'Convocatoria de becas estudiantiles',
    date: '2026-07-15',
    source: 'Avisos academicos',
    summary: 'Consulta requisitos, fechas de registro y documentos para participar.',
  },
  {
    id: 'credencial-digital',
    title: 'Credencial digital para servicios universitarios',
    date: '2026-07-12',
    source: 'Servicios escolares',
    summary: 'La credencial permite validar identidad, biblioteca y beneficios institucionales.',
  },
  {
    id: 'actividades-institucionales',
    title: 'Actividades institucionales del mes',
    date: '2026-07-10',
    source: 'Vida universitaria',
    summary: 'Eventos, talleres y conferencias disponibles para la comunidad estudiantil.',
  },
];

export async function getCampusWeather(): Promise<CampusWeather> {
  const url = [
    'https://api.open-meteo.com/v1/forecast',
    `?latitude=${UTP_LATITUDE}`,
    `&longitude=${UTP_LONGITUDE}`,
    '&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code',
    '&hourly=precipitation_probability',
    '&forecast_days=1',
    '&timezone=America%2FMexico_City',
  ].join('');

  const response = await fetch(url);
  const payload = await response.json();
  const current = payload.current;

  return {
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: Math.round(current.apparent_temperature),
    humidity: Math.round(current.relative_humidity_2m),
    rainProbability: Math.round(payload.hourly?.precipitation_probability?.[0] ?? 0),
    condition: weatherLabel(current.weather_code),
  };
}

export async function getAcademicEvents(): Promise<AcademicEvent[]> {
  const year = new Date().getFullYear();
  const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/MX`);
  const holidays = await response.json();

  const publicHolidays: AcademicEvent[] = holidays.slice(0, 4).map((holiday: { date: string; localName: string }) => ({
    id: `holiday-${holiday.date}`,
    title: holiday.localName,
    date: holiday.date,
    category: 'Suspension',
    description: 'Dia inhabil oficial considerado para la planeacion academica.',
  }));

  return [...fallbackEvents, ...publicHolidays]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);
}

export async function getUniversityNews(): Promise<UniversityNews[]> {
  const query = encodeURIComponent('"Universidad Tecnologica de Puebla" OR becas OR convocatoria estudiantes Puebla');
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=ArtList&format=json&maxrecords=5&sort=DateDesc`;
  const response = await fetch(url);
  const payload = await response.json();

  if (!Array.isArray(payload.articles) || !payload.articles.length) {
    return fallbackNews;
  }

  return payload.articles.map((article: { title: string; seendate: string; domain: string; url: string }, index: number) => ({
    id: `news-${index}-${article.seendate}`,
    title: article.title,
    date: article.seendate?.slice(0, 8) ?? new Date().toISOString().slice(0, 10),
    source: article.domain ?? 'Avisos universitarios',
    summary: 'Aviso externo relacionado con actividades, convocatorias o informacion relevante para estudiantes.',
    url: article.url,
  }));
}

export async function getCampusDashboard() {
  const [weatherResult, eventsResult, newsResult] = await Promise.allSettled([
    getCampusWeather(),
    getAcademicEvents(),
    getUniversityNews(),
  ]);

  return {
    weather:
      weatherResult.status === 'fulfilled'
        ? weatherResult.value
        : {
            temperature: 21,
            apparentTemperature: 21,
            humidity: 60,
            rainProbability: 20,
            condition: 'Clima templado',
          },
    events: eventsResult.status === 'fulfilled' ? eventsResult.value : fallbackEvents,
    news: newsResult.status === 'fulfilled' ? newsResult.value : fallbackNews,
  };
}
