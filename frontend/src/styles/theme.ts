// frontend/src/styles/theme.ts
import { colors } from './colors';

export const theme = {
  colors,

  // Espacements simples
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // Bordures
  borderRadius: {
    small: 8,
    medium: 12,
    large: 20,
    round: 50,
  },

  // Typographie simple
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: 'bold' as const,
      color: colors.textPrimary,
    },
    h2: {
      fontSize: 22,
      fontWeight: '600' as const,
      color: colors.primaryDark,
    },
    body: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    caption: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  },
};
