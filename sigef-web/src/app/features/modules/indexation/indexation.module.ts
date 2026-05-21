import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexationRoutingModule } from './indexation-routing.module';
import { ListeDocumentsPageComponent } from './pages/liste-documents-page/liste-documents-page.component';
import { SharedModule } from "../../../shared/shared.module";
import { ListeIndexeursPageComponent } from './pages/liste-indexeurs-page/liste-indexeurs-page.component';
import { ListeControleursPageComponent } from './pages/liste-controleurs-page/liste-controleurs-page.component';
import { ListeAttributionsLotsPageComponent } from './pages/liste-attributions-lots-page/liste-attributions-lots-page.component';
import { ListeCategorieLotsPageComponent } from './pages/liste-categorie-lots-page/liste-categorie-lots-page.component';
import { DetailsTachePageComponent } from './pages/details-tache-page/details-tache-page.component';
import { EspaceIndexationPageComponent } from './pages/espace-indexation-page/espace-indexation-page.component';
import { IndexationFormalitePrealableSectionComponent } from './components/indexation-formalite-prealable-section/indexation-formalite-prealable-section.component';
import { ListeTachesIndexationPageComponent } from './pages/liste-taches-indexation-page/liste-taches-indexation-page.component';
import { IndexationOppositionSectionComponent } from './components/indexation-opposition-section/indexation-opposition-section.component';
import { IndexationDepotSectionComponent } from './components/indexation-depot-section/indexation-depot-section.component';
import { StatistiquesIndexationPageComponent } from './pages/statistiques-indexation-page/statistiques-indexation-page.component';
import { TestPartiePrenanteFormComponent } from './components/test-partie-prenante-form/test-partie-prenante-form.component';
import { PersonnePhysiqueFormComponent } from './components/personne-physique-form/personne-physique-form.component';
import { ListeDonneesPageComponent } from './pages/liste-donnees-page/liste-donnees-page.component';
import { IndexationTitreFoncierSectionComponent } from './components/indexation-titre-foncier-section/indexation-titre-foncier-section.component';
import { SaisieDonneesActesPageComponent } from './pages/saisie-donnees-actes-page/saisie-donnees-actes-page.component';
import { IndexationActeRegistreSectionComponent } from './components/indexation-acte-registre-section/indexation-acte-registre-section.component';

@NgModule({
  declarations: [
    ListeDocumentsPageComponent,
    ListeIndexeursPageComponent,
    ListeControleursPageComponent,
    ListeAttributionsLotsPageComponent,
    ListeCategorieLotsPageComponent,
    DetailsTachePageComponent,
    EspaceIndexationPageComponent,
    IndexationFormalitePrealableSectionComponent,
    ListeTachesIndexationPageComponent,
    IndexationOppositionSectionComponent,
    IndexationDepotSectionComponent,
    StatistiquesIndexationPageComponent,
    TestPartiePrenanteFormComponent,
    PersonnePhysiqueFormComponent,
    ListeDonneesPageComponent,
    IndexationTitreFoncierSectionComponent,
    SaisieDonneesActesPageComponent,
    IndexationActeRegistreSectionComponent,
  ],
  imports: [
    CommonModule,
    IndexationRoutingModule,
    SharedModule
]
})
export class IndexationModule { }
