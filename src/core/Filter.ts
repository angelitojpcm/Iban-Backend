export function filter(data: any, allowedKeys: string[]): any {
  return Object.keys(data)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj: any, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
}
