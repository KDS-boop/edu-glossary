export interface CategoryColor {
  bg: string;
  text: string;
  darkBg: string;
  darkText: string;
}

const colors: Record<string, CategoryColor> = {
  'Software Development': {
    bg: '#dbeafe',
    text: '#1e40af',
    darkBg: 'rgba(30, 58, 138, 0.45)',
    darkText: '#93c5fd',
  },
  'Blockchain': {
    bg: '#fce7f3',
    text: '#9d174d',
    darkBg: 'rgba(157, 23, 77, 0.45)',
    darkText: '#f472b6',
  },
  'AI & Data': {
    bg: '#dcfce7',
    text: '#166534',
    darkBg: 'rgba(22, 101, 52, 0.45)',
    darkText: '#86efac',
  },
  'Cybersecurity': {
    bg: '#fef3c7',
    text: '#854d0e',
    darkBg: 'rgba(133, 77, 14, 0.45)',
    darkText: '#fde047',
  },
  'Cloud Computing': {
    bg: '#e0e7ff',
    text: '#3730a3',
    darkBg: 'rgba(55, 48, 163, 0.45)',
    darkText: '#a5b4fc',
  },
  'Technology': {
    bg: '#f3e8ff',
    text: '#6b21a8',
    darkBg: 'rgba(107, 33, 168, 0.45)',
    darkText: '#d8b4fe',
  },
};

export function getCategoryColor(category: string): CategoryColor {
  return colors[category] || {
    bg: '#eef1ff',
    text: '#1d4ed8',
    darkBg: 'rgba(29, 78, 216, 0.45)',
    darkText: '#93c5fd',
  };
}
