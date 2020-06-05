import { Resources } from '@aquata/api-interfaces';

export const addResources = (r1: Partial<Resources>, r2: Partial<Resources>): Resources => ({
  aluminium: (r1.aluminium || 0) + (r2.aluminium || 0),
  steel: (r1.steel || 0) + (r2.steel || 0),
  plutonium: (r1.plutonium || 0) + (r2.plutonium || 0),
  energy: (r1.energy || 0) + (r2.energy || 0)
});

export const removeResources = (r1: Partial<Resources>, r2: Partial<Resources>): Resources =>
  addResources(r1, multiplyResources(r2, -1));

export const multiplyResources = (resources: Partial<Resources>, multiplier: number): Resources => ({
  aluminium: (resources.aluminium || 0) * multiplier,
  steel: (resources.steel || 0) * multiplier,
  plutonium: (resources.plutonium || 0) * multiplier,
  energy: (resources.energy || 0) * multiplier
});

export const resourcesNegative = (resources: Resources): boolean =>
  resources.aluminium < 0 ||
  resources.steel < 0 ||
  resources.plutonium < 0 ||
  resources.energy < 0;

export const enoughResources = (available: Resources, needed: Partial<Resources>): boolean =>
  !resourcesNegative(
    removeResources(available, needed)
  );
