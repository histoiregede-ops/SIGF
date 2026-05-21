import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TitreFoncierService } from '../../../../../data/modules/gestion-dossiers/services/titre-foncier.service';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { AuthenticatedUserService } from '../../../../../core/services/authenticated-user.service';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pag-saisie-page',
  templateUrl: './pag-saisie-page.component.html',
  styleUrl: './pag-saisie-page.component.scss'
})
export class PagSaisiePageComponent implements OnInit {

  pagForm: FormGroup = new FormGroup({
    // SECTION I
    sectionI: new FormGroup({
      regNumero: new FormControl(null, [Validators.required]),
      natureConsistance: new FormControl(null, [Validators.required]),
      contenanceHectare: new FormControl(0, []),
      contenanceAre: new FormControl(0, []),
      contenanceCentiare: new FormControl(0, []),
      situation: new FormControl(null, [Validators.required]),
      limiteNord: new FormControl(null, [Validators.required]),
      limiteSud: new FormControl(null, [Validators.required]),
      limiteEst: new FormControl(null, [Validators.required]),
      limiteOuest: new FormControl(null, [Validators.required]),
      rappelActes: new FormControl(null, []),
      actes: new FormControl(null, []),
    }),

    // SECTION II-A
    augmentations: new FormArray([]),

    // SECTION II-B
    diminutions: new FormArray([]),

    // SECTION III-A
    droitsReelsConstitues: new FormArray([]),

    // SECTION III-B
    causesIndisponibilite: new FormArray([]),

    // SECTION IV
    mutations: new FormArray([]),

    // SECTION V
    privilegesHypotheques: new FormArray([]),
  })

  pdfSrc: string | Uint8Array | null = null
  connectedUser: any = null;
  loading: boolean = false;
  titreFoncierId: string | null = null;

