import { Canton } from "./Canton";
import { Commune } from "./Commune";
import { Periode } from "./Periode";
import { Prefecture } from "./Prefecture";
import { Quartier } from "./Quartier";
import { Region } from "./Region";
import { Village } from "./Village";
import { Ville } from "./Ville";

// Periode - Region
Periode.hasMany(Region, { foreignKey: 'periodeId', as: 'regions' })
Region.belongsTo(Periode, { as: 'periode', foreignKey: 'periodeId' })

// Region - Prefecture
Region.hasMany(Prefecture, { foreignKey: 'regionId', as: 'prefectures' })
Prefecture.belongsTo(Region, { as: 'region', foreignKey: 'regionId' })

// Prefecture - Commune
Prefecture.hasMany(Commune, { foreignKey: 'prefectureId', as: 'communes' })
Commune.belongsTo(Prefecture, { as: 'prefecture', foreignKey: 'prefectureId' })

// Commune - Canton
Commune.hasMany(Canton, { foreignKey: 'communeId', as: 'cantons' })
Canton.belongsTo(Commune, { as: 'commune', foreignKey: 'communeId' })

// Canton - Village
Canton.hasMany(Village, { foreignKey: 'cantonId', as: 'villages' })
Village.belongsTo(Canton, { as: 'canton', foreignKey: 'cantonId' })

// Canton - Ville
Canton.hasMany(Ville, { foreignKey: 'cantonId', as: 'ville' })
Ville.belongsTo(Canton, { as: 'canton', foreignKey: 'cantonId' })

// Ville - Quartier
Ville.hasMany(Quartier, { foreignKey: 'villeId', as: 'quartiers' })
Quartier.belongsTo(Ville, { as: 'ville', foreignKey: 'villeId' })