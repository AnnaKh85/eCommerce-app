export interface Country {
  alpha2Code: string;
  name: string;
}

export const countries: Country[] = [
  { name: 'Belarus', alpha2Code: 'BY' },
  { name: 'Canada', alpha2Code: 'CA' },
  { name: 'Kazakhstan', alpha2Code: 'KZ' },
  { name: 'Russian Federation', alpha2Code: 'RU' },
  { name: 'Ukraine', alpha2Code: 'UA' },
  { name: 'United Arab Emirates', alpha2Code: 'AE' },
  { name: 'United States', alpha2Code: 'US' },
];
