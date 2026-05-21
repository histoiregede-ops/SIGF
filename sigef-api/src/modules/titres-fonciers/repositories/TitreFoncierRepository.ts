import { Transaction } from 'sequelize';
import { TitreFoncier } from '../models/TitreFoncier';

export class TitreFoncierRepository {
  static async findById(id: string) {
    return TitreFoncier.findByPk(id);
  }

  static async findAll(options: any = {}) {
    return TitreFoncier.findAll(options);
  }

  static async count(options: any = {}) {
    return TitreFoncier.count(options);
  }

  static async create(data: any, transaction?: Transaction) {
    return TitreFoncier.create(data, { transaction });
  }

  static async update(id: string, data: any, transaction?: Transaction) {
    const titre = await TitreFoncierRepository.findById(id);
    if (titre) {
      return titre.update(data, { transaction });
    }
    return null;
  }

  static async delete(id: string) {
    const titre = await TitreFoncierRepository.findById(id);
    if (titre) {
      return titre.destroy();
    }
    return false;
  }

}

