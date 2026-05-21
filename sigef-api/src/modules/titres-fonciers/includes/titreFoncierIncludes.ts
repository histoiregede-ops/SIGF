import type { Includeable } from 'sequelize';
import { Augmentation } from '../models/Augmentation';
import { Diminution } from '../models/Diminution';
import { DroitReelConstitue } from '../models/DroitReelConstitue';
import { CauseIndisponibilite } from '../models/CauseIndisponibilite';
import { Mutation } from '../models/Mutation';
import { PrivilegeHypotheque } from '../models/PrivilegeHypotheque';

export const TITRE_FONCIER_INCLUDES: Includeable[] = [
  { model: Augmentation, as: 'augmentations' },
  { model: Diminution, as: 'diminutions' },
  { model: DroitReelConstitue, as: 'droitsReels' },
  { model: CauseIndisponibilite, as: 'causesIndisponibilite' },
  { model: Mutation, as: 'mutations' },
  { model: PrivilegeHypotheque, as: 'privilegesHypotheques' },
];

export const GET_TITRE_FONCIER_INCLUDES: Includeable[] = TITRE_FONCIER_INCLUDES.slice(0, 2);

export const getTitreFoncierIncludes = () => TITRE_FONCIER_INCLUDES;
