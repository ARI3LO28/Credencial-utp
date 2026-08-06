export type CampusWeather = {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  rainProbability: number;
  condition: string;
};

export type AcademicEvent = {
  id: string;
  title: string;
  date: string;
  category: 'Evento' | 'Convocatoria' | 'Suspension' | 'Examen' | 'Reinscripcion';
  description: string;
};

export type UniversityNews = {
  id: string;
  title: string;
  date: string;
  source: string;
  summary: string;
  url?: string;
};
