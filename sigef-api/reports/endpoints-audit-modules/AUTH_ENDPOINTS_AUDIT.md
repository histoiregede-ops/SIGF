# Audit Endpoints - Module `auth`

Base prefix: `/api/v1/auth`

## Endpoints identifies

### Authentification
- `POST /login`
- `POST /register`
- `POST /register/usager` (auth requis)
- `POST /update-profile` (auth requis, upload fichier `profile`)
- `GET /send-email-confirm-link` (auth requis)
- `POST /confirm`
- `GET /send-password-reset-link`
- `PUT /reset` (auth requis)
- `GET /logged-user` (auth requis)
- `GET /logged-user/roles` (auth requis)

### Utilisateurs
- `GET /utilisateurs`
- `GET /utilisateurs/statistics/count`
- `GET /utilisateurs/:id`
- `PUT /utilisateurs/:id`
- `DELETE /utilisateurs/:id`

### Indexeurs
- `GET /indexeurs`
- `GET /indexeurs/statistics/count`
- `GET /indexeurs/:id`
- `PUT /indexeurs/:id`
- `PUT /indexeurs/:id/password`
- `PUT /indexeurs/:id/actif`
- `DELETE /indexeurs/:id`

### Controleurs
- `GET /controleurs`
- `GET /controleurs/statistics/count`
- `GET /controleurs/:id`
- `PUT /controleurs/:id`
- `PUT /controleurs/:id/password`
- `PUT /controleurs/:id/actif`
- `DELETE /controleurs/:id`

### Roles
- `GET /roles`
- `GET /roles/statistics/count`
- `GET /roles/:id`

### Profils
- `GET /profils`
- `POST /profils`
- `GET /profils/statistics/count`
- `GET /profils/:id`
- `PUT /profils/:id`
- `DELETE /profils/:id`

### Centres de conservation fonciere
- `GET /centresConservationFonciere`
- `POST /centresConservationFonciere`
- `GET /centresConservationFonciere/statistics/count`
- `GET /centresConservationFonciere/:id`
- `PUT /centresConservationFonciere/:id`
- `DELETE /centresConservationFonciere/:id`

## Risques / constats
- Le module melange endpoints publics (login/reset) et prives: bien verifier les protections `Authenticate` endpoint par endpoint.
- Les operations sensibles de type `PUT /:id/password` existent pour indexeurs/controleurs: ajouter une verification d'autorisation fine (RBAC) cote controller si absente.
- Upload profile present dans `update-profile`: verifier validation MIME/taille pour limiter les attaques par fichiers.

