import { Resources } from '@aquata/api-interfaces';
import { isNegative, substract } from './calc';

export const enoughResources = (available: Resources, needed: Partial<Resources>): boolean =>
  !isNegative(
    substract(available, needed)
  );
