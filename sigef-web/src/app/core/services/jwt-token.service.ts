import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  displayname?: string;
  email?: string;
  // Ajoute ici d'autres propriétés personnalisées de ton token si nécessaire
}

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  private jwtToken: string | null = null;
  private decodedToken: CustomJwtPayload | null = null;

  constructor() {
    // Optionnel : Charger le token depuis le localStorage au démarrage du service
    // const storedToken = localStorage.getItem('AUTH_TOKEN'); // Utilise ta clé de stockage
    // if (storedToken) {
    //   this.setToken(storedToken);
    // }
  }

  setToken(token: string | null) {
    this.jwtToken = token;
    if (token) {
      try {
        this.decodedToken = jwtDecode<CustomJwtPayload>(token);
      } catch (e) {
        console.error('Erreur lors du décodage du token JWT :', e);
        this.decodedToken = null;
      }
    } else {
      this.decodedToken = null;
    }
  }

  getDecodedToken(): CustomJwtPayload | null {
    return this.decodedToken;
  }

  getUser() {
    return this.decodedToken?.displayname ?? null; // Plus direct si 'displayname' est une clé fixe
  }

  // Ajout d'une méthode pour obtenir le token brut si nécessaire
  getAuthToken(): string | null {
    return this.jwtToken;
  }

  getEmailId() {
    return this.decodedToken?.email ?? null;
  }

  getExpiryTime(): number | null { // Le type de retour est déjà correct
    return this.decodedToken?.exp ?? null;
  }

  isTokenExpired(): boolean {
    const expiryTime = this.getExpiryTime();
    if (expiryTime) {
      return (Date.now() / 1000) > expiryTime; // La marge de 5 secondes est une bonne pratique, mais l'expiration est à `exp`
    }
    return true; // Si pas de temps d'expiration, considère comme expiré
  }

  isAuthenticated(): boolean {
    return this.jwtToken !== null && !this.isTokenExpired();
  }
}
