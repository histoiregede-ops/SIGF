import { Component } from '@angular/core';
import { LocalStorageService } from '../../../../../core/services/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../../data/modules/auth/services/auth.service';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { StorageTokensService } from '../../../../../core/services/storage-tokens.service';
import { SessionStorageService } from '../../../../../core/services/session-storage.service';
import { Router } from '@angular/router';
import { RolesIDs } from '../../../../../data/enums/RolesIDs';

@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrl: './connexion-page.component.scss'
})
export class ConnexionPageComponent {
  emptyError: boolean = false
  error: boolean = false
  disableButton: boolean = false

  showPassword: boolean = false

  connexionForm: FormGroup = new FormGroup({
    usernameOrEmail: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    remember: new FormControl(0, []),
  })

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {
    this.localStorageService.remove(StorageTokensService.AUTH_REMEMBER_ME)
  }

  ngOnInit(): void {
  }

  connexion(): void {
    this.disableButton = true

    let identifiant: string = this.connexionForm.get('usernameOrEmail')?.value
    let password: string = this.connexionForm.get('password')?.value
    // console.log(identifiant, password)

    if (identifiant == null || password == null || identifiant.length == 0 || password.length == 0) {
      this.emptyError = true

      setTimeout(() => {
        this.emptyError = false
      }, 3000)
      this.disableButton = false
    }
    else {
      let utilisateur = new Utilisateur()
      utilisateur.email = identifiant
      utilisateur.identifiant = identifiant
      utilisateur.motDePasse = password

      this.authService.login(utilisateur)
        .subscribe(
          {
            next: (res) => {
              this.disableButton = false
              
              const AUTH_REMEMBER_ME: number = Number(this.connexionForm.get('remember')!.value ?? 0)  
              this.localStorageService.set(StorageTokensService.AUTH_REMEMBER_ME, AUTH_REMEMBER_ME.toString())
              if(AUTH_REMEMBER_ME == 1) {
                this.localStorageService.set(StorageTokensService.AUTH_TOKEN, res.token)
              }
              else {
                this.sessionStorageService.set(StorageTokensService.AUTH_TOKEN, res.token)
              }

              this.authService.getLoggedUser().subscribe({
                next: (user) => {
                  console.log('====== REDIRECTION DEBUG ======');
                  console.log('Utilisateur complet:', user);
                  console.log('Profil de l\'utilisateur:', user.profil);
                  console.log('Profil libelle:', user.profil?.libelle);
                  console.log('Profil titre:', user.profil?.titre);
                  const profileTitle = user.profil?.libelle;
                  console.log('Profile title utilisé:', profileTitle);
                  const redirectPath = this.getRedirectPathByProfile(profileTitle);
                  console.log('Chemin de redirection:', redirectPath);
                  console.log('====== FIN DEBUG ======');
                  this.router.navigateByUrl(redirectPath);
                },
                error: () => {
                  console.error('Erreur lors de la récupération du profil utilisateur');
                  this.router.navigateByUrl('/writpage');
                }
              })
            },
            error: (err) => {
              this.disableButton = false
              this.error = true

              setTimeout(() => {
                this.error = false
              }, 3000)
            },
          }
        )
    }
  }

  /**
   * Détermine le chemin de redirection selon le profil de l'utilisateur
   * @param profileTitle Le titre du profil de l'utilisateur
   * @returns Le chemin de redirection approprié
   */
  private getRedirectPathByProfile(profileTitle: string | null | undefined): string {
    if (!profileTitle) {
      console.warn('Profil vide ou null, redirection par défaut vers /writpage');
      return '/writpage'; // Par défaut si aucun profil
    }

    const profileMapping: { [key: string]: string } = {
      'Administrateur': '/admin',
      'Indexeur': '/writpage',
      'Contrôleur': '/indexation/taches/controle/formalites',
      'Indexeur & Contrôleur': '/writpage',
    };

    console.log('Profils disponibles:', Object.keys(profileMapping));
    console.log('Correspondance trouvée:', profileMapping[profileTitle]);

    // Retourner le chemin du profil s'il existe, sinon retourner le chemin par défaut
    const path = profileMapping[profileTitle] || '/writpage';
    console.log('Chemin final retourné:', path);
    return path;
  }
}
