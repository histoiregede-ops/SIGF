const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const BASE_URL = 'http://localhost:3000/api/v1';

async function testRoute(url, method = 'GET', token = null) {
  const options = { method, headers: { 'Content-Type': 'application/json' } };
  if (token) options.headers.Authorization = `Bearer ${token}`;
  const res = await fetch(BASE_URL + url, options).catch(() => ({status: 'ERR_CONN'}));
  const status = res.status;
  console.log(`${method.padEnd(5)} ${url.padEnd(50)} → ${status}`);
  return status === 200 || status === 304 || status === 201;
}

async function main() {
  console.log('=== TEST ROUTES SIGEF ===');
  // Login pour token
  // Login pour token (adaptez credentials)
  const loginPayload = {username: process.env.TEST_USER || 'admin', password: process.env.TEST_PASS || 'admin123'};
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(loginPayload)
  });
  let token = null;
  if (loginRes.ok) {
    const data = await loginRes.json();
    token = data.token || data.accessToken;
  }
  console.log(`Login ${loginRes.status}: ${token ? 'OK' : 'FAIL - Adaptez username/password dans .env ou code'}`);
  console.log(`Token: ${token ? 'OK' : 'FAIL'}`);

  const routes = [
    '/auth/logged-user',
    '/auth/roles', 
    '/commun/regions',
    '/commun/typesRegistre',
    '/indexation/statistiques/globales',
    '/indexation/dossiers',
    '/indexation/dossiers/titres-fonciers',
    '/indexation/fichiers',
    '/dossiers/titresFonciers',
    '/dossiers/formalites',
    // ajouter autres...
  ];

  let ok = 0, total = routes.length;
  for (const route of routes) {
    if (await testRoute(route, 'GET', token)) ok++;
  }

  console.log(`\\nRESULT: ${ok}/${total} routes OK (${Math.round(ok/total*100)}%)`);
}

main().catch(console.error);
