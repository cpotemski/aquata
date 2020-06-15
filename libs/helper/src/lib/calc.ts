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

export const multiplyAndCeil = <T>(obj: T, multiplier: number): T => multiply(obj, multiplier, Math.ceil);


export const multiply = <T>(obj: T, multiplier: number, roundingFunction?: (number) => number): T => {
  const b = {};
  Object.keys(obj).forEach(key => {
    if (roundingFunction) {
      b[key] = roundingFunction(obj[key] * multiplier);
    } else {
      b[key] = obj[key] * multiplier;
    }
  });

  return b as T;
};

export const isNegative = <T>(obj: T): boolean =>
  Object.values(obj).some(prop => prop < 0);
