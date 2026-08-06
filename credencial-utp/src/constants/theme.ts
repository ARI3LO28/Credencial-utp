export const colors = {
  primary: '#00843D',
  primaryDark: '#004B32',
  primaryDeep: '#003B2D',
  primarySoft: '#EAF7F0',
  primaryMist: 'rgba(0, 132, 61, 0.12)',
  accent: '#D4A574',
  background: '#EDF8F2',
  card: 'rgba(255, 255, 255, 0.92)',
  cardSolid: '#FFFFFF',
  border: 'rgba(0, 75, 50, 0.10)',
  text: '#0E2820',
  muted: '#60736B',
  danger: '#B42318',
  dangerSoft: '#FFFFFF',
  success: '#12643A',
  successSoft: '#E0F6EA',
  shadow: '#06442E',
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 24,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 5,
  },
  soft: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
};
