// Phase 6: Comprehensive E2E Test Suite

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

const API_URL = 'http://localhost:3000/api';

describe('SIGEF System End-to-End Tests', () => {
  let lotId: string;
  let documentId: string;
  let uploadId: string;
  let formId: string;
  let authToken: string;

  beforeAll(async () => {
    // Authenticate
    const authResponse = await request(API_URL)
      .post('/auth/login')
      .send({
        email: 'test@sigef.local',
        password: 'test123',
      });

    authToken = authResponse.body.data.token;
  });

  describe('Complete Lot Workflow', () => {
    it('devrait créer un lot (Étape 1)', async () => {
      const response = await request(API_URL)
        .post('/lots')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          typeDocument: 'titre-foncier',
          nombreDocuments: 5,
          priorite: 'haute',
          commentaires: 'Test lot',
        });

      expect(response.status).toBe(201);
      expect(response.body.data.id).toBeDefined();
      lotId = response.body.data.id;
    });

    it('devrait uploader un PDF (Étape 2)', async () => {
      const response = await request(API_URL)
        .post('/uploads/pdf')
        .set('Authorization', `Bearer ${authToken}`)
        .field('lotId', lotId)
        .attach('file', Buffer.from('%PDF-1.4\ntest'), 'test.pdf');

      expect(response.status).toBe(201);
      uploadId = response.body.data.id;
    });

    it('devrait créer un document dans le lot (Étape 3)', async () => {
      const response = await request(API_URL)
        .post(`/lots/${lotId}/documents`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          nomFichier: 'document-1.pdf',
          typeDocument: 'titre-foncier',
          uploadId: uploadId,
        });

      expect(response.status).toBe(201);
      documentId = response.body.data.id;
    });

    it('devrait soumettre un formulaire pour le document (Étape 4)', async () => {
      // Create form first
      const formResponse = await request(API_URL)
        .post('/forms')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          typeDocument: 'titre-foncier',
          description: 'Test form',
          fields: [
            {
              id: 'numero_titre',
              name: 'numero_titre',
              type: 'text',
              label: 'Numéro',
              required: true,
              order: 1,
            },
          ],
          isActive: true,
        });

      formId = formResponse.body.data.id;

      // Submit form
      const response = await request(API_URL)
        .post(`/forms/${formId}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          documentId: documentId,
          data: { numero_titre: 'TF-2024-001' },
        });

      expect(response.status).toBe(201);
    });

    it('devrait valider le document (Étape 5)', async () => {
      const response = await request(API_URL)
        .patch(`/documents/${documentId}/validate`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          commentaires: 'Document validé',
        });

      expect(response.status).toBe(200);
    });

    it('devrait affecter le lot à un indexeur (Étape 6)', async () => {
      const response = await request(API_URL)
        .post(`/lots/${lotId}/assign`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          indexeurId: 'indexer-1',
        });

      expect(response.status).toBe(200);
    });

    it('devrait changer le statut du lot à terminé (Étape 7)', async () => {
      const response = await request(API_URL)
        .patch(`/lots/${lotId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          statut: 'termine',
        });

      expect(response.status).toBe(200);
    });
  });

  describe('Audit Trail Verification', () => {
    it('devrait avoir enregistré toutes les actions d\'audit', async () => {
      const response = await request(API_URL)
        .get(`/audit/entity/lot/${lotId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('devrait générer des statistiques d\'audit', async () => {
      const response = await request(API_URL)
        .get('/audit/statistics/summary')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ days: 30 });

      expect(response.status).toBe(200);
      expect(response.body.data.totalActions).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('devrait rejeter un lot invalide', async () => {
      const response = await request(API_URL)
        .post('/lots')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          typeDocument: 'invalid',
          nombreDocuments: -1, // Invalid
        });

      expect(response.status).toBe(400);
    });

    it('devrait retourner 404 pour un lot inexistant', async () => {
      const response = await request(API_URL)
        .get('/lots/nonexistent-id')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });

    it('devrait rejeter les requêtes sans authentification', async () => {
      const response = await request(API_URL)
        .get('/lots');

      expect(response.status).toBe(401);
    });
  });

  afterAll(async () => {
    // Cleanup if needed
  });
});
