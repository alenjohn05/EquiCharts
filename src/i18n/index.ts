import enUS from './en-US.json';

const locales = {
  'en-US': enUS,
};

export function load(key: string, ls: any) {
  // @ts-expect-error
  locales[key] = ls;
}

export default (key: string, locale: string) => {
  // @ts-expect-error
  return locales[locale]?.[key] ?? key;
};
