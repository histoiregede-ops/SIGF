# Audit Endpoints - Module `titres-fonciers`

Base prefix attendu: `/api/v1/titres-fonciers`

## Constat technique

Le routeur principal importe:
- `import titreFoncierRoutes from "./modules/titres-fonciers/routes";`

Mais dans l'arborescence source actuelle, le fichier `src/modules/titres-fonciers/routes.ts` n'est pas present.

## Impact
- Endpoints du module non auditables completement a partir des sources TypeScript presentes.
- Risque de build casse ou de module non fonctionnel selon la configuration runtime/transpilation.

## Recommandations
- Reconstituer/commiter `src/modules/titres-fonciers/routes.ts` (ou corriger l'import vers le vrai fichier).
- Ajouter un test de demarrage qui verifie le chargement de tous les modules de routes.
- Ajouter une documentation des endpoints de ce module une fois la route restauree.

