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
  selector: 'app-formalite-saisie-page',
  templateUrl: './formalite-saisie-page.component.html',
  styleUrl: './formalite-saisie-page.component.scss'
})
export class FormaliteSaisiePageComponent implements OnInit {

  formaliteForm: FormGroup = new FormGroup({
    numeroRequisition: new FormControl(null, [Validators.required]),
    dateDeDepot: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
    statut: new FormControl('A_VALIDER', [Validators.required]),
    informationsStatut: new FormControl(null, []),
    dateForclusion: new FormControl(null, []),
    dateRemisePieces: new FormControl(null, []),
  })

  pdfSrc: string | Uint8Array | null = null
  connectedUser: any = null;
  loading: boolean = false;
  formaliteId: string | null = null;
  apiUrl = `${environment.API_URL}/v1/formalites`;

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
        this.formaliteId = params['id'];
        this.loadFormalite(this.formaliteId!);
      }
    });
  }

  loadFormalite(id: string): void {
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
          description: 'Impossible de charger la formalité'
        });
      }
    });
  }

  patchForm(data: any): void {
    this.formaliteForm.patchValue({
      numeroRequisition: data.numeroRequisition,
      dateDeDepot: data.dateDeDepot,
      statut: data.statut,
      informationsStatut: data.informationsStatut,
      dateForclusion: data.dateForclusion,
      dateRemisePieces: data.dateRemisePieces
    });
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
    this.formaliteForm.markAllAsTouched()
    if (this.formaliteForm.invalid) {
      this.notificationsHandlerService.addNotification({
        type: TypesNotificationAlert.DANGER,
        title: 'Formulaire invalide',
        description: 'Veuillez remplir tous les champs obligatoires'
      });
      return;
    }

    const payload = {
      ...this.formaliteForm.value,
      utilisateurId: this.connectedUser?.id
    };

    this.loading = true;
    const operation = this.formaliteId 
      ? this.http.put(`${this.apiUrl}/${this.formaliteId}`, payload)
      : this.http.post(this.apiUrl, payload);

    operation.subscribe({
      next: (res) => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: this.formaliteId ? 'Mise à jour validée' : 'Saisie validée',
          text: `La formalité a été ${this.formaliteId ? 'mise à jour' : 'enregistrée'} avec succès.`,
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
    this.formaliteForm.reset({
      dateDeDepot: new Date().toISOString().split('T')[0],
      statut: 'A_VALIDER'
    })
    this.pdfSrc = null
  }
}
