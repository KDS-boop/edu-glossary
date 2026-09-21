const colors: Record<string, { bg: string; text: string }> = {
  'Software Development': { bg: '#dbeafe', text: '#1e40af' },
  'Blockchain': { bg: '#fce7f3', text: '#be185d' },
  'AI & Data': { bg: '#dcfce7', text: '#15803d' },
  'Cybersecurity': { bg: '#fef3c7', text: '#a16207' },
  'Cloud Computing': { bg: '#e0e7ff', text: '#4338ca' },
  'Technology': { bg: '#f3e8ff', text: '#7c3aed' },
};

export function getCategoryColor(category: string): { bg: string; text: string } {
  return colors[category] || { bg: '#eef1ff', text: '#3b5bdb' };
}
