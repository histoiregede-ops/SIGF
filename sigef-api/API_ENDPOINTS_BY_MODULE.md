# API Endpoints par Module

Base URL: `/api/v1`

## auth

### GET `/api/v1/auth/centresConservationFonciere/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/centresConservationFonciere/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/auth/centresConservationFonciere/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/centresConservationFonciere/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/auth/centresConservationFonciere/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/auth/centresConservationFonciere/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/auth/centresConservationFonciere/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/centresConservationFonciere/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/auth/centresConservationFonciere/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/centresConservationFonciere/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/auth/centresConservationFonciere/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/centresConservationFonciere/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/auth/confirm`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/confirm",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/auth/controleurs/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/controleurs/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/auth/controleurs/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/controleurs/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/auth/controleurs/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/auth/controleurs/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/auth/controleurs/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/controleurs/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/auth/controleurs/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/controleurs/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### PUT `/api/v1/auth/controleurs/:id/actif`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/controleurs/:id/actif",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### PUT `/api/v1/auth/controleurs/:id/password`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/controleurs/:id/password",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/auth/controleurs/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/controleurs/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/auth/indexeurs/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/indexeurs/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/auth/indexeurs/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/indexeurs/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/auth/indexeurs/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/auth/indexeurs/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/auth/indexeurs/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/indexeurs/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/auth/indexeurs/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/indexeurs/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### PUT `/api/v1/auth/indexeurs/:id/actif`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/indexeurs/:id/actif",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### PUT `/api/v1/auth/indexeurs/:id/password`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/indexeurs/:id/password",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/auth/indexeurs/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/indexeurs/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/auth/logged-user`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/logged-user"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/auth/logged-user/roles`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/logged-user/roles"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/auth/login`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/login",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/auth/profils/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/profils/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/auth/profils/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/profils/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/auth/profils/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/auth/profils/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/auth/profils/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/profils/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/auth/profils/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/profils/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/auth/profils/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/profils/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/auth/register`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/register",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### POST `/api/v1/auth/register/usager`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/register/usager",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### PUT `/api/v1/auth/reset`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/reset",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/auth/roles/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/roles/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/auth/roles/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/roles/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/auth/roles/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/roles/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/auth/send-email-confirm-link`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/send-email-confirm-link"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/auth/send-password-reset-link`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/send-password-reset-link"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/auth/update-profile`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/auth/update-profile",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/auth/utilisateurs/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/utilisateurs/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### DELETE `/api/v1/auth/utilisateurs/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/auth/utilisateurs/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/auth/utilisateurs/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/utilisateurs/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/auth/utilisateurs/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/auth/utilisateurs/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/auth/utilisateurs/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/auth/utilisateurs/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

## titres-fonciers

### GET `/api/v1/titres-fonciers/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/titres-fonciers/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/titres-fonciers/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/titres-fonciers/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/titres-fonciers/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/titres-fonciers/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

## indexation

