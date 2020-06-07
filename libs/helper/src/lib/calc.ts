import { Resources } from '@aquata/api-interfaces';

export const add = <T>(a: T, b: T): T => {
  const c = Object.assign({}, a);
  Object.keys(b).forEach(key => {
    if (c.hasOwnProperty(key)) {
      c[key] += b[key];
    } else {
      c[key] = b[key];
    }
  });

  return c;
};

export const substract = <T>(a: T, b: T): T => {
  const c = Object.assign({}, a);
  Object.keys(b).forEach(key => {
    if (c.hasOwnProperty(key)) {
      c[key] -= b[key];
    } else {
      c[key] = 0 - b[key];
    }
  });

  return c;
};

export const multiply = <T>(obj: T, multiplier: number): T => {
  const b = {};
  Object.keys(obj).forEach(key => {
    b[key] = obj[key] * multiplier;
  });

  return b as T;
};

export const isNegative = <T>(obj: T): boolean =>
  Object.values(obj).some(prop => prop < 0);
