export const getDeepKeys = (obj: any) => {
  let keys = [] as any;
  for (var key in obj) {
    keys.push(key);
    if (typeof obj[key] === 'object') {
      var subkeys = getDeepKeys(obj[key]);
      keys = keys.concat(
        subkeys.map(function (subkey: string) {
          return key + '.' + subkey;
        })
      );
    }
  }
  return keys;
};

export const findPath = (obj: any, name: any, val: any, currentPath?: any): string => {
  currentPath = currentPath || '';

  let matchingPath;

  if (!obj || typeof obj !== 'object') return '';

  if (obj[name] === val) return `${currentPath}.${name}`;

  for (const key of Object.keys(obj)) {
    if (key === name && obj[key] === val) {
      matchingPath = currentPath;
    } else {
      matchingPath = findPath(obj[key], name, val, `${currentPath}.${key}`);
    }

    if (matchingPath) break;
  }

  return matchingPath;
};
