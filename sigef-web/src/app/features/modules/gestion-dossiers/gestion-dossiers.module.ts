import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionDossiersRoutingModule } from './gestion-dossiers-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { DetailsDepotPageComponent } from './pages/details-depot-page/details-depot-page.component';
import { DetailsFormalitePrealablePageComponent } from './pages/details-formalite-prealable-page/details-formalite-prealable-page.component';
import { DetailsOppositionPageComponent } from './pages/details-opposition-page/details-opposition-page.component';
import { DetailsTitreFoncierPageComponent } from './pages/details-titre-foncier-page/details-titre-foncier-page.component';
import { ListeDepotsPageComponent } from './pages/liste-depots-page/liste-depots-page.component';
import { ListeFormalitesPrealablesPageComponent } from './pages/liste-formalites-prealables-page/liste-formalites-prealables-page.component';
import { ListeOppositionsPageComponent } from './pages/liste-oppositions-page/liste-oppositions-page.component';
import { ListeTitresFonciersPageComponent } from './pages/liste-titres-fonciers-page/liste-titres-fonciers-page.component';
import { NouveauDepotPageComponent } from './pages/nouveau-depot-page/nouveau-depot-page.component';
import { NouveauTitreFoncierPageComponent } from './pages/nouveau-titre-foncier-page/nouveau-titre-foncier-page.component';
import { NouvelleFormalitePrealablePageComponent } from './pages/nouvelle-formalite-prealable-page/nouvelle-formalite-prealable-page.component';
import { NouvelleOppositionPageComponent } from './pages/nouvelle-opposition-page/nouvelle-opposition-page.component';
import { SectionAugmentationsTitreFoncierComponent } from './components/section-augmentations-titre-foncier/section-augmentations-titre-foncier.component';
import { SectionDiminutionsTitreFoncierComponent } from './components/section-diminutions-titre-foncier/section-diminutions-titre-foncier.component';
import { SectionDroitsReelsConstituesParDenombrementTitreFoncierComponent } from './components/section-droits-reels-constitues-par-denombrement-titre-foncier/section-droits-reels-constitues-par-denombrement-titre-foncier.component';
import { SectionMutationsTitreFoncierComponent } from './components/section-mutations-titre-foncier/section-mutations-titre-foncier.component';
import { SectionCausesIndisponibiliteTitreFoncierComponent } from './components/section-causes-indisponibilite-titre-foncier/section-causes-indisponibilite-titre-foncier.component';
import { SectionPrivilegesHypothequesTitreFoncierComponent } from './components/section-privileges-hypotheques-titre-foncier/section-privileges-hypotheques-titre-foncier.component';
import { SectionOppositionsCasInscriptionDiffereeTitreFoncierComponent } from './components/section-oppositions-cas-inscription-differee-titre-foncier/section-oppositions-cas-inscription-differee-titre-foncier.component';
import { SectionDivisionsEnLotsTitreFoncierComponent } from './components/section-divisions-en-lots-titre-foncier/section-divisions-en-lots-titre-foncier.component';
import { SectionDivisionsEnVolumesTitreFoncierComponent } from './components/section-divisions-en-volumes-titre-foncier/section-divisions-en-volumes-titre-foncier.component';
import { ContenanceDetailsComponent } from './components/contenance-details/contenance-details.component';
import { IndexationDetailsComponent } from './components/indexation-details/indexation-details.component';
import { ListeRegistresPageComponent } from './pages/liste-registres-page/liste-registres-page.component';
import { ListeDemandesTransfertsPageComponent } from './pages/liste-demandes-transferts-page/liste-demandes-transferts-page.component';
import { NouvelleDemandeTransfertPageComponent } from './pages/nouvelle-demande-transfert-page/nouvelle-demande-transfert-page.component';
import { DetailsDemandeTransfertPageComponent } from './pages/details-demande-transfert-page/details-demande-transfert-page.component';
import { TraitementDemandeTransfertPageComponent } from './pages/traitement-demande-transfert-page/traitement-demande-transfert-page.component';
import { ListeDemandesEtatsDescriptifsPageComponent } from './pages/liste-demandes-etats-descriptifs-page/liste-demandes-etats-descriptifs-page.component';
import { ListePaiementsPageComponent } from './pages/liste-paiements-page/liste-paiements-page.component';
import { ListeActesRegistrePageComponent } from './pages/liste-actes-registre-page/liste-actes-registre-page.component';
import { NouveauActeRegistrePageComponent } from './pages/nouveau-acte-registre-page/nouveau-acte-registre-page.component';
import { DetailsActeRegistrePageComponent } from './pages/details-acte-registre-page/details-acte-registre-page.component';
import { ListeBordereauxAnalytiquesPageComponent } from './pages/liste-bordereaux-analytiques-page/liste-bordereaux-analytiques-page.component';
import { NouveauBordereauAnalytiquePageComponent } from './pages/nouveau-bordereau-analytique-page/nouveau-bordereau-analytique-page.component';


@NgModule({
  declarations: [
    ListeFormalitesPrealablesPageComponent,
    NouvelleFormalitePrealablePageComponent,
    NouvelleOppositionPageComponent,
    ListeOppositionsPageComponent,
    ListeDepotsPageComponent,
    NouveauDepotPageComponent,
    DetailsFormalitePrealablePageComponent,
    ListeTitresFonciersPageComponent,
    NouveauTitreFoncierPageComponent,
    DetailsTitreFoncierPageComponent,
    DetailsOppositionPageComponent,
    DetailsDepotPageComponent,
    SectionAugmentationsTitreFoncierComponent,
    SectionDiminutionsTitreFoncierComponent,
    SectionDroitsReelsConstituesParDenombrementTitreFoncierComponent,
    SectionCausesIndisponibiliteTitreFoncierComponent,
    SectionMutationsTitreFoncierComponent,
    SectionPrivilegesHypothequesTitreFoncierComponent,
    SectionOppositionsCasInscriptionDiffereeTitreFoncierComponent,
    SectionDivisionsEnLotsTitreFoncierComponent,
    SectionDivisionsEnVolumesTitreFoncierComponent,
    ContenanceDetailsComponent,
    IndexationDetailsComponent,
    ListeRegistresPageComponent,
    ListeDemandesTransfertsPageComponent,
    NouvelleDemandeTransfertPageComponent,
    DetailsDemandeTransfertPageComponent,
    TraitementDemandeTransfertPageComponent,
    ListeDemandesEtatsDescriptifsPageComponent,
    ListePaiementsPageComponent,
    ListeActesRegistrePageComponent,
    NouveauActeRegistrePageComponent,
    DetailsActeRegistrePageComponent,
    ListeBordereauxAnalytiquesPageComponent,
    NouveauBordereauAnalytiquePageComponent,
  ],
  imports: [
    CommonModule,
    GestionDossiersRoutingModule,
    SharedModule,
  ]
})
export class GestionDossiersModule { }
