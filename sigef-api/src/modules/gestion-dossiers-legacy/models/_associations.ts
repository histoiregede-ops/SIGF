import { FormalitePrealable } from "./FormalitePrealable";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { InformationsPropriete } from "./InformationsPropriete";
import { SituationPropriete } from "./SituationPropriete";
import { Bornage } from "./Bornage";
import { ProcedureJudiciaire } from "./ProcedureJudiciaire";
import { PublicationDemandes } from "./PublicationDemandes";
import { PartiePrenante } from "./PartiePrenante";
import { PersonneMorale } from "./PersonneMorale";
import { PersonnePhysique } from "./PersonnePhysique";
import { PersonneRelationLegale } from "./PersonneRelationLegale";
import { PieceDeposee } from "./PieceDeposee";
import { Opposition } from "./Opposition";
import { TypeDepot } from "./TypeDepot";
import { Depot } from "./Depot";
import { FormeJuridique } from "../../commun/models/FormeJuridique";
import { Region } from "../../commun/models/Region";
import { Prefecture } from "../../commun/models/Prefecture";
import { Commune } from "../../commun/models/Commune";
import { Quartier } from "../../commun/models/Quartier";
import { Canton } from "../../commun/models/Canton";
import { TypePersonneMorale } from "../../commun/models/TypePersonneMorale";
import { TypeOperationPostImmatriculation } from "./TypeOperationPostImmatriculation";
import { DepotTitreFoncier } from "./DepotTitreFoncier";
import { TypeRelationLegale } from "../../commun/models/TypeRelationLegale";
import { OppositionRequisition } from "./OppositionRequisition";
import { DirectionLimite } from "./DirectionLimite";
import { Limite } from "./Limite";
import { TitreFoncier } from "./TitreFoncier";
import { Augmentation } from "./Augmentation";
import { Diminution } from "./Diminution";
import { ModeAcquisition } from "./ModeAcquisition";
import { ModeAlienation } from "./ModeAlienation";
import { Civilite } from "../../commun/models/Civilite";
import { Nationalite } from "../../commun/models/Nationalite";
import { Profession } from "../../commun/models/Profession";
import { SecteurActivite } from "../../commun/models/SecteurActivite";
import { PersonneCible } from "./PersonneCible";
import { GroupePersonnePhysique } from "./GroupePersonnePhysique";
import { GroupeConjoints } from "./GroupeConjoints";
import { GroupeHeritiers } from "./GroupeHeritiers";
import { PersonneMembre } from "./PersonneMembre";
import { TypeLienGroupe } from "../../commun/models/TypeLienGroupe";
import { PersonneConjointe } from "./PersonneConjointe";
import { PersonneHeritiere } from "./PersonneHeritiere";
import { ConjointPersonneDisposant } from "./ConjointPersonneDisposant";
import { PersonneDisposant } from "./PersonneDisposant";
import { DroitReelConstitueParDenombrement } from "./DroitReelConstitueParDenombrement";
import { PrivilegeHypotheque } from "./PrivilegeHypotheque";
import { CauseIndisponibilite } from "./CauseIndisponibilite";
import { OppositionCasInscriptionDifferee } from "./OppositionCasInscriptionDifferee";
import { Mutation } from "./Mutation";
import { RepresentantPersonneMorale } from "./RepresentantPersonneMorale";
import { RepresentantPersonnePhysique } from "./RepresentantPersonnePhysique";
import { Village } from "../../commun/models/Village";
import { Ville } from "../../commun/models/Ville";
import { NatureTypeImmeuble } from "./NatureTypeImmeuble";
import { NatureEtatImmeuble } from "./NatureEtatImmeuble";
import { SituationFiscale } from "./SituationFiscale";
import { DivisionEnVolume } from "./DivisionEnVolume";
import { DivisionEnLot } from "./DivisionEnLot";
import { DossierRegistre } from "./DossierRegistre";
import { TypeRegistre } from "../../commun/models/TypeRegistre";
import { CentreConservationFonciere } from "../../auth/models/CentreConservationFonciere";
import { ActeRegistre } from "./ActeRegistre";
import { DemandeTransfert } from "./DemandeTransfert";
import { DemandeTransfertActeRegistre } from "./DemandeTransfertActeRegistre";
import { DemandeEtatDescriptif } from "./DemandeEtatDescriptif";
import { BordereauAnalytique } from "./BordereauAnalytique";
import { Requisition } from "./Requisition";