### GET `/api/v1/indexation/donneesIndexation/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/donneesIndexation/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### DELETE `/api/v1/indexation/donneesIndexation/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/indexation/donneesIndexation/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/indexation/donneesIndexation/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/donneesIndexation/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/donneesIndexation/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/donneesIndexation/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/dossiers/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/dossiers/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/indexation/dossiers/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/indexation/dossiers/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/indexation/dossiers/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/indexation/dossiers/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/indexation/dossiers/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/dossiers/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/indexation/dossiers/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/indexation/dossiers/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/indexation/dossiers/:typeRegistreId`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/dossiers/:typeRegistreId"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/dossiers/depots`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/dossiers/depots"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/dossiers/formalites`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/dossiers/formalites"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/dossiers/oppositions`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/dossiers/oppositions"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/dossiers/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/dossiers/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/dossiers/titres-fonciers`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/dossiers/titres-fonciers"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/fichiers/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/fichiers/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/indexation/fichiers/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/indexation/fichiers/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/indexation/fichiers/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/indexation/fichiers/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/indexation/fichiers/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/fichiers/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/indexation/fichiers/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/indexation/fichiers/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/indexation/fichiers/:id/contenu`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/fichiers/:id/contenu"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/indexation/fichiers/:id/contenu`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/indexation/fichiers/:id/contenu",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/indexation/fichiers/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/fichiers/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/progressionsTachesIndexation/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/progressionsTachesIndexation/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/indexation/progressionsTachesIndexation/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/indexation/progressionsTachesIndexation/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/indexation/progressionsTachesIndexation/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/indexation/progressionsTachesIndexation/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/indexation/progressionsTachesIndexation/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/progressionsTachesIndexation/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/indexation/progressionsTachesIndexation/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/indexation/progressionsTachesIndexation/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### PUT `/api/v1/indexation/progressionsTachesIndexation/:id/rejet`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/indexation/progressionsTachesIndexation/:id/rejet",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/indexation/progressionsTachesIndexation/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/progressionsTachesIndexation/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/statistiques/controle`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/statistiques/controle"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/statistiques/globales`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/statistiques/globales"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/statistiques/indexation`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/statistiques/indexation"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/statistiques/quotas/controle`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/statistiques/quotas/controle"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/statistiques/quotas/indexation`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/statistiques/quotas/indexation"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/statistiques/suiviJournalier`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/statistiques/suiviJournalier"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/indexation/tachesIndexation/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/tachesIndexation/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/indexation/tachesIndexation/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/indexation/tachesIndexation/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/indexation/tachesIndexation/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/indexation/tachesIndexation/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/indexation/tachesIndexation/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/tachesIndexation/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/indexation/tachesIndexation/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/indexation/tachesIndexation/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/indexation/tachesIndexation/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/indexation/tachesIndexation/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

## commun

### GET `/api/v1/commun/cantons/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/cantons/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/cantons/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/cantons/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/cantons/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/cantons/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/cantons/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/cantons/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/cantons/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/cantons/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/cantons/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/cantons/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/civilites/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/civilites/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/civilites/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/civilites/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/civilites/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/civilites/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/civilites/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/civilites/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/civilites/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/civilites/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/civilites/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/civilites/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/communes/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/communes/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/communes/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/communes/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/communes/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/communes/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/communes/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/communes/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/communes/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/communes/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/communes/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/communes/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/formesJuridiques/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/formesJuridiques/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/formesJuridiques/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/formesJuridiques/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/formesJuridiques/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/formesJuridiques/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/formesJuridiques/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/formesJuridiques/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/formesJuridiques/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/formesJuridiques/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/formesJuridiques/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/formesJuridiques/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/nationalites/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/nationalites/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/nationalites/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/nationalites/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/nationalites/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/nationalites/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/nationalites/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/nationalites/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/nationalites/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/nationalites/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/nationalites/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/nationalites/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/periodes/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/periodes/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/periodes/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/periodes/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/periodes/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/periodes/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/periodes/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/periodes/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/periodes/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/periodes/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/periodes/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/periodes/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/piecesIdentite/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/piecesIdentite/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/piecesIdentite/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/piecesIdentite/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/piecesIdentite/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/piecesIdentite/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/piecesIdentite/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/piecesIdentite/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/piecesIdentite/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/piecesIdentite/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/piecesIdentite/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/piecesIdentite/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/prefectures/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/prefectures/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/prefectures/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/prefectures/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/prefectures/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/prefectures/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/prefectures/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/prefectures/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/prefectures/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/prefectures/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/prefectures/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/prefectures/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/professions/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/professions/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/professions/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/professions/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/professions/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/professions/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/professions/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/professions/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/professions/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/professions/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/professions/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/professions/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/qualitesDocument/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/qualitesDocument/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/qualitesDocument/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/qualitesDocument/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/qualitesDocument/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/qualitesDocument/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/qualitesDocument/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/qualitesDocument/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/qualitesDocument/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/qualitesDocument/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/qualitesDocument/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/qualitesDocument/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/quartiers/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/quartiers/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/quartiers/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/quartiers/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/quartiers/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/quartiers/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/quartiers/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/quartiers/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/quartiers/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/quartiers/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/quartiers/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/quartiers/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/regions/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/regions/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/regions/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/regions/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/regions/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/regions/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/regions/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/regions/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/regions/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/regions/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/regions/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/regions/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/secteursActivite/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/secteursActivite/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/secteursActivite/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/secteursActivite/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/secteursActivite/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/secteursActivite/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/secteursActivite/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/secteursActivite/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/secteursActivite/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/secteursActivite/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/secteursActivite/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/secteursActivite/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/typesLienGroupe/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesLienGroupe/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/typesLienGroupe/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/typesLienGroupe/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/typesLienGroupe/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/typesLienGroupe/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/typesLienGroupe/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesLienGroupe/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/typesLienGroupe/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/typesLienGroupe/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/typesLienGroupe/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesLienGroupe/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/typesPersonneMorale/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesPersonneMorale/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/typesPersonneMorale/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/typesPersonneMorale/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/typesPersonneMorale/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/typesPersonneMorale/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/typesPersonneMorale/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesPersonneMorale/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/typesPersonneMorale/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/typesPersonneMorale/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/typesPersonneMorale/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesPersonneMorale/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/typesRegistre/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesRegistre/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/typesRegistre/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesRegistre/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/typesRegistre/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesRegistre/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/typesRelationLegale/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesRelationLegale/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/typesRelationLegale/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/typesRelationLegale/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/typesRelationLegale/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/typesRelationLegale/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/typesRelationLegale/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesRelationLegale/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/typesRelationLegale/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/typesRelationLegale/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/typesRelationLegale/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/typesRelationLegale/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/villages/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/villages/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/villages/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/villages/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/villages/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/villages/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/villages/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/villages/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/villages/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/villages/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/villages/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/villages/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/commun/villes/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/villes/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/commun/villes/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/commun/villes/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/commun/villes/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/commun/villes/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/commun/villes/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/villes/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/commun/villes/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/commun/villes/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/commun/villes/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/commun/villes/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

