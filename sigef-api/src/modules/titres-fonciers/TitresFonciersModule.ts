import { Application } from 'express';
import titreFoncierRoutes from './routes';
import { TitreFoncier } from './models/TitreFoncier';
import { Augmentation } from './models/Augmentation';
import { Diminution } from './models/Diminution';
import { DroitReelConstitue } from './models/DroitReelConstitue';
import { CauseIndisponibilite } from './models/CauseIndisponibilite';
import { Mutation } from './models/Mutation';
import { PrivilegeHypotheque } from './models/PrivilegeHypotheque';

export const MODULE_TABLE_PREFIX = 'tf_';
export const MODULE_MODEL_PREFIX = 'TitresFonciers';

export default class TitresFonciersModule {
  static async initModels() {

    const models = [
      TitreFoncier,
      Augmentation,
      Diminution,
      DroitReelConstitue,
      CauseIndisponibilite,
      Mutation,
      PrivilegeHypotheque
    ];

    await Promise.all(models.map(model => model.sync({ alter: true })));
    console.log('TitresFonciers models synced');
  }

  static registerRoutes(app: Application) {
    app.use('/api/v1/titres-fonciers', titreFoncierRoutes);
  }
}

