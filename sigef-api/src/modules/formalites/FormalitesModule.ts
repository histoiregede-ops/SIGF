import { Application } from 'express';
import formaliteRoutes from './routes';
import { FormalitePrealable } from './models/FormalitePrealable';

export const MODULE_TABLE_PREFIX = 'fr_';
export const MODULE_MODEL_PREFIX = 'Formalites';

export default class FormalitesModule {
  static async initModels() {

    const models = [
      FormalitePrealable
    ];

    await Promise.all(models.map(model => model.sync({ alter: true })));
    console.log('Formalites models synced');
  }

  static registerRoutes(app: Application) {
    app.use('/api/v1/formalites', formaliteRoutes);
  }
}