## dossiers

### GET `/api/v1/dossiers/actesRegistres/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/actesRegistres/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/actesRegistres/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/actesRegistres/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/actesRegistres/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/actesRegistres/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/actesRegistres/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/actesRegistres/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/actesRegistres/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/actesRegistres/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/actesRegistres/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/actesRegistres/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/augmentations/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/augmentations/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/augmentations/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/augmentations/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/augmentations/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/augmentations/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/augmentations/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/augmentations/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/augmentations/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/augmentations/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/augmentations/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/augmentations/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/bornages/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/bornages/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/bornages/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/bornages/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/bornages/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/bornages/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/bornages/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/bornages/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/bornages/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/bornages/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/bornages/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/bornages/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/causesIndisponibilite/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/causesIndisponibilite/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/causesIndisponibilite/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/causesIndisponibilite/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/causesIndisponibilite/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/causesIndisponibilite/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/causesIndisponibilite/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/causesIndisponibilite/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/causesIndisponibilite/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/causesIndisponibilite/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/causesIndisponibilite/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/causesIndisponibilite/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/conjointsPersonneDisposant/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/conjointsPersonneDisposant/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/conjointsPersonneDisposant/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/conjointsPersonneDisposant/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/conjointsPersonneDisposant/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/conjointsPersonneDisposant/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/conjointsPersonneDisposant/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/conjointsPersonneDisposant/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/conjointsPersonneDisposant/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/conjointsPersonneDisposant/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/conjointsPersonneDisposant/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/conjointsPersonneDisposant/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/demandesEtatsDescriptifs/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/demandesEtatsDescriptifs/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/demandesEtatsDescriptifs/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/demandesEtatsDescriptifs/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/demandesEtatsDescriptifs/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/demandesEtatsDescriptifs/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/demandesEtatsDescriptifs/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/demandesEtatsDescriptifs/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/demandesEtatsDescriptifs/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/demandesEtatsDescriptifs/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### PUT `/api/v1/dossiers/demandesEtatsDescriptifs/:id/traitement`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/demandesEtatsDescriptifs/:id/traitement",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/demandesEtatsDescriptifs/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/demandesEtatsDescriptifs/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/demandesTransferts/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/demandesTransferts/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/demandesTransferts/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/demandesTransferts/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/demandesTransferts/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/demandesTransferts/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/demandesTransferts/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/demandesTransferts/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/demandesTransferts/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/demandesTransferts/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### PUT `/api/v1/dossiers/demandesTransferts/:id/traitement`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/demandesTransferts/:id/traitement",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/demandesTransferts/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/demandesTransferts/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/depots/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/depots/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/depots/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/depots/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/depots/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/depots/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/depots/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/depots/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/depots/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/depots/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/depots/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/depots/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/depotsTitresFonciers/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/depotsTitresFonciers/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/depotsTitresFonciers/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/depotsTitresFonciers/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/depotsTitresFonciers/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/depotsTitresFonciers/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/depotsTitresFonciers/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/depotsTitresFonciers/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/depotsTitresFonciers/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/depotsTitresFonciers/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/depotsTitresFonciers/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/depotsTitresFonciers/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/diminutions/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/diminutions/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/diminutions/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/diminutions/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/diminutions/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/diminutions/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/diminutions/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/diminutions/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/diminutions/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/diminutions/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/diminutions/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/diminutions/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/directionsLimite/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/directionsLimite/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/directionsLimite/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/directionsLimite/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/directionsLimite/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/directionsLimite/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/directionsLimite/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/directionsLimite/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/directionsLimite/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/directionsLimite/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/directionsLimite/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/directionsLimite/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/divisionsEnLots/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/divisionsEnLots/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/divisionsEnLots/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/divisionsEnLots/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/divisionsEnLots/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/divisionsEnLots/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/divisionsEnLots/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/divisionsEnLots/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/divisionsEnLots/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/divisionsEnLots/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/divisionsEnLots/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/divisionsEnLots/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/divisionsEnVolumes/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/divisionsEnVolumes/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/divisionsEnVolumes/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/divisionsEnVolumes/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/divisionsEnVolumes/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/divisionsEnVolumes/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/divisionsEnVolumes/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/divisionsEnVolumes/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/divisionsEnVolumes/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/divisionsEnVolumes/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/divisionsEnVolumes/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/divisionsEnVolumes/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/dossiersRegistres/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/dossiersRegistres/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/dossiersRegistres/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/dossiersRegistres/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/dossiersRegistres/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/dossiersRegistres/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/dossiersRegistres/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/dossiersRegistres/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/dossiersRegistres/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/dossiersRegistres/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/dossiersRegistres/prochainFolio/:dossierRegistreId`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/dossiersRegistres/prochainFolio/:dossierRegistreId"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/dossiersRegistres/prochainNumeroOrdre/:dossierRegistreId`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/dossiersRegistres/prochainNumeroOrdre/:dossierRegistreId"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/dossiersRegistres/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/dossiersRegistres/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/droitsReelsConstituesParDenombrement/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/droitsReelsConstituesParDenombrement/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/droitsReelsConstituesParDenombrement/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/droitsReelsConstituesParDenombrement/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/droitsReelsConstituesParDenombrement/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/droitsReelsConstituesParDenombrement/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/droitsReelsConstituesParDenombrement/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/droitsReelsConstituesParDenombrement/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/droitsReelsConstituesParDenombrement/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/droitsReelsConstituesParDenombrement/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/droitsReelsConstituesParDenombrement/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/droitsReelsConstituesParDenombrement/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/formalites/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/formalites/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/formalites/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/formalites/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/formalites/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/formalites/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/formalites/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/formalites/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/formalites/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/formalites/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/formalites/filter`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/formalites/filter"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/formalites/filter`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/formalites/filter",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/formalites/requisition/:requisition`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/formalites/requisition/:requisition"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/formalites/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/formalites/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/groupesConjoints/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/groupesConjoints/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/groupesConjoints/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/groupesConjoints/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/groupesConjoints/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/groupesConjoints/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/groupesConjoints/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/groupesConjoints/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/groupesConjoints/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/groupesConjoints/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/groupesConjoints/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/groupesConjoints/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/groupesHeritiers/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/groupesHeritiers/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/groupesHeritiers/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/groupesHeritiers/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/groupesHeritiers/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/groupesHeritiers/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/groupesHeritiers/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/groupesHeritiers/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/groupesHeritiers/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/groupesHeritiers/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/groupesHeritiers/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/groupesHeritiers/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/groupesPersonnesPhysiques/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/groupesPersonnesPhysiques/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/groupesPersonnesPhysiques/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/groupesPersonnesPhysiques/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/groupesPersonnesPhysiques/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/groupesPersonnesPhysiques/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/groupesPersonnesPhysiques/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/groupesPersonnesPhysiques/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/groupesPersonnesPhysiques/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/groupesPersonnesPhysiques/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/groupesPersonnesPhysiques/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/groupesPersonnesPhysiques/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/informationsPropriete/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/informationsPropriete/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/informationsPropriete/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/informationsPropriete/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/informationsPropriete/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/informationsPropriete/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/informationsPropriete/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/informationsPropriete/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/informationsPropriete/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/informationsPropriete/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/informationsPropriete/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/informationsPropriete/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/limites/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/limites/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/limites/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/limites/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/limites/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/limites/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/limites/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/limites/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/limites/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/limites/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/limites/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/limites/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/modesAcquisition/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/modesAcquisition/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/modesAcquisition/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/modesAcquisition/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/modesAcquisition/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/modesAcquisition/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/modesAcquisition/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/modesAcquisition/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/modesAcquisition/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/modesAcquisition/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/modesAcquisition/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/modesAcquisition/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/modesAlienation/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/modesAlienation/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/modesAlienation/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/modesAlienation/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/modesAlienation/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/modesAlienation/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/modesAlienation/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/modesAlienation/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/modesAlienation/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/modesAlienation/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/modesAlienation/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/modesAlienation/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/mutations/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/mutations/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/mutations/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/mutations/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/mutations/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/mutations/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/mutations/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/mutations/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/mutations/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/mutations/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/mutations/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/mutations/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/naturesEtatImmeuble/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/naturesEtatImmeuble/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/naturesEtatImmeuble/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/naturesEtatImmeuble/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/naturesEtatImmeuble/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/naturesEtatImmeuble/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/naturesEtatImmeuble/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/naturesEtatImmeuble/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/naturesEtatImmeuble/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/naturesEtatImmeuble/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/naturesEtatImmeuble/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/naturesEtatImmeuble/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/naturesTypeImmeuble/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/naturesTypeImmeuble/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/naturesTypeImmeuble/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/naturesTypeImmeuble/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/naturesTypeImmeuble/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/naturesTypeImmeuble/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/naturesTypeImmeuble/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/naturesTypeImmeuble/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/naturesTypeImmeuble/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/naturesTypeImmeuble/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/naturesTypeImmeuble/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/naturesTypeImmeuble/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/oppositions/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/oppositions/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/oppositions/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/oppositions/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/oppositions/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/oppositions/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/oppositions/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/oppositions/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/oppositions/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/oppositions/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/oppositions/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/oppositions/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/oppositionsCasInscriptionDifferee/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/oppositionsCasInscriptionDifferee/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/oppositionsCasInscriptionDifferee/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/oppositionsCasInscriptionDifferee/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/oppositionsCasInscriptionDifferee/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/oppositionsCasInscriptionDifferee/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/oppositionsCasInscriptionDifferee/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/oppositionsCasInscriptionDifferee/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/oppositionsCasInscriptionDifferee/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/oppositionsCasInscriptionDifferee/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/oppositionsCasInscriptionDifferee/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/oppositionsCasInscriptionDifferee/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/oppositionsRequisitions/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/oppositionsRequisitions/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/oppositionsRequisitions/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/oppositionsRequisitions/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/oppositionsRequisitions/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/oppositionsRequisitions/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/oppositionsRequisitions/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/oppositionsRequisitions/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/oppositionsRequisitions/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/oppositionsRequisitions/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/oppositionsRequisitions/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/oppositionsRequisitions/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/partiesPrenantes/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/partiesPrenantes/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/partiesPrenantes/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/partiesPrenantes/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/partiesPrenantes/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/partiesPrenantes/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/partiesPrenantes/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/partiesPrenantes/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/partiesPrenantes/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/partiesPrenantes/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/partiesPrenantes/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/partiesPrenantes/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/personnesCibles/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesCibles/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/personnesCibles/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/personnesCibles/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/personnesCibles/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/personnesCibles/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/personnesCibles/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesCibles/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/personnesCibles/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/personnesCibles/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/personnesCibles/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesCibles/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/personnesConjointes/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesConjointes/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/personnesConjointes/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/personnesConjointes/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/personnesConjointes/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/personnesConjointes/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/personnesConjointes/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesConjointes/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/personnesConjointes/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/personnesConjointes/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/personnesConjointes/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesConjointes/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/personnesDisposants/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesDisposants/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/personnesDisposants/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/personnesDisposants/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/personnesDisposants/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/personnesDisposants/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/personnesDisposants/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesDisposants/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/personnesDisposants/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/personnesDisposants/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/personnesDisposants/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesDisposants/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/personnesHeritieres/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesHeritieres/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/personnesHeritieres/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/personnesHeritieres/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/personnesHeritieres/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/personnesHeritieres/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/personnesHeritieres/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesHeritieres/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/personnesHeritieres/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/personnesHeritieres/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/personnesHeritieres/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesHeritieres/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/personnesMembres/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesMembres/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/personnesMembres/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/personnesMembres/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/personnesMembres/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/personnesMembres/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/personnesMembres/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesMembres/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/personnesMembres/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/personnesMembres/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/personnesMembres/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesMembres/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/personnesMorales/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesMorales/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/personnesMorales/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/personnesMorales/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/personnesMorales/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/personnesMorales/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/personnesMorales/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesMorales/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/personnesMorales/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/personnesMorales/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/personnesMorales/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesMorales/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/personnesPhysiques/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesPhysiques/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/personnesPhysiques/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/personnesPhysiques/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/personnesPhysiques/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/personnesPhysiques/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/personnesPhysiques/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesPhysiques/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/personnesPhysiques/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/personnesPhysiques/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/personnesPhysiques/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesPhysiques/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/personnesRelationLegale/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesRelationLegale/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/personnesRelationLegale/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/personnesRelationLegale/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/personnesRelationLegale/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/personnesRelationLegale/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/personnesRelationLegale/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesRelationLegale/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/personnesRelationLegale/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/personnesRelationLegale/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/personnesRelationLegale/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/personnesRelationLegale/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/piecesDeposees/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/piecesDeposees/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/piecesDeposees/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/piecesDeposees/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/piecesDeposees/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/piecesDeposees/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/piecesDeposees/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/piecesDeposees/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/piecesDeposees/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/piecesDeposees/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/piecesDeposees/:id/contenu`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/piecesDeposees/:id/contenu"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/piecesDeposees/:id/contenu`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/piecesDeposees/:id/contenu",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/piecesDeposees/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/piecesDeposees/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/privilegesHypotheques/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/privilegesHypotheques/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/privilegesHypotheques/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/privilegesHypotheques/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/privilegesHypotheques/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/privilegesHypotheques/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/privilegesHypotheques/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/privilegesHypotheques/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/privilegesHypotheques/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/privilegesHypotheques/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/privilegesHypotheques/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/privilegesHypotheques/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/proceduresJudiciaires/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/proceduresJudiciaires/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/proceduresJudiciaires/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/proceduresJudiciaires/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/proceduresJudiciaires/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/proceduresJudiciaires/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/proceduresJudiciaires/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/proceduresJudiciaires/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/proceduresJudiciaires/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/proceduresJudiciaires/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/proceduresJudiciaires/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/proceduresJudiciaires/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/publicationsDemandes/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/publicationsDemandes/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/publicationsDemandes/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/publicationsDemandes/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/publicationsDemandes/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/publicationsDemandes/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/publicationsDemandes/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/publicationsDemandes/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/publicationsDemandes/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/publicationsDemandes/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/publicationsDemandes/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/publicationsDemandes/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/representantsPersonneMorale/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/representantsPersonneMorale/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/representantsPersonneMorale/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/representantsPersonneMorale/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/representantsPersonneMorale/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/representantsPersonneMorale/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/representantsPersonneMorale/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/representantsPersonneMorale/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/representantsPersonneMorale/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/representantsPersonneMorale/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/representantsPersonneMorale/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/representantsPersonneMorale/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/representantsPersonnePhysique/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/representantsPersonnePhysique/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/representantsPersonnePhysique/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/representantsPersonnePhysique/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/representantsPersonnePhysique/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/representantsPersonnePhysique/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/representantsPersonnePhysique/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/representantsPersonnePhysique/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/representantsPersonnePhysique/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/representantsPersonnePhysique/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/representantsPersonnePhysique/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/representantsPersonnePhysique/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/situationsFiscales/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/situationsFiscales/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/situationsFiscales/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/situationsFiscales/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/situationsFiscales/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/situationsFiscales/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/situationsFiscales/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/situationsFiscales/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/situationsFiscales/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/situationsFiscales/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/situationsFiscales/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/situationsFiscales/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/situationsPropriete/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/situationsPropriete/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/situationsPropriete/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/situationsPropriete/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/situationsPropriete/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/situationsPropriete/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/situationsPropriete/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/situationsPropriete/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/situationsPropriete/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/situationsPropriete/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/situationsPropriete/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/situationsPropriete/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/titresFonciers/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/titresFonciers/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/titresFonciers/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/titresFonciers/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/titresFonciers/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/titresFonciers/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/titresFonciers/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/titresFonciers/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/titresFonciers/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/titresFonciers/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/titresFonciers/numeroTitreFoncier/:numeroTitreFoncier`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/titresFonciers/numeroTitreFoncier/:numeroTitreFoncier"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/titresFonciers/prochainNumeroTitreFoncier/:regionId`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/titresFonciers/prochainNumeroTitreFoncier/:regionId"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/titresFonciers/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/titresFonciers/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/typesDepot/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/typesDepot/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/typesDepot/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/typesDepot/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/typesDepot/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/typesDepot/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/typesDepot/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/typesDepot/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/typesDepot/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/typesDepot/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/typesDepot/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/typesDepot/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### GET `/api/v1/dossiers/typesOperationPostImmatriculation/`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/typesOperationPostImmatriculation/"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### POST `/api/v1/dossiers/typesOperationPostImmatriculation/`

```json
{
  "request": {
    "method": "POST",
    "url": "/api/v1/dossiers/typesOperationPostImmatriculation/",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### DELETE `/api/v1/dossiers/typesOperationPostImmatriculation/:id`

```json
{
  "request": {
    "method": "DELETE",
    "url": "/api/v1/dossiers/typesOperationPostImmatriculation/:id"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
```

### GET `/api/v1/dossiers/typesOperationPostImmatriculation/:id`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/typesOperationPostImmatriculation/:id"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```

### PUT `/api/v1/dossiers/typesOperationPostImmatriculation/:id`

```json
{
  "request": {
    "method": "PUT",
    "url": "/api/v1/dossiers/typesOperationPostImmatriculation/:id",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
```

### GET `/api/v1/dossiers/typesOperationPostImmatriculation/statistics/count`

```json
{
  "request": {
    "method": "GET",
    "url": "/api/v1/dossiers/typesOperationPostImmatriculation/statistics/count"
  },
  "response": {
    "success": true,
    "data": []
  }
}
```
