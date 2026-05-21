import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { MODULE_MODEL_PREFIX, MODULE_TABLE_PREFIX } from "../GestionDossiersModule";
import { PartiePrenante } from "./PartiePrenante";
import { Civilite } from "../../commun/models/Civilite";
import { Nationalite } from "../../commun/models/Nationalite";
import { Profession } from "../../commun/models/Profession";
import { RepresentantPersonnePhysique } from "./RepresentantPersonnePhysique";
import { PieceIdentite } from "../../commun/models/PieceIdentite";

export class PersonnePhysique extends Model<InferAttributes<PersonnePhysique>, InferCreationAttributes<PersonnePhysique>> {
  declare id: CreationOptional<string>
  declare nom: CreationOptional<string>
  declare prenoms: CreationOptional<string>
  declare telephone: CreationOptional<string>
  declare adresseDomicile: CreationOptional<string>
  declare adresseResidence: CreationOptional<string>
  declare anneeNaissance: CreationOptional<number>
  declare dateNaissance: CreationOptional<Date>
  declare lieuNaissance: CreationOptional<string>
  declare nif: CreationOptional<string>
  declare vivant: CreationOptional<boolean>
  declare nomEpoux: CreationOptional<string>
  declare nomJeuneFille: CreationOptional<string>
  declare numeroPieceIdentite: CreationOptional<string>

  declare civiliteId: ForeignKey<Civilite['id']>
  declare civilite?: NonAttribute<Civilite>
  declare nationaliteId: ForeignKey<Nationalite['id']>
  declare nationalite?: NonAttribute<Nationalite>
  declare professionId: ForeignKey<Profession['id']>
  declare profession?: NonAttribute<Profession>
  declare pieceIdentiteId: ForeignKey<PieceIdentite['id']>
  declare pieceIdentite?: NonAttribute<PieceIdentite>
  declare partiePrenanteId: ForeignKey<PartiePrenante['id']>
  declare partiePrenante?: NonAttribute<PartiePrenante>
  declare representants?: NonAttribute<RepresentantPersonnePhysique[]>

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  declare static associations: {
    civilite: Association<PersonnePhysique, Civilite>,
    nationalite: Association<PersonnePhysique, Nationalite>,
    profession: Association<PersonnePhysique, Profession>,
    pieceIdentite: Association<PersonnePhysique, PieceIdentite>,
    partiePrenante: Association<PersonnePhysique, PartiePrenante>,
    representants: Association<PersonnePhysique, RepresentantPersonnePhysique>,
  }
}

PersonnePhysique.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  nom: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  prenoms: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  telephone: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  adresseDomicile: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  adresseResidence: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  anneeNaissance: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  dateNaissance: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  lieuNaissance: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  nif: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  vivant: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  nomEpoux: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  nomJeuneFille: {
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
  modelName: MODULE_MODEL_PREFIX + 'PersonnePhysique',
  tableName: MODULE_TABLE_PREFIX + 'personnes_physiques',
  timestamps: true
})