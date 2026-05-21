import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PartiePrenante } from "./PartiePrenante";
import { FormeJuridique } from "../../commun/models/FormeJuridique";
import { TypePersonneMorale } from "../../commun/models/TypePersonneMorale";
import { SecteurActivite } from "../../commun/models/SecteurActivite";
import { RepresentantPersonneMorale } from "./RepresentantPersonneMorale";
import { PieceIdentite } from "../../commun/models/PieceIdentite";

export class PersonneMorale extends Model<InferAttributes<PersonneMorale>, InferCreationAttributes<PersonneMorale>> {
  declare id: CreationOptional<string>
  declare raisonSocialeOuDenomination: CreationOptional<string>
  declare adresse: CreationOptional<string>
  declare telephone: CreationOptional<string>
  declare numeroPieceIdentite: CreationOptional<string>
  declare partiePrenanteId: ForeignKey<PartiePrenante['id']>
  declare partiePrenante?: NonAttribute<PartiePrenante>
  declare formeJuridiqueId: ForeignKey<FormeJuridique['id']>
  declare formeJuridique?: NonAttribute<FormeJuridique>
  declare secteurActiviteId: ForeignKey<SecteurActivite['id']>
  declare secteurActivite?: NonAttribute<SecteurActivite>
  declare typePersonneMoraleId: ForeignKey<TypePersonneMorale['id']>
  declare typePersonneMorale?: NonAttribute<TypePersonneMorale>
  declare pieceIdentiteId: ForeignKey<PieceIdentite['id']>
  declare pieceIdentite?: NonAttribute<PieceIdentite>
  declare representants?: NonAttribute<RepresentantPersonneMorale[]>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    partiePrenante: Association<PersonneMorale, PartiePrenante>,
    formeJuridique: Association<PersonneMorale, FormeJuridique>,
    secteurActivite: Association<PersonneMorale, SecteurActivite>,
    typePersonneMorale: Association<PersonneMorale, TypePersonneMorale>,
    pieceIdentite: Association<PersonneMorale, PieceIdentite>,
    representants: Association<PersonneMorale, RepresentantPersonneMorale>,
  }
}

PersonneMorale.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  raisonSocialeOuDenomination: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  adresse: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  telephone: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  numeroPieceIdentite: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize,
  paranoid: true,
  modelName: MODULE_MODEL_PREFIX + 'PersonneMorale',
  tableName: MODULE_TABLE_PREFIX + 'personnes_morales',
  timestamps: true
})