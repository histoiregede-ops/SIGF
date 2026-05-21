import type { Includeable } from 'sequelize';
import { Depot } from '../models/Depot';

export const getDepotIncludes = (): Includeable[] => {
  const includes: Includeable[] = [];

  if (Depot.associations.partiesPrenantes) {
    includes.push({ association: Depot.associations.partiesPrenantes });
  }

  if (Depot.associations.titreFoncier) {
    includes.push(Depot.associations.titreFoncier);
  }

  return includes;
};

export const getDepotGetIncludes = (): Includeable[] => {
  const includes: Includeable[] = [];

  if (Depot.associations.partiesPrenantes) {
    includes.push({ association: Depot.associations.partiesPrenantes });
  }

  return includes;
};

export const DEPOT_INCLUDES: Includeable[] = getDepotIncludes();
export const GET_DEPOT_INCLUDES: Includeable[] = getDepotGetIncludes();
