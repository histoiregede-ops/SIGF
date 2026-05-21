import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { AuthenticatedUserService } from '../../../../../core/services/authenticated-user.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-depot-saisie-page',
  templateUrl: './depot-saisie-page.component.html',
  styleUrl: './depot-saisie-page.component.scss'
})
export class DepotSaisiePageComponent implements OnInit {

  depotForm: FormGroup = new FormGroup({
    numeroRequisition: new FormControl(null, []),
    dateDepot: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
    statut: new FormControl('A_VALIDER', [Validators.required]),
    informationsStatut: new FormControl(null, []),
    designationDroitReel: new FormControl(null, []),
    montantOperation: new FormControl(0, []),
    
    // Parties prenantes
    partiesPrenantes: new FormArray([]),
  })

  pdfSrc: string | Uint8Array | null = null
  connectedUser: any = null;
  loading: boolean = false;
  depotId: string | null = null;
  apiUrl = `${environment.API_URL}/v1/depots`;

  constructor(
    private http: HttpClient,
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
        this.depotId = params['id'];
        this.loadDepot(this.depotId!);
      }
    });
  }

  loadDepot(id: string): void {
    this.loading = true;
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (res: any) => {
        this.loading = false;
        const data = res.data || res;
        this.patchForm(data);
      },
      error: (err) => {
        this.loading = false;
        this.notificationsHandlerService.addNotification({
          type: TypesNotificationAlert.DANGER,
          title: 'Erreur',
          description: 'Impossible de charger le dépôt'
        });
      }
    });
  }

  patchForm(data: any): void {
    this.depotForm.patchValue({
      numeroRequisition: data.numeroRequisition,
      dateDepot: data.dateDepot,
      statut: data.statut,
      informationsStatut: data.informationsStatut,
      designationDroitReel: data.designationDroitReel,
      montantOperation: data.montantOperation
    });
    
    // TODO: patch FormArrays if needed
  }

  // ─── Getters ───────────────────────────────────────────────

  get partiesPrenantes(): FormArray {
    return this.depotForm.get('partiesPrenantes') as FormArray
  }

  // ─── Actions ───────────────────────────────────────────────

  addPartiePrenante(): void {
    this.partiesPrenantes.push(new FormGroup({
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, []),
      qualite: new FormControl('DEPOSANT', [Validators.required]),
      domicile: new FormControl(null, []),
    }))
  }

  removePartiePrenante(index: number): void {
    this.partiesPrenantes.removeAt(index)
  }

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
    this.depotForm.markAllAsTouched()
    if (this.depotForm.invalid) {
      this.notificationsHandlerService.addNotification({
        type: TypesNotificationAlert.DANGER,
        title: 'Formulaire invalide',
        description: 'Veuillez remplir tous les champs obligatoires'
      });
      return;
    }

    const payload = {
      ...this.depotForm.value,
      utilisateurId: this.connectedUser?.id
    };

    this.loading = true;
    const operation = this.depotId 
      ? this.http.put(`${this.apiUrl}/${this.depotId}`, payload)
      : this.http.post(this.apiUrl, payload);

    operation.subscribe({
      next: (res) => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: this.depotId ? 'Mise à jour validée' : 'Saisie validée',
          text: `Le dépôt a été ${this.depotId ? 'mis à jour' : 'enregistré'} avec succès.`,
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
    this.depotForm.reset({
      dateDepot: new Date().toISOString().split('T')[0],
      statut: 'A_VALIDER',
      montantOperation: 0
    })
    this.partiesPrenantes.clear()
    this.pdfSrc = null
  }
}