// FormalitePrealable - Utilisateur
FormalitePrealable.belongsTo(Utilisateur, { as: 'utilisateur', foreignKey: 'utilisateurId' })
Utilisateur.hasMany(FormalitePrealable, { as: 'formalitesPrealable', foreignKey: 'utilisateurId' })

// PieceDeposee - FormalitePrealable
FormalitePrealable.hasMany(PieceDeposee, { foreignKey: 'formalitePrealableId', as: 'piecesDeposees' })
PieceDeposee.belongsTo(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'formalitePrealableId' })

// PartiePrenante - FormalitePrealable
if (!FormalitePrealable.associations.partiesPrenantes) {
  FormalitePrealable.hasMany(PartiePrenante, { foreignKey: 'formalitePrealableId', as: 'partiesPrenantes' })
}
PartiePrenante.belongsTo(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'formalitePrealableId' })

// InformationsPropriete - FormalitePrealable
InformationsPropriete.belongsTo(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'formalitePrealableId' })
FormalitePrealable.hasOne(InformationsPropriete, { as: 'informationsPropriete', foreignKey: 'formalitePrealableId' })

// NatureTypeImmeuble - InformationsPropriete
NatureTypeImmeuble.hasMany(InformationsPropriete, { foreignKey: 'natureTypeImmeubleId' })
InformationsPropriete.belongsTo(NatureTypeImmeuble, { as: 'natureTypeImmeuble', foreignKey: 'natureTypeImmeubleId' })

// NatureEtatImmeuble - InformationsPropriete
NatureEtatImmeuble.hasMany(InformationsPropriete, { foreignKey: 'natureEtatImmeubleId' })
InformationsPropriete.belongsTo(NatureEtatImmeuble, { as: 'natureEtatImmeuble', foreignKey: 'natureEtatImmeubleId' })

// SituationPropriete - FormalitePrealable
SituationPropriete.belongsTo(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'formalitePrealableId' })
FormalitePrealable.hasOne(SituationPropriete, { as: 'situationPropriete', foreignKey: 'formalitePrealableId' })

// Region - SituationPropriete
Region.hasMany(SituationPropriete, { foreignKey: 'regionId' })
SituationPropriete.belongsTo(Region, { as: 'region', foreignKey: 'regionId' })

// Prefecture - SituationPropriete
Prefecture.hasMany(SituationPropriete, { foreignKey: 'prefectureId' })
SituationPropriete.belongsTo(Prefecture, { as: 'prefecture', foreignKey: 'prefectureId' })

// Commune - SituationPropriete
Commune.hasMany(SituationPropriete, { foreignKey: 'communeId' })
SituationPropriete.belongsTo(Commune, { as: 'commune', foreignKey: 'communeId' })

// Village - SituationPropriete
Village.hasMany(SituationPropriete, { foreignKey: 'villageId' })
SituationPropriete.belongsTo(Village, { as: 'village', foreignKey: 'villageId' })

// Ville - SituationPropriete
Ville.hasMany(SituationPropriete, { foreignKey: 'villeId' })
SituationPropriete.belongsTo(Ville, { as: 'ville', foreignKey: 'villeId' })

// Canton - SituationPropriete
Canton.hasMany(SituationPropriete, { foreignKey: 'cantonId' })
SituationPropriete.belongsTo(Canton, { as: 'canton', foreignKey: 'cantonId' })

// Quartier - SituationPropriete
Quartier.hasMany(SituationPropriete, { foreignKey: 'quartierId' })
SituationPropriete.belongsTo(Quartier, { as: 'quartier', foreignKey: 'quartierId' })

// PublicationDemandes - FormalitePrealable
PublicationDemandes.belongsTo(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'formalitePrealableId' })
FormalitePrealable.hasOne(PublicationDemandes, { as: 'publicationDemandes', foreignKey: 'formalitePrealableId' })

// Bornage - FormalitePrealable
Bornage.belongsTo(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'formalitePrealableId' })
FormalitePrealable.hasOne(Bornage, { as: 'bornage', foreignKey: 'formalitePrealableId' })

