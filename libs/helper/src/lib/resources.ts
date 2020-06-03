import { Resources } from '@aquata/api-interfaces';

export const addResources = (r1: Resources, r2: Resources): Resources => ({
  aluminium: (r1.aluminium || 0) + (r2.aluminium || 0),
  steel: r1.steel + r2.steel,
  plutonium: r1.plutonium + r2.plutonium,
  energy: r1.energy + r2.energy
});

export const multiplyResources = (resources: Resources, multiplier: number): Resources => ({
  aluminium: resources.aluminium * multiplier,
  steel: resources.steel * multiplier,
  plutonium: resources.plutonium * multiplier,
  energy: resources.energy * multiplier
});

export const resourcesNegative = (resources: Resources): boolean =>
  resources.aluminium < 0 ||
  resources.steel < 0 ||
  resources.plutonium < 0 ||
  resources.energy < 0;
