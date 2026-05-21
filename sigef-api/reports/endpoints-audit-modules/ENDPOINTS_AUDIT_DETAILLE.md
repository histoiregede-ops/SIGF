# Audit detaille des endpoints (`/api/v1`)

## Legende
- `Auth`: `Oui` = middleware `Authenticate` applique au endpoint.
- `Middleware special`: upload, logique custom, etc.
- `Risque`: faible / moyen / eleve.
- `Priorite`: P1 (critique), P2 (important), P3 (amelioration).

---

## Module `auth` (`/api/v1/auth`)

| Endpoint | Auth | Middleware special | Risque | Priorite | Action corrective recommandee |
|---|---|---|---|---|---|
| `POST /login` | Non | - | eleve | P1 | Ajouter rate-limit + lockout anti brute-force + logs de securite |
| `POST /register` | Non | - | eleve | P1 | Verifier contraintes mot de passe/email unique/captcha |
| `POST /register/usager` | Oui | - | moyen | P2 | Verifier role admin obligatoire |
| `POST /update-profile` | Oui | `upload.single('profile')` | eleve | P1 | Valider taille/MIME/extension + stockage securise |
| `GET /send-email-confirm-link` | Oui | - | moyen | P2 | Limiter frequence d'envoi |
| `POST /confirm` | Non | - | moyen | P2 | Expiration de token + usage unique |
| `GET /send-password-reset-link` | Non | - | eleve | P1 | Protection enumeration email + rate-limit |
| `PUT /reset` | Oui | - | eleve | P1 | Revoir workflow: reset par token plutot que session auth |
| `GET /logged-user` | Oui | - | faible | P3 | Filtrer champs sensibles (email interne, metadata) |
| `GET /logged-user/roles` | Oui | - | moyen | P2 | Cacher roles inactifs cote API si non utile |
| `GET /utilisateurs*` | Oui | - | moyen | P2 | Pagination stricte + filtrage autorise |
| `PUT /utilisateurs/:id` | Oui | - | eleve | P1 | RBAC fin: interdire elevation privilege |
| `DELETE /utilisateurs/:id` | Oui | - | eleve | P1 | Soft delete + protections FK |
| `PUT /indexeurs/:id/password` | Oui | - | eleve | P1 | Journaliser changement + verification acteur |
| `PUT /controleurs/:id/password` | Oui | - | eleve | P1 | Journaliser changement + verification acteur |

---

## Module `commun` (`/api/v1/commun`)

Ressources: `typesRegistre`, `formesJuridiques`, `periodes`, `regions`, `prefectures`, `communes`, `cantons`, `villes`, `villages`, `quartiers`, `qualitesDocument`, `typesPersonneMorale`, `typesRelationLegale`, `typesLienGroupe`, `civilites`, `nationalites`, `professions`, `secteursActivite`, `piecesIdentite`.

Pattern majoritaire: `GET /`, `POST /`, `GET /statistics/count`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

| Endpoint pattern | Auth | Middleware special | Risque | Priorite | Action corrective recommandee |
|---|---|---|---|---|---|
| `GET /<ressource>` | Oui | - | faible | P3 | Standardiser pagination/tri |
| `POST /<ressource>` | Oui | - | moyen | P2 | Validation schema stricte |
| `PUT /<ressource>/:id` | Oui | - | moyen | P2 | Controle de concurrence (version/updatedAt) |
| `DELETE /<ressource>/:id` | Oui | - | eleve | P1 | Bloquer suppression si FK; soft delete |
| `GET /<ressource>/statistics/count` | Oui | - | moyen | P2 | Ajouter indexes DB + cache court |

Exception: `typesRegistre` en lecture seule (pas de `POST/PUT/DELETE`), ce qui est coherent.

---

## Module `indexation` (`/api/v1/indexation`)

