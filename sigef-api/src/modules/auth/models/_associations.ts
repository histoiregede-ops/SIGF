import { Region } from "../../commun/models/Region";
import { CentreConservationFonciere } from "./CentreConservationFonciere";
import { Profil } from "./Profil";
import { Role } from "./Role";
import { RoleProfil } from "./RoleProfil";
import { Utilisateur } from "./Utilisateur";

// Profil - Role
Role.belongsToMany(Profil, { through: RoleProfil, as: 'profils', foreignKey: 'roleId' })
Profil.belongsToMany(Role, { through: RoleProfil, as: 'roles', foreignKey: 'profilId' })
RoleProfil.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
RoleProfil.belongsTo(Profil, { foreignKey: 'profilId', as: 'profil' });

// Profil - Utilisateur
Profil.hasMany(Utilisateur, { foreignKey: 'profilId', as: 'utilisateurs' })
Utilisateur.belongsTo(Profil, { as: 'profil', foreignKey: 'profilId' })

// CentreConservationFonciere - Utilisateur
CentreConservationFonciere.hasMany(Utilisateur, { foreignKey: 'centreConservationFonciereId', as: 'utilisateurs' })
Utilisateur.belongsTo(CentreConservationFonciere, { as: 'centreConservationFonciere', foreignKey: 'centreConservationFonciereId' })

// Region - CentreConservationFonciere
Region.hasMany(CentreConservationFonciere, { foreignKey: 'regionId', as: 'centresConservationFonciere' })
CentreConservationFonciere.belongsTo(Region, { as: 'region', foreignKey: 'regionId' })

