import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { DatabaseConnection } from '../core/helpers/DatabaseConnection';
import { Utilisateur } from '../modules/auth/models/Utilisateur';
import { Profil } from '../modules/auth/models/Profil';
import { Role } from '../modules/auth/models/Role';
import { CentreConservationFonciere } from '../modules/auth/models/CentreConservationFonciere';
import { Region } from '../modules/commun/models/Region';

interface TestEndpoint {
  method: string;
  path: string;
  status?: string;
  code?: number;
  note?: string;
  responseTime?: number;
  error?: string;
}

interface TestReport {
  timestamp: string;
  totalEndpoints: number;
  passed: number;
  failed: number;
  skipped: number;
  successRate: number;
  averageResponseTime: number;
  endpoints: TestEndpoint[];
  summary: {
    byModule: { [key: string]: { passed: number; failed: number; skipped: number } };
    byMethod: { [key: string]: { passed: number; failed: number; skipped: number } };
    slowEndpoints: TestEndpoint[];
    failedEndpoints: TestEndpoint[];
  };
}

const API_BASE_URL = 'http://localhost:3000';
const CREDENTIALS = {
  identifiant: 'admin',
  motDePasse: 'test12348',
};

// List of ALL endpoints to test
const ENDPOINTS: TestEndpoint[] = [
  // Auth endpoints
  { method: 'POST', path: '/api/v1/auth/login' },
  { method: 'GET', path: '/api/v1/auth/logged-user' },
  { method: 'GET', path: '/api/v1/auth/logged-user/roles' },
  { method: 'GET', path: '/api/v1/auth/utilisateurs' },
  { method: 'GET', path: '/api/v1/auth/utilisateurs/:id' },
  { method: 'POST', path: '/api/v1/auth/utilisateurs' },
  { method: 'PUT', path: '/api/v1/auth/utilisateurs/:id' },
  { method: 'DELETE', path: '/api/v1/auth/utilisateurs/:id' },
  { method: 'GET', path: '/api/v1/auth/utilisateurs/statistics/count' },
  { method: 'GET', path: '/api/v1/auth/profils' },
  { method: 'GET', path: '/api/v1/auth/profils/:id' },
  { method: 'POST', path: '/api/v1/auth/profils' },
  { method: 'PUT', path: '/api/v1/auth/profils/:id' },
  { method: 'DELETE', path: '/api/v1/auth/profils/:id' },
  { method: 'GET', path: '/api/v1/auth/profils/statistics/count' },
  { method: 'GET', path: '/api/v1/auth/roles' },
  { method: 'GET', path: '/api/v1/auth/roles/:id' },
  { method: 'POST', path: '/api/v1/auth/roles' },
  { method: 'PUT', path: '/api/v1/auth/roles/:id' },
  { method: 'DELETE', path: '/api/v1/auth/roles/:id' },
  { method: 'GET', path: '/api/v1/auth/roles/statistics/count' },
  { method: 'GET', path: '/api/v1/auth/centresConservationFonciere' },
  { method: 'GET', path: '/api/v1/auth/centresConservationFonciere/:id' },
  { method: 'POST', path: '/api/v1/auth/centresConservationFonciere' },
  { method: 'PUT', path: '/api/v1/auth/centresConservationFonciere/:id' },
  { method: 'DELETE', path: '/api/v1/auth/centresConservationFonciere/:id' },
  { method: 'GET', path: '/api/v1/auth/centresConservationFonciere/statistics/count' },
  { method: 'GET', path: '/api/v1/auth/indexeurs' },
  { method: 'GET', path: '/api/v1/auth/indexeurs/:id' },
  { method: 'POST', path: '/api/v1/auth/indexeurs' },
  { method: 'PUT', path: '/api/v1/auth/indexeurs/:id' },
  { method: 'DELETE', path: '/api/v1/auth/indexeurs/:id' },
  { method: 'PUT', path: '/api/v1/auth/indexeurs/:id/actif' },
  { method: 'PUT', path: '/api/v1/auth/indexeurs/:id/password' },
  { method: 'GET', path: '/api/v1/auth/indexeurs/statistics/count' },
  { method: 'GET', path: '/api/v1/auth/controleurs' },
  { method: 'GET', path: '/api/v1/auth/controleurs/:id' },
  { method: 'POST', path: '/api/v1/auth/controleurs' },
  { method: 'PUT', path: '/api/v1/auth/controleurs/:id' },
  { method: 'DELETE', path: '/api/v1/auth/controleurs/:id' },
  { method: 'PUT', path: '/api/v1/auth/controleurs/:id/actif' },
  { method: 'PUT', path: '/api/v1/auth/controleurs/:id/password' },
  { method: 'GET', path: '/api/v1/auth/controleurs/statistics/count' },
  { method: 'POST', path: '/api/v1/auth/register' },
  { method: 'POST', path: '/api/v1/auth/register/usager' },
  { method: 'POST', path: '/api/v1/auth/update-profile' },
  { method: 'POST', path: '/api/v1/auth/confirm' },
  { method: 'PUT', path: '/api/v1/auth/reset' },
  { method: 'GET', path: '/api/v1/auth/send-email-confirm-link' },
  { method: 'GET', path: '/api/v1/auth/send-password-reset-link' },

  // Indexation endpoints
  { method: 'GET', path: '/api/v1/indexation/fichiers' },
  { method: 'POST', path: '/api/v1/indexation/fichiers' },
  { method: 'GET', path: '/api/v1/indexation/fichiers/:id' },
  { method: 'PUT', path: '/api/v1/indexation/fichiers/:id' },
  { method: 'DELETE', path: '/api/v1/indexation/fichiers/:id' },
  { method: 'GET', path: '/api/v1/indexation/fichiers/:id/contenu' },
  { method: 'PUT', path: '/api/v1/indexation/fichiers/:id/contenu' },
  { method: 'GET', path: '/api/v1/indexation/fichiers/statistics/count' },
  { method: 'GET', path: '/api/v1/indexation/dossiers' },
  { method: 'POST', path: '/api/v1/indexation/dossiers' },
  { method: 'GET', path: '/api/v1/indexation/dossiers/:id' },
  { method: 'PUT', path: '/api/v1/indexation/dossiers/:id' },
  { method: 'DELETE', path: '/api/v1/indexation/dossiers/:id' },
  { method: 'GET', path: '/api/v1/indexation/dossiers/:typeRegistreId' },
  { method: 'GET', path: '/api/v1/indexation/dossiers/depots' },
  { method: 'GET', path: '/api/v1/indexation/dossiers/formalites' },
  { method: 'GET', path: '/api/v1/indexation/dossiers/oppositions' },
  { method: 'GET', path: '/api/v1/indexation/dossiers/titres-fonciers' },
  { method: 'GET', path: '/api/v1/indexation/dossiers/statistics/count' },
  { method: 'GET', path: '/api/v1/indexation/tachesIndexation' },
  { method: 'POST', path: '/api/v1/indexation/tachesIndexation' },
  { method: 'GET', path: '/api/v1/indexation/tachesIndexation/:id' },
  { method: 'PUT', path: '/api/v1/indexation/tachesIndexation/:id' },
  { method: 'DELETE', path: '/api/v1/indexation/tachesIndexation/:id' },
  { method: 'GET', path: '/api/v1/indexation/tachesIndexation/statistics/count' },
  { method: 'GET', path: '/api/v1/indexation/progressionsTachesIndexation' },
  { method: 'POST', path: '/api/v1/indexation/progressionsTachesIndexation' },
  { method: 'GET', path: '/api/v1/indexation/progressionsTachesIndexation/:id' },
  { method: 'PUT', path: '/api/v1/indexation/progressionsTachesIndexation/:id' },
  { method: 'DELETE', path: '/api/v1/indexation/progressionsTachesIndexation/:id' },
  { method: 'PUT', path: '/api/v1/indexation/progressionsTachesIndexation/:id/rejet' },
  { method: 'GET', path: '/api/v1/indexation/progressionsTachesIndexation/statistics/count' },
  { method: 'GET', path: '/api/v1/indexation/donneesIndexation' },
  { method: 'GET', path: '/api/v1/indexation/donneesIndexation/:id' },
  { method: 'DELETE', path: '/api/v1/indexation/donneesIndexation/:id' },
  { method: 'GET', path: '/api/v1/indexation/donneesIndexation/statistics/count' },
  { method: 'GET', path: '/api/v1/indexation/statistiques/globales' },
  { method: 'GET', path: '/api/v1/indexation/statistiques/indexation' },
  { method: 'GET', path: '/api/v1/indexation/statistiques/controle' },
  { method: 'GET', path: '/api/v1/indexation/statistiques/suiviJournalier' },
  { method: 'GET', path: '/api/v1/indexation/statistiques/quotas/indexation' },
  { method: 'GET', path: '/api/v1/indexation/statistiques/quotas/controle' },

  // Commun endpoints
  { method: 'GET', path: '/api/v1/commun/typesRegistre' },
  { method: 'POST', path: '/api/v1/commun/typesRegistre' },
  { method: 'GET', path: '/api/v1/commun/typesRegistre/:id' },
  { method: 'PUT', path: '/api/v1/commun/typesRegistre/:id' },
  { method: 'DELETE', path: '/api/v1/commun/typesRegistre/:id' },
  { method: 'GET', path: '/api/v1/commun/typesRegistre/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/periodes' },
  { method: 'POST', path: '/api/v1/commun/periodes' },
  { method: 'GET', path: '/api/v1/commun/periodes/:id' },
  { method: 'PUT', path: '/api/v1/commun/periodes/:id' },
  { method: 'DELETE', path: '/api/v1/commun/periodes/:id' },
  { method: 'GET', path: '/api/v1/commun/periodes/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/regions' },
  { method: 'POST', path: '/api/v1/commun/regions' },
  { method: 'GET', path: '/api/v1/commun/regions/:id' },
  { method: 'PUT', path: '/api/v1/commun/regions/:id' },
  { method: 'DELETE', path: '/api/v1/commun/regions/:id' },
  { method: 'GET', path: '/api/v1/commun/regions/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/prefectures' },
  { method: 'POST', path: '/api/v1/commun/prefectures' },
  { method: 'GET', path: '/api/v1/commun/prefectures/:id' },
  { method: 'PUT', path: '/api/v1/commun/prefectures/:id' },
  { method: 'DELETE', path: '/api/v1/commun/prefectures/:id' },
  { method: 'GET', path: '/api/v1/commun/prefectures/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/communes' },
  { method: 'POST', path: '/api/v1/commun/communes' },
  { method: 'GET', path: '/api/v1/commun/communes/:id' },
  { method: 'PUT', path: '/api/v1/commun/communes/:id' },
  { method: 'DELETE', path: '/api/v1/commun/communes/:id' },
  { method: 'GET', path: '/api/v1/commun/communes/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/cantons' },
  { method: 'POST', path: '/api/v1/commun/cantons' },
  { method: 'GET', path: '/api/v1/commun/cantons/:id' },
  { method: 'PUT', path: '/api/v1/commun/cantons/:id' },
  { method: 'DELETE', path: '/api/v1/commun/cantons/:id' },
  { method: 'GET', path: '/api/v1/commun/cantons/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/villes' },
  { method: 'GET', path: '/api/v1/commun/villages' },
  { method: 'GET', path: '/api/v1/commun/quartiers' },
  { method: 'POST', path: '/api/v1/commun/quartiers' },
  { method: 'GET', path: '/api/v1/commun/quartiers/:id' },
  { method: 'PUT', path: '/api/v1/commun/quartiers/:id' },
  { method: 'DELETE', path: '/api/v1/commun/quartiers/:id' },
  { method: 'GET', path: '/api/v1/commun/quartiers/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/civilites' },
  { method: 'POST', path: '/api/v1/commun/civilites' },
  { method: 'GET', path: '/api/v1/commun/civilites/:id' },
  { method: 'PUT', path: '/api/v1/commun/civilites/:id' },
  { method: 'DELETE', path: '/api/v1/commun/civilites/:id' },
  { method: 'GET', path: '/api/v1/commun/civilites/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/nationalites' },
  { method: 'POST', path: '/api/v1/commun/nationalites' },
  { method: 'GET', path: '/api/v1/commun/nationalites/:id' },
  { method: 'PUT', path: '/api/v1/commun/nationalites/:id' },
  { method: 'DELETE', path: '/api/v1/commun/nationalites/:id' },
  { method: 'GET', path: '/api/v1/commun/nationalites/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/qualitesDocument' },
  { method: 'POST', path: '/api/v1/commun/qualitesDocument' },
  { method: 'GET', path: '/api/v1/commun/qualitesDocument/:id' },
  { method: 'PUT', path: '/api/v1/commun/qualitesDocument/:id' },
  { method: 'DELETE', path: '/api/v1/commun/qualitesDocument/:id' },
  { method: 'GET', path: '/api/v1/commun/qualitesDocument/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/secteursActivite' },
  { method: 'POST', path: '/api/v1/commun/secteursActivite' },
  { method: 'GET', path: '/api/v1/commun/secteursActivite/:id' },
  { method: 'PUT', path: '/api/v1/commun/secteursActivite/:id' },
  { method: 'DELETE', path: '/api/v1/commun/secteursActivite/:id' },
  { method: 'GET', path: '/api/v1/commun/secteursActivite/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/professions' },
  { method: 'POST', path: '/api/v1/commun/professions' },
  { method: 'GET', path: '/api/v1/commun/professions/:id' },
  { method: 'PUT', path: '/api/v1/commun/professions/:id' },
  { method: 'DELETE', path: '/api/v1/commun/professions/:id' },
  { method: 'GET', path: '/api/v1/commun/professions/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/formesJuridiques' },
  { method: 'POST', path: '/api/v1/commun/formesJuridiques' },
  { method: 'GET', path: '/api/v1/commun/formesJuridiques/:id' },
  { method: 'PUT', path: '/api/v1/commun/formesJuridiques/:id' },
  { method: 'DELETE', path: '/api/v1/commun/formesJuridiques/:id' },
  { method: 'GET', path: '/api/v1/commun/formesJuridiques/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/piecesIdentite' },
  { method: 'POST', path: '/api/v1/commun/piecesIdentite' },
  { method: 'GET', path: '/api/v1/commun/piecesIdentite/:id' },
  { method: 'PUT', path: '/api/v1/commun/piecesIdentite/:id' },
  { method: 'DELETE', path: '/api/v1/commun/piecesIdentite/:id' },
  { method: 'GET', path: '/api/v1/commun/piecesIdentite/statistics/count' },
  { method: 'GET', path: '/api/v1/commun/typesPersonneMorale' },
  { method: 'GET', path: '/api/v1/commun/typesRelationLegale' },
  { method: 'GET', path: '/api/v1/commun/typesLienGroupe' },

  // Titres Fonciers endpoints
  { method: 'GET', path: '/api/v1/titres-fonciers' },
  { method: 'POST', path: '/api/v1/titres-fonciers' },
  { method: 'GET', path: '/api/v1/titres-fonciers/:id' },
  { method: 'PUT', path: '/api/v1/titres-fonciers/:id' },
  { method: 'DELETE', path: '/api/v1/titres-fonciers/:id' },
];