// ProcedureJudiciaire - FormalitePrealable
ProcedureJudiciaire.belongsTo(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'formalitePrealableId' })
FormalitePrealable.hasOne(ProcedureJudiciaire, { as: 'procedureJudiciaire', foreignKey: 'formalitePrealableId' })

// Civilite - PersonnePhysique
Civilite.hasMany(PersonnePhysique, { foreignKey: 'civiliteId' })
PersonnePhysique.belongsTo(Civilite, { as: 'civilite', foreignKey: 'civiliteId' })

// Nationalite - PersonnePhysique
Nationalite.hasMany(PersonnePhysique, { foreignKey: 'nationaliteId' })
PersonnePhysique.belongsTo(Nationalite, { as: 'nationalite', foreignKey: 'nationaliteId' })

// Profession - PersonnePhysique
Profession.hasMany(PersonnePhysique, { foreignKey: 'professionId' })
PersonnePhysique.belongsTo(Profession, { as: 'profession', foreignKey: 'professionId' })

// PersonnePhysique - PartiePrenante
PersonnePhysique.belongsTo(PartiePrenante, { as: 'partiePrenante', foreignKey: 'partiePrenanteId' })
PartiePrenante.hasOne(PersonnePhysique, { as: 'personnePhysique', foreignKey: 'partiePrenanteId' })

// PersonnePhysique - RepresentantPersonnePhysique
PersonnePhysique.hasMany(RepresentantPersonnePhysique, { as: 'representants', foreignKey: 'personnePhysiqueId' })
RepresentantPersonnePhysique.belongsTo(PersonnePhysique, { as: 'personnePhysique', foreignKey: 'personnePhysiqueId' })

// RepresentantPersonnePhysique - PersonnePhysique
RepresentantPersonnePhysique.belongsTo(PersonnePhysique, { as: 'representant', foreignKey: 'representantId' })
PersonnePhysique.hasOne(RepresentantPersonnePhysique, { foreignKey: 'representantId' })

// PersonneMorale - PartiePrenante
PersonneMorale.belongsTo(PartiePrenante, { as: 'partiePrenante', foreignKey: 'partiePrenanteId' })
PartiePrenante.hasOne(PersonneMorale, { as: 'personneMorale', foreignKey: 'partiePrenanteId' })

// PersonneMorale - RepresentantPersonneMorale
PersonneMorale.hasMany(RepresentantPersonneMorale, { as: 'representants', foreignKey: 'personneMoraleId' })
RepresentantPersonneMorale.belongsTo(PersonneMorale, { as: 'personneMorale', foreignKey: 'personneMoraleId' })

// RepresentantPersonneMorale - PersonnePhysique
RepresentantPersonneMorale.belongsTo(PersonnePhysique, { as: 'representant', foreignKey: 'representantId' })
PersonnePhysique.hasOne(RepresentantPersonneMorale, { foreignKey: 'representantId' })

// FormeJuridique - PersonneMorale
FormeJuridique.hasMany(PersonneMorale, { foreignKey: 'formeJuridiqueId' })
PersonneMorale.belongsTo(FormeJuridique, { as: 'formeJuridique', foreignKey: 'formeJuridiqueId' })

// SecteurActivite - PersonneMorale
SecteurActivite.hasMany(PersonneMorale, { foreignKey: 'secteurActiviteId' })
PersonneMorale.belongsTo(SecteurActivite, { as: 'secteurActivite', foreignKey: 'secteurActiviteId' })

// TypePersonneMorale - PersonneMorale
TypePersonneMorale.hasMany(PersonneMorale, { foreignKey: 'typePersonneMoraleId' })
PersonneMorale.belongsTo(TypePersonneMorale, { as: 'typePersonneMorale', foreignKey: 'typePersonneMoraleId' })

// PersonneRelationLegale - PartiePrenante
PersonneRelationLegale.belongsTo(PartiePrenante, { as: 'partiePrenante', foreignKey: 'partiePrenanteId' })
PartiePrenante.hasOne(PersonneRelationLegale, { as: 'personneRelationLegale', foreignKey: 'partiePrenanteId' })

