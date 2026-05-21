import { Utilisateur } from "../../auth/models/Utilisateur";
import { QualiteDocument } from "../../commun/models/QualiteDocument";
import { Region } from "../../commun/models/Region";
import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { Depot } from "../../gestion-dossiers-legacy/models/Depot";
import { FormalitePrealable } from "../../gestion-dossiers-legacy/models/FormalitePrealable";
import { TitreFoncier } from "../../titres-fonciers/models/TitreFoncier";
import { Opposition } from "../../gestion-dossiers-legacy/models/Opposition";
import { DonneeIndexation } from "./DonneeIndexation";
import { Dossier } from "./Dossier";
import { Fichier } from "./Fichier";
import { ProgressionTacheIndexation } from "./ProgressionTacheIndexation";
import { TacheIndexation } from "./TacheIndexation";
import { ActeRegistre } from "../../gestion-dossiers-legacy/models/ActeRegistre";
import { PartiePrenante } from "../../gestion-dossiers-legacy/models/PartiePrenante";

// Dossier - Dossier
Dossier.belongsTo(Dossier, { as: 'dossierParent', foreignKey: 'dossierParentId' })
Dossier.hasMany(Dossier, { as: 'sousDossiers', foreignKey: 'dossierParentId' })

// TypeRegistre - Dossier
TypeRegistre.hasMany(Dossier, { foreignKey: 'typeRegistreId' })
Dossier.belongsTo(TypeRegistre, { as: 'typeRegistre', foreignKey: 'typeRegistreId' })

// Dossier - Fichier
Dossier.hasMany(Fichier, { foreignKey: 'dossierId', as: 'fichiers' })
Fichier.belongsTo(Dossier, { as: 'dossier', foreignKey: 'dossierId' })

// TypeRegistre - Fichier
TypeRegistre.hasMany(Fichier, { foreignKey: 'typeRegistreId' })
Fichier.belongsTo(TypeRegistre, { as: 'typeRegistre', foreignKey: 'typeRegistreId' })

// Region - Fichier
Region.hasMany(Fichier, { foreignKey: 'regionId', as: 'fichiers' })
Fichier.belongsTo(Region, { as: 'region', foreignKey: 'regionId' })

// Fichier - TacheIndexation
TacheIndexation.belongsTo(Fichier, { as: 'fichier', foreignKey: 'fichierId' })
Fichier.hasOne(TacheIndexation, { foreignKey: 'fichierId', as: 'tacheIndexation' })

// (Indexeur)Utilisateur - TacheIndexation
Utilisateur.hasMany(TacheIndexation, { foreignKey: 'indexeurUtilisateurId' })
TacheIndexation.belongsTo(Utilisateur, { as: 'indexeurUtilisateur', foreignKey: 'indexeurUtilisateurId' })

// (Controleur)Utilisateur - TacheIndexation
Utilisateur.hasMany(TacheIndexation, { foreignKey: 'controleurUtilisateurId' })
TacheIndexation.belongsTo(Utilisateur, { as: 'controleurUtilisateur', foreignKey: 'controleurUtilisateurId' })

// TacheIndexation - ProgressionTacheIndexation
TacheIndexation.hasMany(ProgressionTacheIndexation, { foreignKey: 'tacheIndexationId', as: 'progressionsTacheIndexation' })
ProgressionTacheIndexation.belongsTo(TacheIndexation, { as: 'tacheIndexation', foreignKey: 'tacheIndexationId' })

// QualiteDocument - ProgressionTacheIndexation
QualiteDocument.hasMany(ProgressionTacheIndexation, { foreignKey: 'qualiteDocumentId' })
ProgressionTacheIndexation.belongsTo(QualiteDocument, { as: 'qualiteDocument', foreignKey: 'qualiteDocumentId' })

// // PersonnePhysique - PartiePrenante
// PersonnePhysique.belongsTo(PartiePrenante, { as: 'partiePrenante', foreignKey: 'partiePrenanteId' })
// PartiePrenante.hasOne(PersonnePhysique, { as: 'personnePhysique', foreignKey: 'partiePrenanteId' })

// Region - DonneeIndexation
Region.hasMany(DonneeIndexation, { foreignKey: 'regionId' })
DonneeIndexation.belongsTo(Region, { as: 'region', foreignKey: 'regionId' })

// TypeRegistre - DonneeIndexation
TypeRegistre.hasMany(DonneeIndexation, { foreignKey: 'typeRegistreId' })
DonneeIndexation.belongsTo(TypeRegistre, { as: 'typeRegistre', foreignKey: 'typeRegistreId' })

// ProgressionTacheIndexation - DonneeIndexation
DonneeIndexation.belongsTo(ProgressionTacheIndexation, { as: 'progressionTacheIndexation', foreignKey: 'progressionTacheIndexationId' })
ProgressionTacheIndexation.hasOne(DonneeIndexation, { foreignKey: 'progressionTacheIndexationId', as: 'donneeIndexation' })

// FormalitePrealable - DonneeIndexation
FormalitePrealable.hasMany(DonneeIndexation, { foreignKey: 'formalitePrealableId' })
DonneeIndexation.belongsTo(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'formalitePrealableId' })

// Depot - DonneeIndexation
Depot.hasMany(DonneeIndexation, { foreignKey: 'depotId' })
DonneeIndexation.belongsTo(Depot, { as: 'depot', foreignKey: 'depotId' })

// Opposition - DonneeIndexation
Opposition.hasMany(DonneeIndexation, { foreignKey: 'oppositionId' })
DonneeIndexation.belongsTo(Opposition, { as: 'opposition', foreignKey: 'oppositionId' })

// TitreFoncier - DonneeIndexation
TitreFoncier.hasMany(DonneeIndexation, { foreignKey: 'titreFoncierId' })
DonneeIndexation.belongsTo(TitreFoncier, { as: 'titreFoncier', foreignKey: 'titreFoncierId' })

// ActeRegistre - DonneeIndexation
ActeRegistre.hasMany(DonneeIndexation, { foreignKey: 'acteRegistreId' })
DonneeIndexation.belongsTo(ActeRegistre, { as: 'acteRegistre', foreignKey: 'acteRegistreId' })

// Legacy gpsDepot / gpsOpposition — requis pour les includes indexation (dépôts, oppositions)
if (!Depot.associations.partiesPrenantes) {
  Depot.hasMany(PartiePrenante, { foreignKey: 'depotId', as: 'partiesPrenantes' })
  PartiePrenante.belongsTo(Depot, { foreignKey: 'depotId' })
}
if (!Opposition.associations.partiesPrenantes) {
  Opposition.hasMany(PartiePrenante, { foreignKey: 'oppositionId', as: 'partiesPrenantes' })
  PartiePrenante.belongsTo(Opposition, { foreignKey: 'oppositionId' })
}
if (!FormalitePrealable.associations.partiesPrenantes) {
  FormalitePrealable.hasMany(PartiePrenante, { foreignKey: 'formalitePrealableId', as: 'partiesPrenantes' })
  PartiePrenante.belongsTo(FormalitePrealable, { foreignKey: 'formalitePrealableId' })
}

// Associations will be defined after all models are initialized
// in IndexationModule.ts after Model.init() calls
console.log('📋 Indexation associations configured (post-init)');