class SmokeTestRunner {
  private token: string = '';
  private results: TestEndpoint[] = [];
  private responseTimes: number[] = [];

  async run(): Promise<void> {
    console.log('🧪 Starting Smoke Test...');
    console.log(`📊 Testing ${ENDPOINTS.length} endpoints`);
    console.log(`🔐 Credentials: ${CREDENTIALS.identifiant} / ${CREDENTIALS.motDePasse}\n`);

    try {
      // Step 1: Init DB and Login
      await DatabaseConnection.getInstance().init();
      await this.login();

      // Step 2: Test all endpoints
      for (let i = 0; i < ENDPOINTS.length; i++) {
        const endpoint = ENDPOINTS[i];
        process.stdout.write(`\r[${i + 1}/${ENDPOINTS.length}] Testing ${endpoint.method} ${endpoint.path}`.padEnd(100));

        const result = await this.testEndpoint(endpoint);
        this.results.push(result);

        if (result.responseTime) {
          this.responseTimes.push(result.responseTime);
        }
      }
    } finally {
      await DatabaseConnection.getInstance().sequelize.close();
    }

    console.log('\n\n✅ Smoke test completed!\n');

    // Step 3: Generate report
    await this.generateReport();
  }

  private async login(): Promise<void> {
    try {
      console.log('🔑 Authenticating...');
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, CREDENTIALS, {
        timeout: 5000,
      });

      this.token = response.data.token;
      console.log('✅ Authentication successful\n');
    } catch (error) {
      const err = error as AxiosError;
      console.error('❌ Authentication failed:', err.message);
      process.exit(1);
    }
  }

  /**
   * Generates a realistic payload based on the endpoint path
   */
  private getBodyForPath(pathname: string): Record<string, any> {
    const n = Date.now();
    if (pathname.includes('/auth/utilisateurs') || pathname.includes('/auth/register')) {
      return {
        nom: 'Smoke',
        prenoms: 'Test',
        identifiant: `user${n}`,
        email: `smoke${n}@sigef.local`,
        motDePasse: 'Smoke@123456',
        contact: '+22890000000',
        profilId: 1,
        centreConservationFonciereId: 1
      };
    }
    if (pathname.includes('/regions') || pathname.includes('/commun/')) {
      return {
        libelle: `Smoke Item ${n}`,
        sigle: `S${Math.floor(Math.random() * 900)}`,
        description: 'Generated by smoke test',
        actif: true
      };
    }
    if (pathname.includes('/indexation/fichiers')) {
      return {
        nom: `fichier_${n}.pdf`,
        chemin: `/tmp/smoke_${n}.pdf`,
        taille: 1024
      };
    }
    // Default generic payload
    return { libelle: `Smoke ${n}`, description: 'Smoke test data' };
  }

  private async testEndpoint(endpoint: TestEndpoint): Promise<TestEndpoint> {
    const result: TestEndpoint = { ...endpoint };
    const startTime = Date.now();

    try {
      const config: any = {
        timeout: 3000,
        headers: {},
      };

      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }

      // Dynamic ID resolution
      const testPath = await this.resolveDynamicPath(endpoint.path);

      let response;
      switch (endpoint.method) {
        case 'GET':
          response = await axios.get(`${API_BASE_URL}${testPath}`, config);
          break;
        case 'POST':
          const postBody = this.getBodyForPath(testPath);
          response = await axios.post(`${API_BASE_URL}${testPath}`, postBody, config);
          break;
        case 'PUT':
          const putBody = testPath.includes('password')
            ? { motDePasse: 'NewPassword@123' }
            : { nom: 'Smoke Updated', prenoms: 'Test' };
          response = await axios.put(`${API_BASE_URL}${testPath}`, putBody, config);
          break;
        case 'DELETE':
          response = await axios.delete(`${API_BASE_URL}${testPath}`, config);
          break;
        default:
          result.status = 'UNKNOWN';
          return result;
      }

      result.responseTime = Date.now() - startTime;
      result.code = response.status;
      result.status = response.status >= 200 && response.status < 300 ? 'PASS' : 'FAIL';
    } catch (error) {
      const err = error as AxiosError;
      result.responseTime = Date.now() - startTime;
      result.status = 'FAIL';

      if (err.response) {
        result.code = err.response.status;
        result.error = `HTTP ${err.response.status}`;
      } else if (err.code === 'ECONNREFUSED') {
        result.error = 'Connection refused';
      } else if (err.message.includes('timeout')) {
        result.error = 'Timeout';
      } else {
        result.error = err.message;
      }
    }

    return result;
  }

  /**
   * Helper to find a real ID in the database based on the route
   */
  private async resolveDynamicPath(originalPath: string): Promise<string> {
    if (!originalPath.includes(':')) return originalPath;

    const modelMap: Record<string, any> = {
      'utilisateurs': Utilisateur,
      'profils': Profil,
      'roles': Role,
      'centresConservationFonciere': CentreConservationFonciere,
      'regions': Region
    };

    let resolvedPath = originalPath;
    const parts = originalPath.split('/');

    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith(':')) {
        const resource = parts[i - 1]; // e.g., 'utilisateurs' from /utilisateurs/:id
        const Model = modelMap[resource];

        if (Model) {
          const record = await Model.findOne({ attributes: ['id'], order: [['id', 'DESC']] });
          if (record) resolvedPath = resolvedPath.replace(parts[i], record.id.toString());
        }
        // Fallback to '1' if not found or no model mapping
        resolvedPath = resolvedPath.replace(parts[i], '1');
      }
    }
    return resolvedPath;
  }

  private async generateReport(): Promise<void> {
    const passed = this.results.filter((r) => r.status === 'PASS').length;
    const failed = this.results.filter((r) => r.status === 'FAIL').length;
    const skipped = this.results.filter((r) => r.status === 'SKIP').length;
    const successRate = (passed / this.results.length) * 100;
    const avgResponseTime =
      this.responseTimes.length > 0
        ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length
        : 0;

    // Group by module
    const byModule: { [key: string]: { passed: number; failed: number; skipped: number } } = {};
    const byMethod: { [key: string]: { passed: number; failed: number; skipped: number } } = {};

    this.results.forEach((endpoint) => {
      const module = endpoint.path.split('/')[3] || 'unknown';
      const method = endpoint.method;

      if (!byModule[module]) byModule[module] = { passed: 0, failed: 0, skipped: 0 };
      if (!byMethod[method]) byMethod[method] = { passed: 0, failed: 0, skipped: 0 };

      byModule[module][endpoint.status?.toLowerCase() as 'passed' | 'failed' | 'skipped']++;
      byMethod[method][endpoint.status?.toLowerCase() as 'passed' | 'failed' | 'skipped']++;
    });

    // Slow endpoints (> 1000ms)
    const slowEndpoints = this.results
      .filter((r) => r.responseTime && r.responseTime > 1000)
      .sort((a, b) => (b.responseTime || 0) - (a.responseTime || 0));

    // Failed endpoints
    const failedEndpoints = this.results.filter((r) => r.status === 'FAIL');

    const report: TestReport = {
      timestamp: new Date().toISOString(),
      totalEndpoints: this.results.length,
      passed,
      failed,
      skipped,
      successRate: parseFloat(successRate.toFixed(2)),
      averageResponseTime: parseFloat(avgResponseTime.toFixed(2)),
      endpoints: this.results,
      summary: {
        byModule,
        byMethod,
        slowEndpoints: slowEndpoints.slice(0, 10),
        failedEndpoints,
      },
    };

    // Save JSON report
    const jsonPath = path.join(__dirname, '../../..', 'SMOKE_TEST_COMPLETE.json');
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    console.log(`📄 JSON report saved: ${jsonPath}`);

    // Save Markdown report
    const mdPath = path.join(__dirname, '../../..', 'SMOKE_TEST_COMPLETE.md');
    const mdContent = this.generateMarkdownReport(report);
    fs.writeFileSync(mdPath, mdContent);
    console.log(`📋 Markdown report saved: ${mdPath}`);

    // Print summary
    this.printSummary(report);
  }

  private generateMarkdownReport(report: TestReport): string {
    let md = `# 🧪 Smoke Test Report\n\n`;
    md += `**Date:** ${report.timestamp}\n`;
    md += `**Total Endpoints:** ${report.totalEndpoints}\n`;
    md += `**Passed:** ${report.passed} ✅\n`;
    md += `**Failed:** ${report.failed} ❌\n`;
    md += `**Skipped:** ${report.skipped} ⏭️\n`;
    md += `**Success Rate:** ${report.successRate}%\n`;
    md += `**Average Response Time:** ${report.averageResponseTime}ms\n\n`;

    // Summary by module
    md += `## 📊 Results by Module\n\n`;
    md += `| Module | Passed | Failed | Skipped |\n`;
    md += `|--------|--------|--------|----------|\n`;
    Object.entries(report.summary.byModule).forEach(([module, stats]) => {
      md += `| ${module} | ${stats.passed} | ${stats.failed} | ${stats.skipped} |\n`;
    });
    md += '\n';

    // Summary by method
    md += `## 🔧 Results by HTTP Method\n\n`;
    md += `| Method | Passed | Failed | Skipped |\n`;
    md += `|--------|--------|--------|----------|\n`;
    Object.entries(report.summary.byMethod).forEach(([method, stats]) => {
      md += `| ${method} | ${stats.passed} | ${stats.failed} | ${stats.skipped} |\n`;
    });
    md += '\n';

    // Slow endpoints
    if (report.summary.slowEndpoints.length > 0) {
      md += `## 🐢 Slow Endpoints (>1000ms)\n\n`;
      report.summary.slowEndpoints.forEach((ep) => {
        md += `- **${ep.method} ${ep.path}** - ${ep.responseTime}ms\n`;
      });
      md += '\n';
    }

    // Failed endpoints
    if (report.summary.failedEndpoints.length > 0) {
      md += `## ❌ Failed Endpoints\n\n`;
      report.summary.failedEndpoints.forEach((ep) => {
        md += `- **${ep.method} ${ep.path}**\n`;
        md += `  - Status Code: ${ep.code || 'N/A'}\n`;
        md += `  - Error: ${ep.error || 'Unknown'}\n`;
      });
      md += '\n';
    }

    // All endpoints
    md += `## 📋 All Endpoints\n\n`;
    md += `| Method | Path | Status | Code | Response Time |\n`;
    md += `|--------|------|--------|------|----------------|\n`;
    report.endpoints.forEach((ep) => {
      const icon = ep.status === 'PASS' ? '✅' : ep.status === 'FAIL' ? '❌' : '⏭️';
      const time = ep.responseTime ? `${ep.responseTime}ms` : 'N/A';
      md += `| ${ep.method} | ${ep.path} | ${icon} ${ep.status} | ${ep.code || 'N/A'} | ${time} |\n`;
    });

    return md;
  }

  private printSummary(report: TestReport): void {
    console.log('\n📊 SMOKE TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Endpoints:     ${report.totalEndpoints}`);
    console.log(`Passed:              ${report.passed} ✅`);
    console.log(`Failed:              ${report.failed} ❌`);
    console.log(`Skipped:             ${report.skipped} ⏭️`);
    console.log(`Success Rate:        ${report.successRate}%`);
    console.log(`Avg Response Time:   ${report.averageResponseTime}ms`);
    console.log('='.repeat(60));

    if (report.failed > 0) {
      console.log('\n❌ Failed Endpoints:');
      report.summary.failedEndpoints.slice(0, 5).forEach((ep) => {
        console.log(`   - ${ep.method} ${ep.path} (${ep.error})`);
      });
      if (report.summary.failedEndpoints.length > 5) {
        console.log(`   ... and ${report.summary.failedEndpoints.length - 5} more`);
      }
    }

    if (report.summary.slowEndpoints.length > 0) {
      console.log('\n🐢 Slowest Endpoints:');
      report.summary.slowEndpoints.slice(0, 3).forEach((ep) => {
        console.log(`   - ${ep.method} ${ep.path} (${ep.responseTime}ms)`);
      });
    }
  }
}

// Run the test
const runner = new SmokeTestRunner();
runner.run().catch(console.error);