// TypeRelationLegale - PersonneRelationLegale
TypeRelationLegale.hasMany(PersonneRelationLegale, { foreignKey: 'typeRelationLegaleId' })
PersonneRelationLegale.belongsTo(TypeRelationLegale, { as: 'typeRelationLegale', foreignKey: 'typeRelationLegaleId' })

// PersonneRelationLegale - PersonneCible
PersonneCible.belongsTo(PersonneRelationLegale, { as: 'personneRelationLegale', foreignKey: 'personneRelationLegaleId' })
PersonneRelationLegale.hasOne(PersonneCible, { as: 'personneCible', foreignKey: 'personneRelationLegaleId' })

// PersonneCible - PersonnePhysique
PersonneCible.belongsTo(PersonnePhysique, { as: 'personnePhysique', foreignKey: 'personnePhysiqueId' })
PersonnePhysique.hasOne(PersonneCible, { foreignKey: 'personnePhysiqueId' })

// GroupePersonnePhysique - PartiePrenante
GroupePersonnePhysique.belongsTo(PartiePrenante, { as: 'partiePrenante', foreignKey: 'partiePrenanteId' })
PartiePrenante.hasOne(GroupePersonnePhysique, { as: 'groupePersonnePhysique', foreignKey: 'partiePrenanteId' })

// TypeLienGroupe - GroupePersonnePhysique
TypeLienGroupe.hasMany(GroupePersonnePhysique, { foreignKey: 'typeLienGroupeId' })
GroupePersonnePhysique.belongsTo(TypeLienGroupe, { as: 'typeLienGroupe', foreignKey: 'typeLienGroupeId' })

// GroupePersonnePhysique - PersonneMembre
GroupePersonnePhysique.hasMany(PersonneMembre, { foreignKey: 'groupePersonnePhysiqueId', as: 'personnesMembres' })
PersonneMembre.belongsTo(GroupePersonnePhysique, { as: 'groupePersonnePhysique', foreignKey: 'groupePersonnePhysiqueId' })

// PersonneMembre - PersonnePhysique
PersonneMembre.belongsTo(PersonnePhysique, { as: 'personnePhysique', foreignKey: 'personnePhysiqueId' })
PersonnePhysique.hasOne(PersonneMembre, { foreignKey: 'personnePhysiqueId' })

// GroupeConjoints - PartiePrenante
GroupeConjoints.belongsTo(PartiePrenante, { as: 'partiePrenante', foreignKey: 'partiePrenanteId' })
PartiePrenante.hasOne(GroupeConjoints, { as: 'groupeConjoints', foreignKey: 'partiePrenanteId' })

// GroupeConjoints - PersonneConjointe
GroupeConjoints.hasMany(PersonneConjointe, { foreignKey: 'groupeConjointsId', as: 'personnesConjointes' })
PersonneConjointe.belongsTo(GroupeConjoints, { as: 'groupeConjoints', foreignKey: 'groupeConjointsId' })

// PersonneConjointe - PersonnePhysique
PersonneConjointe.belongsTo(PersonnePhysique, { as: 'personnePhysique', foreignKey: 'personnePhysiqueId' })
PersonnePhysique.hasOne(PersonneConjointe, { foreignKey: 'personnePhysiqueId' })

// GroupeHeritiers - PartiePrenante
GroupeHeritiers.belongsTo(PartiePrenante, { as: 'partiePrenante', foreignKey: 'partiePrenanteId' })
PartiePrenante.hasOne(GroupeHeritiers, { as: 'groupeHeritiers', foreignKey: 'partiePrenanteId' })

// GroupeHeritiers - PersonneDisposant
PersonneDisposant.belongsTo(GroupeHeritiers, { as: 'groupeHeritiers', foreignKey: 'groupeHeritiersId' })
GroupeHeritiers.hasOne(PersonneDisposant, { as: 'personneDisposant', foreignKey: 'groupeHeritiersId' })

// PersonneDisposant - PersonnePhysique
PersonneDisposant.belongsTo(PersonnePhysique, { as: 'personnePhysique', foreignKey: 'personnePhysiqueId' })
PersonnePhysique.hasOne(PersonneDisposant, { foreignKey: 'personnePhysiqueId' })

