# Audit Endpoints - Module `commun`

Base prefix: `/api/v1/commun`

## Endpoints identifies

Tous les sous-endpoints du module `commun` sont proteges par authentification.

## Ressources exposees
- `/typesRegistre` (lecture + count + detail)
- `/formesJuridiques` (CRUD + count)
- `/periodes` (CRUD + count)
- `/regions` (CRUD + count)
- `/prefectures` (CRUD + count)
- `/communes` (CRUD + count)
- `/cantons` (CRUD + count)
- `/villes` (CRUD + count)
- `/villages` (CRUD + count)
- `/quartiers` (CRUD + count)
- `/qualitesDocument` (CRUD + count)
- `/typesPersonneMorale` (CRUD + count)
- `/typesRelationLegale` (CRUD + count)
- `/typesLienGroupe` (CRUD + count)
- `/civilites` (CRUD + count)
- `/nationalites` (CRUD + count)
- `/professions` (CRUD + count)
- `/secteursActivite` (CRUD + count)
- `/piecesIdentite` (CRUD + count)

## Pattern d'endpoints par ressource

Pattern standard observe:
- `GET /<ressource>`
- `POST /<ressource>` (sauf ressources de reference en lecture seule)
- `GET /<ressource>/statistics/count`
- `GET /<ressource>/:id`
- `PUT /<ressource>/:id` (si ressource modifiable)
- `DELETE /<ressource>/:id` (si ressource modifiable)

Exception notable:
- `typesRegistre` expose uniquement `GET /`, `GET /statistics/count`, `GET /:id`.

## Risques / constats
- Module de referentiel large: risque d'incoherence de droits (lecture vs ecriture) si RBAC non centralise.
- Les endpoints `DELETE` sur des donnees de reference peuvent casser des FK metier: recommander soft delete ou blocage si lie.
- Presence systematique de `statistics/count`: utile, mais verifier index DB pour eviter scans complets.

