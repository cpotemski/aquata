import { MapCoordinates } from '@aquata/api-interfaces';

export const getMapDistance = (a: MapCoordinates, b: MapCoordinates) =>
  Math.ceil(
    Math.sqrt(
      Math.pow(Math.abs(a.x - b.x), 2) +
      Math.pow(Math.abs(a.y - b.y), 2)
    )
  );