// GroupeHeritiers - ConjointPersonneDisposant
GroupeHeritiers.hasMany(ConjointPersonneDisposant, { foreignKey: 'groupeHeritiersId', as: 'conjointsPersonneDisposant' })
ConjointPersonneDisposant.belongsTo(GroupeHeritiers, { as: 'groupeHeritiers', foreignKey: 'groupeHeritiersId' })

// ConjointPersonneDisposant - PersonnePhysique
ConjointPersonneDisposant.belongsTo(PersonnePhysique, { as: 'personnePhysique', foreignKey: 'personnePhysiqueId' })
PersonnePhysique.hasOne(ConjointPersonneDisposant, { foreignKey: 'personnePhysiqueId' })

// ConjointPersonneDisposant - PersonneHeritiere
ConjointPersonneDisposant.hasMany(PersonneHeritiere, { foreignKey: 'conjointPersonneDisposantId', as: 'personnesHeritieres' })
PersonneHeritiere.belongsTo(ConjointPersonneDisposant, { as: 'conjointPersonneDisposant', foreignKey: 'conjointPersonneDisposantId' })

// PersonneHeritiere - PersonnePhysique
PersonneHeritiere.belongsTo(PersonnePhysique, { as: 'personnePhysique', foreignKey: 'personnePhysiqueId' })
PersonnePhysique.hasOne(PersonneHeritiere, { foreignKey: 'personnePhysiqueId' })

// Opposition - Utilisateur
Opposition.belongsTo(Utilisateur, { as: 'utilisateur', foreignKey: 'utilisateurId' })
Utilisateur.hasMany(Opposition, { as: 'oppositions', foreignKey: 'utilisateurId' })

// PartiePrenante - Opposition
if (!Opposition.associations.partiesPrenantes) {
  Opposition.hasMany(PartiePrenante, { foreignKey: 'oppositionId', as: 'partiesPrenantes' })
}
PartiePrenante.belongsTo(Opposition, { as: 'opposition', foreignKey: 'oppositionId' })

// PieceDeposee - Opposition
Opposition.hasMany(PieceDeposee, { foreignKey: 'oppositionId', as: 'piecesDeposees' })
PieceDeposee.belongsTo(Opposition, { as: 'opposition', foreignKey: 'oppositionId' })

// OppositionRequisition - Opposition
Opposition.hasMany(OppositionRequisition, { foreignKey: 'oppositionId', as: 'oppositionsRequisitions' })
OppositionRequisition.belongsTo(Opposition, { foreignKey: 'oppositionId' })

// Depot - Utilisateur
Depot.belongsTo(Utilisateur, { as: 'utilisateur', foreignKey: 'utilisateurId' })
Utilisateur.hasMany(Depot, { as: 'depots', foreignKey: 'utilisateurId' })

// PartiePrenante - Depot
if (!Depot.associations.partiesPrenantes) {
  Depot.hasMany(PartiePrenante, { foreignKey: 'depotId', as: 'partiesPrenantes' })
}
PartiePrenante.belongsTo(Depot, { as: 'depot', foreignKey: 'depotId' })

// PieceDeposee - Depot
Depot.hasMany(PieceDeposee, { foreignKey: 'depotId', as: 'piecesDeposees' })
PieceDeposee.belongsTo(Depot, { as: 'depot', foreignKey: 'depotId' })

// Depot - TypeDepot
Depot.belongsTo(TypeDepot, { as: 'typeDepot', foreignKey: 'typeDepotId' })
TypeDepot.hasMany(Depot, { foreignKey: 'typeDepotId' })

// Depot - TypeOperationPostImmatriculation
Depot.belongsTo(TypeOperationPostImmatriculation, { as: 'typeOperationPostImmatriculation', foreignKey: 'typeOperationPostImmatriculationId' })
TypeOperationPostImmatriculation.hasMany(Depot, { foreignKey: 'typeOperationPostImmatriculationId' })

// DepotTitreFoncier - Depot
Depot.hasMany(DepotTitreFoncier, { foreignKey: 'depotId', as: 'depotsTitresFonciers' })
DepotTitreFoncier.belongsTo(Depot, { foreignKey: 'depotId' })

// Depot - FormalitePrealable
Depot.belongsTo(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'formalitePrealableId' })
FormalitePrealable.hasOne(Depot, { as: 'depot', foreignKey: 'formalitePrealableId' })

