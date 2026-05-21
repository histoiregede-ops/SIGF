import type { Includeable } from 'sequelize';
import { FormalitePrealable } from '../models/FormalitePrealable';

export const getFormalitePrealableIncludes = (): Includeable[] => {
  const includes: Includeable[] = [];
  const depotAssociation = (FormalitePrealable.associations as any).depot;

  if (depotAssociation) {
    includes.push({ association: depotAssociation });
  }

  if (FormalitePrealable.associations.partiesPrenantes) {
    includes.push({ association: FormalitePrealable.associations.partiesPrenantes });
  }

  return includes;
};

export const getFormalitePrealableGetIncludes = (): Includeable[] => {
  const depotAssociation = (FormalitePrealable.associations as any).depot;

  return depotAssociation ? [{ association: depotAssociation }] : [];
};

export const FORMALITE_PREALABLE_INCLUDES: Includeable[] = getFormalitePrealableIncludes();
export const GET_FORMALITE_PREALABLE_INCLUDES: Includeable[] = getFormalitePrealableGetIncludes();