  constructor(
    private titreFoncierService: TitreFoncierService,
    private notificationsHandlerService: NotificationsHandlerService,
    private authenticatedUserService: AuthenticatedUserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authenticatedUserService.utilisateur.subscribe(user => {
      this.connectedUser = user;
    });

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.titreFoncierId = params['id'];
        this.loadTitreFoncier(this.titreFoncierId!);
      }
    });
  }

  loadTitreFoncier(id: string): void {
    this.loading = true;
    this.titreFoncierService.get(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        const titre = res.data || res;
        this.patchForm(titre);
      },
      error: (err) => {
        this.loading = false;
        this.notificationsHandlerService.addNotification({
          type: TypesNotificationAlert.DANGER,
          title: 'Erreur',
          description: 'Impossible de charger le titre foncier'
        });
      }
    });
  }

  patchForm(titre: any): void {
    const regNum = `${titre.numeroPrefixe || ''} ${titre.numero || ''}/${titre.numeroSuffixe || ''}`.trim();
    this.pagForm.patchValue({
      sectionI: {
        regNumero: regNum,
        natureConsistance: titre.natureConsistanceImmeuble,
        contenanceHectare: titre.contenanceEnHectare,
        contenanceAre: titre.contenanceEnAre,
        contenanceCentiare: titre.contenanceEnCentiare,
        situation: titre.informationsStatut,
        // ... (other fields if available in backend)
      }
    });
  }

  // ─── Getters ───────────────────────────────────────────────

  get sectionI(): FormGroup {
    return this.pagForm.get('sectionI') as FormGroup
  }

  get augmentations(): FormArray {
    return this.pagForm.get('augmentations') as FormArray
  }

  get diminutions(): FormArray {
    return this.pagForm.get('diminutions') as FormArray
  }

  get droitsReelsConstitues(): FormArray {
    return this.pagForm.get('droitsReelsConstitues') as FormArray
  }

  get causesIndisponibilite(): FormArray {
    return this.pagForm.get('causesIndisponibilite') as FormArray
  }

  get mutations(): FormArray {
    return this.pagForm.get('mutations') as FormArray
  }

  get privilegesHypotheques(): FormArray {
    return this.pagForm.get('privilegesHypotheques') as FormArray
  }

  // ─── SECTION II-A : Augmentations ──────────────────────────

  addAugmentation(): void {
    this.augmentations.push(new FormGroup({
      dateInscription: new FormControl(null, [Validators.required]),
      annee: new FormControl(new Date().getFullYear(), [Validators.required]),
      quinzaine: new FormControl(1, [Validators.required]),
      natureModification: new FormControl(null, [Validators.required]),
      designationParcelle: new FormControl(null, [Validators.required]),
      superficie: new FormControl(null, [Validators.required]),
      reglementParcelle: new FormControl(null, []),
    }))
  }

  removeAugmentation(index: number): void {
    this.augmentations.removeAt(index)
  }

  // ─── SECTION II-B : Diminutions ────────────────────────────

  addDiminution(): void {
    this.diminutions.push(new FormGroup({
      dateInscription: new FormControl(null, [Validators.required]),
      annee: new FormControl(new Date().getFullYear(), [Validators.required]),
      quinzaine: new FormControl(1, [Validators.required]),
      natureModification: new FormControl(null, [Validators.required]),
      designationParcelle: new FormControl(null, [Validators.required]),
      superficie: new FormControl(null, [Validators.required]),
      reglementParcelle: new FormControl(null, []),
    }))
  }

  removeDiminution(index: number): void {
    this.diminutions.removeAt(index)
  }

  // ─── SECTION III-A : Droits réels constitués ───────────────

  addDroitReelConstitue(): void {
    this.droitsReelsConstitues.push(new FormGroup({
      dateInscription: new FormControl(null, [Validators.required]),
      annee: new FormControl(new Date().getFullYear(), [Validators.required]),
      quinzaine: new FormControl(1, [Validators.required]),
      natureDroitEtabli: new FormControl(null, [Validators.required]),
      designationBeneficiaire: new FormControl(null, [Validators.required]),
      dureeDroit: new FormControl(null, [Validators.required]),
      valeurEnFrancs: new FormControl(null, []),
      dateRadiation: new FormControl(null, []),
      anneeRadiation: new FormControl(null, []),
      quinzaineRadiation: new FormControl(null, []),
    }))
  }

  removeDroitReelConstitue(index: number): void {
    this.droitsReelsConstitues.removeAt(index)
  }

  // ─── SECTION III-B : Causes d'indisponibilité ──────────────

  addCauseIndisponibilite(): void {
    this.causesIndisponibilite.push(new FormGroup({
      dateInscription: new FormControl(null, [Validators.required]),
      annee: new FormControl(new Date().getFullYear(), [Validators.required]),
      quinzaine: new FormControl(1, [Validators.required]),
      causeIndisponibilite: new FormControl(null, [Validators.required]),
      indicationsObservations: new FormControl(null, []),
      dateLiberation: new FormControl(null, []),
      anneeLiberation: new FormControl(null, []),
      quinzaineLiberation: new FormControl(null, []),
    }))
  }

  removeCauseIndisponibilite(index: number): void {
    this.causesIndisponibilite.removeAt(index)
  }

  // ─── SECTION IV : Mutations / Aliénations totales ──────────

  addMutation(): void {
    this.mutations.push(new FormGroup({
      dateInscription: new FormControl(null, [Validators.required]),
      annee: new FormControl(new Date().getFullYear(), [Validators.required]),
      quinzaine: new FormControl(1, [Validators.required]),
      ancienProprietaire: new FormControl(null, [Validators.required]),
      acquereur: new FormControl(null, [Validators.required]),
      prixAcquisition: new FormControl(null, [Validators.required]),
    }))
  }

  removeMutation(index: number): void {
    this.mutations.removeAt(index)
  }

  // ─── SECTION V : Privilèges et hypothèques ─────────────────

  addPrivilegeHypotheque(): void {
    this.privilegesHypotheques.push(new FormGroup({
      // Constitution
      dateInscription: new FormControl(null, [Validators.required]),
      annee: new FormControl(new Date().getFullYear(), [Validators.required]),
      quinzaine: new FormControl(1, [Validators.required]),
      naturePrivilege: new FormControl(null, [Validators.required]),
      designationDroitConstitue: new FormControl(null, [Validators.required]),
      creancierBeneficiaire: new FormControl(null, [Validators.required]),
      sommeGarantie: new FormControl(null, [Validators.required]),
      // Libération
      dateRadiation: new FormControl(null, []),
      anneeRadiation: new FormControl(null, []),
      quinzaineRadiation: new FormControl(null, []),
    }))
  }

  removePrivilegeHypotheque(index: number): void {
    this.privilegesHypotheques.removeAt(index)
  }

  // ─── Actions globales ──────────────────────────────────────

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.pdfSrc = new Uint8Array(reader.result as ArrayBuffer)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  validerSaisie(): void {
    this.pagForm.markAllAsTouched()
    if (this.pagForm.invalid) {
      this.notificationsHandlerService.addNotification({
        type: TypesNotificationAlert.DANGER,
        title: 'Formulaire invalide',
        description: 'Veuillez remplir tous les champs obligatoires'
      });
      return;
    }

    const formValue = this.pagForm.value;
    const sectionI = formValue.sectionI;

    // Mapping logic for TitreFoncier
    const titreFoncier: TitreFoncier = new TitreFoncier();
    
    // Parse regNumero (expecting format like RT 12345/A or similar)
    const regNum = sectionI.regNumero || '';
    const parts = regNum.match(/^([A-Z]*)\s*(\d+)\/?([A-Z]*)$/i);
    
    titreFoncier.numeroPrefixe = parts ? (parts[1] || 'RT') : 'RT';
    titreFoncier.numero = parts ? parseInt(parts[2]) : 0;
    titreFoncier.numeroSuffixe = parts ? (parts[3] || '') : '';
    
    titreFoncier.natureConsistanceImmeuble = sectionI.natureConsistance;
    titreFoncier.contenanceEnHectare = sectionI.contenanceHectare || 0;
    titreFoncier.contenanceEnAre = sectionI.contenanceAre || 0;
    titreFoncier.contenanceEnCentiare = sectionI.contenanceCentiare || 0;
    titreFoncier.informationsStatut = sectionI.situation;
    
    titreFoncier.utilisateurId = this.connectedUser?.id;

    // Sections linked
    (titreFoncier as any).augmentations = formValue.augmentations;
    (titreFoncier as any).diminutions = formValue.diminutions;
    (titreFoncier as any).droitsReels = formValue.droitsReelsConstitues;
    (titreFoncier as any).causesIndisponibilite = formValue.causesIndisponibilite;
    (titreFoncier as any).mutations = formValue.mutations;
    (titreFoncier as any).privilegesHypotheques = formValue.privilegesHypotheques;
    
    if (this.titreFoncierId) titreFoncier.id = this.titreFoncierId;
    this.loading = true;
    const operation = this.titreFoncierId 
      ? this.titreFoncierService.update(titreFoncier)
      : this.titreFoncierService.create(titreFoncier);

    operation.subscribe({
      next: (res) => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: this.titreFoncierId ? 'Mise à jour validée' : 'Saisie validée',
          text: `Le Titre Foncier a été ${this.titreFoncierId ? 'mis à jour' : 'enregistré'} avec succès.`,
          confirmButtonText: 'OK'
        }).then(() => {
          this.annulerSaisie();
          this.router.navigate(['/writpage']);
        });
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.error(err);
        this.notificationsHandlerService.addNotification({
          type: TypesNotificationAlert.DANGER,
          title: 'Erreur',
          description: 'Une erreur est survenue lors de l\'enregistrement'
        });
      }
    });
  }

  annulerSaisie(): void {
    this.pagForm.reset()
    this.augmentations.clear()
    this.diminutions.clear()
    this.droitsReelsConstitues.clear()
    this.causesIndisponibilite.clear()
    this.mutations.clear()
    this.privilegesHypotheques.clear()
  }
}

