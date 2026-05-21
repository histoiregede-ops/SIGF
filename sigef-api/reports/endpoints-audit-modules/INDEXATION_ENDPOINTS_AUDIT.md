# Audit Endpoints - Module `indexation`

Base prefix: `/api/v1/indexation`

## Endpoints identifies

Tous les sous-endpoints sont proteges par authentification.

### Dossiers
- `GET /dossiers`
- `GET /dossiers/formalites`
- `GET /dossiers/depots`
- `GET /dossiers/titres-fonciers`
- `GET /dossiers/oppositions`
- `GET /dossiers/:typeRegistreId`
- `POST /dossiers`
- `GET /dossiers/statistics/count`
- `GET /dossiers/:id`
- `PUT /dossiers/:id`
- `DELETE /dossiers/:id`

### Fichiers
- `GET /fichiers`
- `POST /fichiers` (upload fichier)
- `GET /fichiers/statistics/count`
- `GET /fichiers/:id`
- `GET /fichiers/:id/contenu`
- `PUT /fichiers/:id`
- `PUT /fichiers/:id/contenu` (upload fichier)
- `DELETE /fichiers/:id`

### Taches d'indexation
- `GET /tachesIndexation`
- `POST /tachesIndexation`
- `GET /tachesIndexation/statistics/count`
- `GET /tachesIndexation/:id`
- `PUT /tachesIndexation/:id`
- `DELETE /tachesIndexation/:id`

### Progressions de taches
- `GET /progressionsTachesIndexation`
- `POST /progressionsTachesIndexation`
- `GET /progressionsTachesIndexation/statistics/count`
- `GET /progressionsTachesIndexation/:id`
- `PUT /progressionsTachesIndexation/:id`
- `DELETE /progressionsTachesIndexation/:id`

### Donnees d'indexation
- `GET /donneesIndexation`
- `GET /donneesIndexation/statistics/count`
- `GET /donneesIndexation/:id`
- `DELETE /donneesIndexation/:id`

### Statistiques
- `GET /statistiques/globales`
- `GET /statistiques/indexation`
- `GET /statistiques/controle`
- `GET /statistiques/suiviJournalier`
- `GET /statistiques/quotas/indexation`
- `GET /statistiques/quotas/controle`

## Risques / constats
- Routes `GET /dossiers/:typeRegistreId` et `GET /dossiers/:id` peuvent se chevaucher selon l'ordre de declaration et le format des ids.
- Endpoints upload (`/fichiers`) critiques: valider taille, type MIME, extension, antivirus et controle d'acces par dossier.
- `donneesIndexation` sans `POST/PUT` peut etre volontaire (ecriture indirecte) mais a documenter clairement pour eviter confusion frontend.