// Depot - TitreFoncier
Depot.belongsTo(TitreFoncier, { as: 'titreFoncier', foreignKey: 'titreFoncierId' })
TitreFoncier.hasOne(Depot, { as: 'depot', foreignKey: 'titreFoncierId' })

// SituationPropriete - TitreFoncier
SituationPropriete.belongsTo(TitreFoncier, { as: 'titreFoncier', foreignKey: 'titreFoncierId' })
TitreFoncier.hasOne(SituationPropriete, { as: 'situationPropriete', foreignKey: 'titreFoncierId' })

// Limite - DirectionLimite
DirectionLimite.hasMany(Limite, { foreignKey: 'directionLimiteId' })
Limite.belongsTo(DirectionLimite, { foreignKey: 'directionLimiteId', as: 'directionLimite' })

// TitreFoncier - Limite
TitreFoncier.hasMany(Limite, { foreignKey: 'titreFoncierId', as: 'limitesTitreFoncier' })
Limite.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// TitreFoncier - Augmentation
TitreFoncier.hasMany(Augmentation, { foreignKey: 'titreFoncierId', as: 'augmentations' })
Augmentation.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// ModeAcquisition - Augmentation
ModeAcquisition.hasMany(Augmentation, { foreignKey: 'modeAcquisitionId' })
Augmentation.belongsTo(ModeAcquisition, { foreignKey: 'modeAcquisitionId', as: 'modeAcquisition' })

// TitreFoncier - Diminution
TitreFoncier.hasMany(Diminution, { foreignKey: 'titreFoncierId', as: 'diminutions' })
Diminution.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// ModeAlienation - Diminution
ModeAlienation.hasMany(Diminution, { foreignKey: 'modeAlienationId' })
Diminution.belongsTo(ModeAlienation, { foreignKey: 'modeAlienationId', as: 'modeAlienation' })

// TitreFoncier - DroitReelConstitueParDenombrement
TitreFoncier.hasMany(DroitReelConstitueParDenombrement, { foreignKey: 'titreFoncierId', as: 'droitsReelsConstituesParDenombrement' })
DroitReelConstitueParDenombrement.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// TitreFoncier - PrivilegeHypotheque
TitreFoncier.hasMany(PrivilegeHypotheque, { foreignKey: 'titreFoncierId', as: 'privilegesHypotheques' })
PrivilegeHypotheque.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// TitreFoncier - CauseIndisponibilite
TitreFoncier.hasMany(CauseIndisponibilite, { foreignKey: 'titreFoncierId', as: 'causesIndisponibilite' })
CauseIndisponibilite.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// TitreFoncier - OppositionCasInscriptionDifferee
TitreFoncier.hasMany(OppositionCasInscriptionDifferee, { foreignKey: 'titreFoncierId', as: 'oppositionsCasInscriptionDifferee' })
OppositionCasInscriptionDifferee.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// TitreFoncier - Mutation
TitreFoncier.hasMany(Mutation, { foreignKey: 'titreFoncierId', as: 'mutations' })
Mutation.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// ModeAcquisition - Mutation
ModeAcquisition.hasMany(Mutation, { foreignKey: 'modeAcquisitionId' })
Mutation.belongsTo(ModeAcquisition, { foreignKey: 'modeAcquisitionId', as: 'modeAcquisition' })

// PartiePrenante - Mutation
Mutation.hasMany(PartiePrenante, { foreignKey: 'mutationId', as: 'partiesPrenantes' })
PartiePrenante.belongsTo(Mutation, { as: 'mutation', foreignKey: 'mutationId' })

// TitreFoncier - SituationFiscale
TitreFoncier.hasMany(SituationFiscale, { foreignKey: 'titreFoncierId', as: 'situationsFiscales' })
SituationFiscale.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// TitreFoncier - DivisionEnVolume
TitreFoncier.hasMany(DivisionEnVolume, { foreignKey: 'titreFoncierId', as: 'divisionsEnVolumes' })
DivisionEnVolume.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// ModeAlienation - DivisionEnVolume
ModeAlienation.hasMany(DivisionEnVolume, { foreignKey: 'modeAlienationId' })
DivisionEnVolume.belongsTo(ModeAlienation, { foreignKey: 'modeAlienationId', as: 'modeAlienation' })

