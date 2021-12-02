import { parse, stringify } from 'query-string';

export const parseQueryParams = (
  locationSearch: string = window.location.search
): Record<string, any> => (locationSearch ? parse(locationSearch) : (null as any));

export const buildSearchQueryParams = (params: { [key: string]: string | number; } = {}): string => {
  if (Object.keys(params).length === 0) return '';
  else return `?${stringify(params)}`;
};
