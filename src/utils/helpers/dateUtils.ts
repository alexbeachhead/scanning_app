/**
 * Utility functions for handling dates in Redux store (ISO strings)
 */

/**
 * Convert Date object to ISO string for Redux store
 */
export const dateToISOString = (date: Date): string => {
  return date.toISOString();
};

/**
 * Convert ISO string from Redux store to Date object
 */
export const isoStringToDate = (isoString: string): Date => {
  return new Date(isoString);
};

/**
 * Get current date as ISO string
 */
export const getCurrentDateISO = (): string => {
  return new Date().toISOString();
};

/**
 * Add days to an ISO date string and return new ISO string
 */
export const addDaysToISOString = (isoString: string, days: number): string => {
  const date = new Date(isoString);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

/**
 * Check if an ISO date string represents a date in the past
 */
export const isDateInPast = (isoString: string): boolean => {
  const date = new Date(isoString);
  const now = new Date();
  return date < now;
};

/**
 * Calculate days difference between two ISO date strings
 */
export const daysBetweenISOStrings = (startISO: string, endISO?: string): number => {
  const startDate = new Date(startISO);
  const endDate = endISO ? new Date(endISO) : new Date();

  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

/**
 * Format ISO string to display format (e.g., "Jan 15, 2024")
 */
export const formatISOStringToDisplay = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
