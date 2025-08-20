import { AvailableLocale, Resources } from './types';
import { enResources } from './resources/en-US';
import { heResources } from './resources/he-IL';
import { esResources } from './resources/es-ES'; 
// Import other language resources

// Map of all resources by locale
const resourcesMap: Record<AvailableLocale, Resources> = {
    'en-US': enResources,
    'he-IL': heResources,
    'es-ES': esResources,
};

// Default locale as fallback
const DEFAULT_LOCALE: AvailableLocale = 'en-US';

/**
 * Get resources for a specific locale
 */
export function getResources(locale: string): Resources {
  // Validate the locale is one we support
  const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  return resourcesMap[validLocale];
}

/**
 * Type guard to check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is AvailableLocale {
  return Object.keys(resourcesMap).includes(locale as AvailableLocale);
}