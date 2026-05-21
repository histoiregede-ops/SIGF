import express from 'express';
import request from 'supertest';
import app from '../src/app';

const API_BASE = '/api/v1';

describe('Test Toutes Routes SIGEF', () => {
  let token: string;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post(`${API_BASE}/auth/login`)
      .send({ email: 'admin@sigef.com', identifiant: 'admin@sigef.com', motDePasse: 'Admin123!' });
    token = loginRes.body.token || '';
  });

  test('Auth', async () => {
    await request(app)
      .get(`${API_BASE}/auth/logged-user`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('Commun', async () => {
    await request(app)
      .get(`${API_BASE}/commun/regions`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('Indexation dossiers titres-fonciers', async () => {
    await request(app)
      .get(`${API_BASE}/indexation/dossiers/titres-fonciers`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('Dossiers titresFonciers', async () => {
    await request(app)
      .get(`${API_BASE}/dossiers/titresFonciers`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('Stats globales', async () => {
    await request(app)
      .get(`${API_BASE}/indexation/statistiques/globales`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // Ajoutez autres routes...
});

console.log('Tests SIGEF terminés - 100% OK si pass !');

