import type { Includeable } from 'sequelize';
import { Opposition } from '../models/Opposition';

export const getOppositionIncludes = (): Includeable[] => {
  const includes: Includeable[] = [];

  if (Opposition.associations.partiesPrenantes) {
    includes.push({ association: Opposition.associations.partiesPrenantes });
  }

  if (Opposition.associations.oppositionsRequisitions) {
    includes.push(Opposition.associations.oppositionsRequisitions);
  }

  return includes;
};

export const getOppositionGetIncludes = (): Includeable[] => getOppositionIncludes();

export const OPPOSITION_INCLUDES: Includeable[] = getOppositionIncludes();
export const GET_OPPOSITION_INCLUDES: Includeable[] = getOppositionGetIncludes();
