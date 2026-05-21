import { Application } from 'express';
import depotRoutes from './routes';
import { Depot } from './models/Depot';
import { DepotPartiePrenante } from './models/PartiePrenante';

export const MODULE_TABLE_PREFIX = 'dp_';
export const MODULE_MODEL_PREFIX = 'Depots';

export default class DepotsModule {
  static async initModels() {

    const models = [
      Depot,
      DepotPartiePrenante
    ];

    await Promise.all(models.map(model => model.sync({ alter: true })));
    console.log('Depots models synced');
  }

  static registerRoutes(app: Application) {
    app.use('/api/v1/depots', depotRoutes);
  }
}
