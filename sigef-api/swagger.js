const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SIGEF API - Système d\'Information de Gestion des Titres Fonciers',
      version: '1.0.0',
      description: `API complète pour la gestion foncière au Burkina Faso

Modules: Authentification, Indexation, Titres Fonciers, Communes, Dossiers legacy.`,
      contact: {
        name: 'Équipe SIGEF',
        email: 'support@sigef.bf'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local development'
      },
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Production-like'
      }
    ],
    tags: [
      { name: 'Auth', description: 'Authentification et gestion utilisateurs' },
      { name: 'Utilisateurs', description: 'Gestion des utilisateurs système' },
      { name: 'Roles', description: 'Gestion des rôles' },
      { name: 'Indexation', description: 'Dossiers, tâches et fichiers d\'indexation' },
      { name: 'Titres Fonciers', description: 'Gestion des titres fonciers' },
      { name: 'Commun', description: 'Données communes (régions, communes...)' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token requis. Login pour obtenir.'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            error: { type: 'string' }
          }
        },
        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' }
          }
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            data: { type: 'array' },
            pagination: {
              $ref: '#/components/schemas/Pagination'
            }
          }
        },
        Role: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nom: { type: 'string' },
            description: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/**/*.ts']  // Full scan of all TS files
};

const specs = swaggerJsdoc(options);
module.exports = specs;

