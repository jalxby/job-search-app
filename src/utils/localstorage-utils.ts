export const loadStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return undefined;
    }
    return JSON.parse(item);
  } catch (e) {}
};

export const saveToStorage = <T>(key: string, value: T) => {
  try {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  } catch (e) {}
};
