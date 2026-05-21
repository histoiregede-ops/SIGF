import { DatabaseConnection } from '../../../core/helpers/DatabaseConnection';
import { NumeroTitreFoncierUtils } from '../../../core/helpers/NumeroTitreFoncierUtils';
import { Region } from '../../commun/models/Region';

import { TitreFoncierRepository } from '../repositories/TitreFoncierRepository';
import { CreateTitreFoncierDto } from '../validators/titreFoncier.schemas';

export class TitreFoncierService {
  static async getProchainNumeroTitreFoncier(regionId: string) {
    const region = await Region.findByPk(regionId);
    if (!region) return null;

    // Logic from legacy controller
    const where = {
      numeroPrefixe: region.sigle,
      numeroSuffixe: region.periode?.sigle,
    };
    const last = await TitreFoncierRepository.findAll({ where, order: [['numero', 'DESC']], limit: 1 });
    const numero = last.length ? last[0].numero + 1 : 1;
    return {
      numeroPrefixe: region.sigle,
      numero,
      numeroSuffixe: region.periode?.sigle,
    };
  }

  static async create(data: any, utilisateurId: string) {
    const transaction = await DatabaseConnection.getInstance().sequelize!.transaction();
    try {
      const createData = { ...data, utilisateurId };
      const titre = await TitreFoncierRepository.create(createData, transaction);
      await transaction.commit();
      return titre;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }


  // Other methods
}