// TitreFoncier - DivisionEnLot
TitreFoncier.hasMany(DivisionEnLot, { foreignKey: 'titreFoncierId', as: 'divisionsEnLots' })
DivisionEnLot.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// ModeAlienation - DivisionEnLot
ModeAlienation.hasMany(DivisionEnLot, { foreignKey: 'modeAlienationId' })
DivisionEnLot.belongsTo(ModeAlienation, { foreignKey: 'modeAlienationId', as: 'modeAlienation' })

// TitreFoncier - BordereauAnalytique
TitreFoncier.hasMany(BordereauAnalytique, { foreignKey: 'titreFoncierId', as: 'bordereauxAnalytiques' })
BordereauAnalytique.belongsTo(TitreFoncier, { foreignKey: 'titreFoncierId', as: 'titreFoncier' })

// Requisition - BordereauAnalytique
Requisition.hasMany(BordereauAnalytique, { foreignKey: 'requisitionId', as: 'bordereauxAnalytiques' })
BordereauAnalytique.belongsTo(Requisition, { foreignKey: 'requisitionId', as: 'requisition' })


// DossierRegistre - DossierRegistre
DossierRegistre.belongsTo(DossierRegistre, { as: 'dossierRegistreParent', foreignKey: 'dossierRegistreParentId' })
DossierRegistre.hasMany(DossierRegistre, { as: 'sousDossiersRegistres', foreignKey: 'dossierRegistreParentId' })

// TypeRegistre - DossierRegistre
TypeRegistre.hasMany(DossierRegistre, { foreignKey: 'typeRegistreId' })
DossierRegistre.belongsTo(TypeRegistre, { as: 'typeRegistre', foreignKey: 'typeRegistreId' })

// Region - DossierRegistre
Region.hasMany(DossierRegistre, { foreignKey: 'regionId' })
DossierRegistre.belongsTo(Region, { as: 'region', foreignKey: 'regionId' })

// CentreConservationFonciere - DossierRegistre
CentreConservationFonciere.hasMany(DossierRegistre, { foreignKey: 'centreConservationFonciereId', as: 'dossiersRegistres' })
DossierRegistre.belongsTo(CentreConservationFonciere, { as: 'centreConservationFonciere', foreignKey: 'centreConservationFonciereId' })

// TypeRegistre - ActeRegistre
TypeRegistre.hasMany(ActeRegistre, { foreignKey: 'typeRegistreId' })
ActeRegistre.belongsTo(TypeRegistre, { as: 'typeRegistre', foreignKey: 'typeRegistreId' })

// Region - ActeRegistre
Region.hasMany(ActeRegistre, { foreignKey: 'regionId' })
ActeRegistre.belongsTo(Region, { as: 'region', foreignKey: 'regionId' })

// CentreConservationFonciere - ActeRegistre
CentreConservationFonciere.hasMany(ActeRegistre, { foreignKey: 'centreConservationFonciereId', as: 'actesRegistres' })
ActeRegistre.belongsTo(CentreConservationFonciere, { as: 'centreConservationFonciere', foreignKey: 'centreConservationFonciereId' })

// DossierRegistre - ActeRegistre
DossierRegistre.hasMany(ActeRegistre, { foreignKey: 'dossierRegistreId', as: 'actesRegistres' })
ActeRegistre.belongsTo(DossierRegistre, { as: 'dossierRegistre', foreignKey: 'dossierRegistreId' })

// FormalitePrealable - ActeRegistre
FormalitePrealable.belongsTo(ActeRegistre, { as: 'acteRegistre', foreignKey: 'acteRegistreId' })
ActeRegistre.hasOne(FormalitePrealable, { as: 'formalitePrealable', foreignKey: 'acteRegistreId' })

// Depot - ActeRegistre
Depot.belongsTo(ActeRegistre, { as: 'acteRegistre', foreignKey: 'acteRegistreId' })
ActeRegistre.hasOne(Depot, { as: 'depot', foreignKey: 'acteRegistreId' })

// Opposition - ActeRegistre
Opposition.belongsTo(ActeRegistre, { as: 'acteRegistre', foreignKey: 'acteRegistreId' })
ActeRegistre.hasOne(Opposition, { as: 'opposition', foreignKey: 'acteRegistreId' })

