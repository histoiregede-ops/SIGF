import { Application } from 'express';
import './models/_associations';
import oppositionRoutes from './routes';
import { Opposition } from './models/Opposition';
import { OppositionPartiePrenante } from './models/PartiePrenante';
import { OppositionRequisition } from './models/OppositionRequisition';

export const MODULE_TABLE_PREFIX = 'op_';
export const MODULE_MODEL_PREFIX = 'Oppositions';

export default class OppositionsModule {
  static async initModels() {

    const models = [
      Opposition,
      OppositionPartiePrenante,
      OppositionRequisition
    ];

    await Promise.all(models.map(model => model.sync({ alter: true })));
    console.log('Oppositions models synced');
  }

  static registerRoutes(app: Application) {
    app.use('/api/v1/oppositions', oppositionRoutes);
  }
}
