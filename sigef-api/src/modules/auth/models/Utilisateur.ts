import { 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  DataTypes 
} from "sequelize";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { Profil } from './Profil';
import { CentreConservationFonciere } from './CentreConservationFonciere';

export class Utilisateur extends Model<InferAttributes<Utilisateur>, InferCreationAttributes<Utilisateur>> {
    declare id: CreationOptional<number>;
    declare nom: string;
    declare prenoms: string;
    declare identifiant: string;
    declare matricule?: string;
    declare email: string;
    declare motDePasse: string;
    declare contact?: string;
    declare actif: boolean;
    
    declare profilId: number;
    declare profil?: Profil;
    
    declare centreConservationFonciereId?: number;
    declare centreConservationFonciere?: CentreConservationFonciere;

    declare photoDeProfil?: string;
    declare dateVerificationEmail?: Date | null;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

Utilisateur.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prenoms: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  identifiant: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  matricule: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  motDePasse: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  profilId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'aut_profils',
      key: 'id'
    }
  },
  centreConservationFonciereId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: 'aut_centres_conservation_fonciere',
      key: 'id'
    }
  },
  photoDeProfil: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  dateVerificationEmail: {
    type: DataTypes.DATE,
    allowNull: true
  },
  actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: DatabaseConnection.getInstance().sequelize!,
  paranoid: true,
  tableName: 'aut_utilisateurs',
  timestamps: true
});

