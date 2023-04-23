export const weekDays = [
  { en: "Sun", mm: "တနင်္ဂနွေ" },
  { en: "Mon", mm: "တနင်္လာ" },
  { en: "Tue", mm: "အင်္ဂါ" },
  { en: "Wed", mm: "ဗုဒ္ဓဟူး" },
  { en: "Thu", mm: "ကြာသပတေး" },
  { en: "Fri", mm: "သောကြာ" },
  { en: "Sat", mm: "စနေ" },
];

export const colors = {
  red: "rgb(230 80 80)",
  green: "rgb(251 191 36)",
  blue: "rgb(59 130 246)",
};

function serializer(key: string, value: unknown) {
  if (value instanceof Map) {
    return { __type: "Map", value: Object.fromEntries(value) };
  }
  return value;
}

function parser(key: string, value: unknown) {
  if (value && value["__type"] === "Map") {
    return new Map(Object.entries(value));
  }
  return value;
}

export const $Storage = {
  store: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value, serializer));
  },
  get: (key: string) => {
    return JSON.parse(localStorage.getItem(key), parser);
  },
};