// TitreFoncier - ActeRegistre
TitreFoncier.belongsTo(ActeRegistre, { as: 'acteRegistre', foreignKey: 'acteRegistreId' })
ActeRegistre.hasOne(TitreFoncier, { as: 'titreFoncier', foreignKey: 'acteRegistreId' })

// CentreConservationFonciere - DemandeTransfert
CentreConservationFonciere.hasMany(DemandeTransfert, { foreignKey: 'centreConservationFonciereId', as: 'demmandesTransferts' })
DemandeTransfert.belongsTo(CentreConservationFonciere, { as: 'centreConservationFonciere', foreignKey: 'centreConservationFonciereId' })

// TypeRegistre - DemandeTransfert
TypeRegistre.hasMany(DemandeTransfert, { foreignKey: 'typeRegistreId' })
DemandeTransfert.belongsTo(TypeRegistre, { as: 'typeRegistre', foreignKey: 'typeRegistreId' })

// DemandeTransfert - Utilisateur(Demande)
Utilisateur.hasMany(DemandeTransfert, {foreignKey: 'utilisateurDemandeId'})
DemandeTransfert.belongsTo(Utilisateur, { as: 'utilisateurDemande', foreignKey: 'utilisateurDemandeId' })

// DemandeTransfert - Utilisateur(Traitement)
Utilisateur.hasMany(DemandeTransfert, {foreignKey: 'utilisateurTraitementId'})
DemandeTransfert.belongsTo(Utilisateur, { as: 'utilisateurTraitement', foreignKey: 'utilisateurTraitementId' })

// DemandeTransfert - DemandeTransfertActeRegistre
DemandeTransfert.hasMany(DemandeTransfertActeRegistre, {foreignKey: 'demandeTransfertId', as: 'demandeTransfertActesRegistres'})
DemandeTransfertActeRegistre.belongsTo(DemandeTransfert, { as: 'demandeTransfert', foreignKey: 'demandeTransfertId' })

// CentreConservationFonciere - DemandeTransfertActeRegistre
CentreConservationFonciere.hasMany(DemandeTransfertActeRegistre, { foreignKey: 'centreSourceId' })
DemandeTransfertActeRegistre.belongsTo(CentreConservationFonciere, { as: 'centreSource', foreignKey: 'centreSourceId' })

// ActeRegistre - DemandeTransfertActeRegistre
ActeRegistre.hasMany(DemandeTransfertActeRegistre, { foreignKey: 'acteRegistreId' })
DemandeTransfertActeRegistre.belongsTo(ActeRegistre, { as: 'acteRegistre', foreignKey: 'acteRegistreId' })

// Utilisateur(Creation) - ActeRegistre
Utilisateur.hasMany(ActeRegistre, { foreignKey: 'utilisateurCreationId' })
ActeRegistre.belongsTo(Utilisateur, { as: 'utilisateurCreation', foreignKey: 'utilisateurCreationId' })

// Utilisateur(Validation) - ActeRegistre
Utilisateur.hasMany(ActeRegistre, { foreignKey: 'utilisateurValidationId' })
ActeRegistre.belongsTo(Utilisateur, { as: 'utilisateurValidation', foreignKey: 'utilisateurValidationId' })

// DemandeEtatDescriptif - Utilisateur(Demande)
Utilisateur.hasMany(DemandeEtatDescriptif, {foreignKey: 'utilisateurDemandeId'})
DemandeEtatDescriptif.belongsTo(Utilisateur, { as: 'utilisateurDemande', foreignKey: 'utilisateurDemandeId' })

// DemandeEtatDescriptif - Utilisateur(Traitement)
Utilisateur.hasMany(DemandeEtatDescriptif, {foreignKey: 'utilisateurTraitementId'})
DemandeEtatDescriptif.belongsTo(Utilisateur, { as: 'utilisateurTraitement', foreignKey: 'utilisateurTraitementId' })

// DemandeEtatDescriptif - TitreFoncier
TitreFoncier.hasMany(DemandeEtatDescriptif, {foreignKey: 'titreFoncierId'})
DemandeEtatDescriptif.belongsTo(TitreFoncier, { as: 'titreFoncier', foreignKey: 'titreFoncierId' })