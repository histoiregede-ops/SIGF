import { ProcessusCreationTitreFoncier } from "../../../enums/ProcessusCreationTitreFoncier";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { DonneeIndexation } from "../../indexation/models/DonneeIndexation";
import { ActeRegistre } from "./ActeRegistre";
import { Augmentation } from "./Augmentation";
import { BordereauAnalytique } from "./BordereauAnalytique";
import { CauseIndisponibilite } from "./CauseIndisponibilite";
import { Diminution } from "./Diminution";
import { DivisionEnLot } from "./DivisionEnLot";
import { DivisionEnVolume } from "./DivisionEnVolume";
import { DroitReelConstitueParDenombrement } from "./DroitReelConstitueParDenombrement";
import { Limite } from "./Limite";
import { Mutation } from "./Mutation";
import { OppositionCasInscriptionDifferee } from "./OppositionCasInscriptionDifferee";
import { PrivilegeHypotheque } from "./PrivilegeHypotheque";
import { SituationFiscale } from "./SituationFiscale";
import { SituationPropriete } from "./SituationPropriete";

export class TitreFoncier {
  declare id?: string
  declare numeroPrefixe?: string
  declare numero?: number
  declare numeroSuffixe?: string
  declare processusCreation?: ProcessusCreationTitreFoncier
  declare numeroRequisition?: string
  declare numeroTitreFoncierMorcelle?: string
  declare statut?: string
  declare informationsStatut?: string
  declare natureConsistanceImmeuble?: string
  declare contenanceEnHectare?: number
  declare contenanceEnAre?: number
  declare contenanceEnCentiare?: number

  declare nupParcelleAssise?: string
  declare titreParcelleAssise?: string
  declare numeroLot?: string
  declare numeroVolume?: string
  declare descriptionPartiesCommunes?: string

  declare utilisateurId?: Utilisateur['id']
  declare utilisateur?: Utilisateur
  declare acteRegistreId?: ActeRegistre['id']
  declare acteRegistre?: ActeRegistre

  declare limitesTitreFoncier?: Limite[]
  declare situationPropriete?: SituationPropriete
  declare augmentations?: Augmentation[]
  declare diminutions?: Diminution[]
  declare droitsReelsConstituesParDenombrement?: DroitReelConstitueParDenombrement[]
  declare privilegesHypotheques?: PrivilegeHypotheque[]
  declare causesIndisponibilite?: CauseIndisponibilite[]
  declare oppositionsCasInscriptionDifferee?: OppositionCasInscriptionDifferee[]
  declare mutations?: Mutation[]
  declare situationsFiscales?: SituationFiscale[]
  declare divisionsEnVolumes?: DivisionEnVolume[]
  declare divisionsEnLots?: DivisionEnLot[]
  declare bordereauxAnalytiques?: BordereauAnalytique[]

  declare donneeIndexation?: DonneeIndexation

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}