# Audit Endpoints - Module `dossiers` (gestion legacy)

Base prefix: `/api/v1/dossiers`

## Endpoints identifies

Tous les sous-endpoints sont proteges par authentification.

## Sous-ressources exposees
- `/formalites`
- `/informationsPropriete`
- `/naturesEtatImmeuble`
- `/naturesTypeImmeuble`
- `/situationsPropriete`
- `/publicationsDemandes`
- `/bornages`
- `/proceduresJudiciaires`
- `/partiesPrenantes`
- `/personnesPhysiques`
- `/personnesMorales`
- `/personnesRelationLegale`
- `/conjointsPersonneDisposant`
- `/groupesConjoints`
- `/groupesHeritiers`
- `/groupesPersonnesPhysiques`
- `/personnesCibles`
- `/personnesMembres`
- `/personnesConjointes`
- `/personnesDisposants`
- `/personnesHeritieres`
- `/representantsPersonnePhysique`
- `/representantsPersonneMorale`
- `/oppositions`
- `/oppositionsRequisitions`
- `/piecesDeposees` (avec endpoints de contenu/upload)
- `/depots`
- `/typesDepot`
- `/typesOperationPostImmatriculation`
- `/titresFonciers` (avec endpoint metier numero)
- `/depotsTitresFonciers`
- `/directionsLimite`
- `/limites`
- `/augmentations`
- `/diminutions`
- `/causesIndisponibilite`
- `/droitsReelsConstituesParDenombrement`
- `/privilegesHypotheques`
- `/oppositionsCasInscriptionDifferee`
- `/mutations`
- `/modesAcquisition`
- `/modesAlienation`
- `/situationsFiscales`
- `/divisionsEnVolumes`
- `/divisionsEnLots`
- `/dossiersRegistres`
- `/actesRegistres`
- `/demandesTransferts`
- `/demandesEtatsDescriptifs`

## Pattern d'endpoints observe

La majorite des ressources suivent le pattern:
- `GET /<ressource>`
- `POST /<ressource>`
- `GET /<ressource>/statistics/count`
- `GET /<ressource>/:id`
- `PUT /<ressource>/:id`
- `DELETE /<ressource>/:id`

Exceptions notables:
- `piecesDeposees` ajoute `GET /:id/contenu` et `PUT /:id/contenu` (upload binaire).
- `titresFonciers` ajoute `GET /numeroTitreFoncier/:numeroTitreFoncier`.

## Risques / constats
- Surface API tres large (module legacy): fort risque de regressions sans tests contractuels automatisees.
- Endpoints upload/telechargement (`piecesDeposees`) necessitent verification renforcee securite fichier + controle ACL.
- Multiples ressources inter-reliees (FK): les `DELETE` peuvent provoquer erreurs d'integrite si contraintes non anticipees.