| Endpoint | Auth | Middleware special | Risque | Priorite | Action corrective recommandee |
|---|---|---|---|---|---|
| `GET /dossiers` | Oui | - | moyen | P2 | Valider filtres (`dossier`, `typeRegistreId`) |
| `GET /dossiers/formalites` | Oui | custom route | moyen | P2 | Verifier coherence vs enum types registre |
| `GET /dossiers/depots` | Oui | custom route | moyen | P2 | Idem |
| `GET /dossiers/titres-fonciers` | Oui | custom route | moyen | P2 | Idem |
| `GET /dossiers/oppositions` | Oui | custom route | moyen | P2 | Idem |
| `GET /dossiers/:typeRegistreId` | Oui | dynamic route | eleve | P1 | Eviter collision avec `/:id` (prefix explicite recommande) |
| `GET /dossiers/:id` | Oui | dynamic route | eleve | P1 | Meme risque de collision, revoir design route |
| `POST /dossiers` | Oui | - | moyen | P2 | Validation FK + coherences parents |
| `POST /fichiers` | Oui | upload | eleve | P1 | Validation stricte + ACL dossier + antivirus |
| `PUT /fichiers/:id/contenu` | Oui | upload | eleve | P1 | Meme exigences securite upload |
| `GET /fichiers/:id/contenu` | Oui | file streaming | eleve | P1 | Verifier autorisation d'acces par lot/dossier |
| `POST /tachesIndexation` | Oui | - | moyen | P2 | Validation attribution indexeur/controleur |
| `PUT /progressionsTachesIndexation/:id` | Oui | - | moyen | P2 | Tracer transitions d'etat metier |
| `GET /statistiques/*` | Oui | agregats | moyen | P2 | Optimiser requetes + guard role dashboard |

---

## Module `dossiers` legacy (`/api/v1/dossiers`)

Surface API tres large (~50 sous-ressources). La plupart suivent le pattern CRUD + `statistics/count`.

Endpoints speciaux detectes:
- `GET /titresFonciers/numeroTitreFoncier/:numeroTitreFoncier`
- `POST /piecesDeposees` (upload)
- `PUT /piecesDeposees/:id/contenu` (upload)
- `GET /piecesDeposees/:id/contenu` (download/stream)

| Zone | Auth | Middleware special | Risque | Priorite | Action corrective recommandee |
|---|---|---|---|---|---|
| CRUD de reference legacy | Oui | - | moyen | P2 | Harmoniser validation + erreurs |
| Suppressions `DELETE` multiples | Oui | - | eleve | P1 | Strategie soft delete + verification FK avant suppression |
| Endpoints fichiers (`piecesDeposees`) | Oui | upload/stream | eleve | P1 | Meme politique securite que `indexation/fichiers` |
| Endpoint metier numero titre | Oui | logique custom | moyen | P2 | Index DB sur numero + gestion unicite |

---

## Module `titres-fonciers` (`/api/v1/titres-fonciers`)

| Constat | Risque | Priorite | Action corrective recommandee |
|---|---|---|---|
| Import `./modules/titres-fonciers/routes` reference dans `src/routes.ts` mais fichier absent dans `src/modules/titres-fonciers` | eleve | P1 | Restaurer/commiter `routes.ts` ou corriger l'import pour retablir traçabilite et auditabilite |

---

## Plan d'action recommande (global)

1. **P1 securite**: durcir upload, reset password, login/rate-limit, controle RBAC ecriture/suppression.
2. **P1 robustesse routing**: corriger conflit potentiel `indexation/dossiers/:typeRegistreId` vs `:id`.
3. **P1 coherence module**: corriger module `titres-fonciers` incomplet (route manquante).
4. **P2 qualite API**: schemas de validation uniformes (Joi/Zod), pagination/tri standards, erreurs normalisees.
5. **P2 observabilite**: logs d'audit sur endpoints sensibles (mot de passe, upload, suppression).
6. **P3 performance**: index DB sur filtres frequents + cache court sur compteurs/statistiques.

