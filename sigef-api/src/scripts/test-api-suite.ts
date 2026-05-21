import axios, { AxiosInstance } from 'axios';

interface TestResult {
    endpoint: string;
    method: string;
    status: number;
    success: boolean;
    error?: string;
    responseTime: number;
}

class APITestSuite {
    private api: AxiosInstance;
    private token: string = '';
    private results: TestResult[] = [];
    private baseURL = 'http://localhost:3000/api/v1';

    constructor() {
        this.api = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            validateStatus: () => true, // Don't throw on any status
        });
    }

    async login(): Promise<boolean> {
        try {
            console.log('🔐 Attempting login...');
            const response = await this.api.post('/auth/login', {
                identifiant: 'admin',
                motDePasse: 'admin'
            });

            if (response.status === 200 && response.data.token) {
                this.token = response.data.token;
                this.api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                console.log('✅ Login successful');
                return true;
            } else {
                console.log('❌ Login failed:', response.status, response.data);
                return false;
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            return false;
        }
    }

    async testEndpoint(method: string, endpoint: string, description: string): Promise<void> {
        try {
            const startTime = Date.now();
            const response = await this.api.request({
                method: method as any,
                url: endpoint,
                validateStatus: () => true,
            });
            const responseTime = Date.now() - startTime;

            const success = response.status >= 200 && response.status < 400;
            const result: TestResult = {
                endpoint,
                method,
                status: response.status,
                success,
                responseTime,
            };

            this.results.push(result);

            const statusEmoji = success ? '✅' : '❌';
            const timeColor = responseTime > 1000 ? '\x1b[33m' : '\x1b[32m'; // Yellow if slow, green if fast
            const resetColor = '\x1b[0m';

            console.log(
                `${statusEmoji} [${method}] ${endpoint.padEnd(50)} | Status: ${response.status} | Time: ${timeColor}${responseTime}ms${resetColor}`
            );

            if (!success && response.data?.message) {
                console.log(`   Error: ${response.data.message}`);
            }
        } catch (error: any) {
            console.error(`❌ [${method}] ${endpoint} - Exception:`, error.message);
            this.results.push({
                endpoint,
                method,
                status: 0,
                success: false,
                error: error.message,
                responseTime: 0,
            });
        }
    }

    async runAllTests(): Promise<void> {
        console.log('\n🧪 STARTING COMPLETE API TEST SUITE\n');
        console.log(`Base URL: ${this.baseURL}\n`);

        // Check API health
        console.log('📋 Checking API health...\n');
        try {
            const healthResponse = await this.api.get('/');
            console.log('✅ API Health:', healthResponse.data);
        } catch (error) {
            console.error('❌ API is not running');
            return;
        }

        // Login
        const loginSuccess = await this.login();
        if (!loginSuccess) {
            console.error('\n⚠️  Cannot continue without valid token. Please ensure admin user exists.');
            return;
        }

        console.log('\n' + '='.repeat(80));
        console.log('📊 SECTION 1: AUTH ENDPOINTS');
        console.log('='.repeat(80) + '\n');

        await this.testEndpoint('GET', '/auth/logged-user', 'Get logged user');
        await this.testEndpoint('GET', '/auth/logged-user/roles', 'Get logged user roles');
        await this.testEndpoint('GET', '/auth/utilisateurs', 'Get all utilisateurs');
        await this.testEndpoint('GET', '/auth/profils', 'Get all profils');
        await this.testEndpoint('GET', '/auth/roles', 'Get all roles');
        await this.testEndpoint('GET', '/auth/centresConservationFonciere', 'Get centres conservation');

        console.log('\n' + '='.repeat(80));
        console.log('📊 SECTION 2: INDEXATION ENDPOINTS');
        console.log('='.repeat(80) + '\n');

        await this.testEndpoint('GET', '/indexation/fichiers?page=0&size=10', 'Get fichiers');
        await this.testEndpoint('GET', '/indexation/fichiers/statistics/count', 'Get fichiers count');
        await this.testEndpoint('GET', '/indexation/dossiers?page=0&size=10', 'Get dossiers');
        await this.testEndpoint('GET', '/indexation/tachesIndexation?page=0&size=10', 'Get taches indexation');
        await this.testEndpoint('GET', '/indexation/progressionsTachesIndexation?page=0&size=10', 'Get progressions');
        await this.testEndpoint('GET', '/indexation/donneesIndexation?page=0&size=10', 'Get donnees indexation');
        await this.testEndpoint('GET', '/indexation/statistiques', 'Get statistiques');

        console.log('\n' + '='.repeat(80));
        console.log('📊 SECTION 3: COMMUN ENDPOINTS');
        console.log('='.repeat(80) + '\n');

        await this.testEndpoint('GET', '/commun/typesRegistre', 'Get types registre');
        await this.testEndpoint('GET', '/commun/periodes', 'Get periodes');
        await this.testEndpoint('GET', '/commun/regions', 'Get regions');
        await this.testEndpoint('GET', '/commun/prefectures', 'Get prefectures');
        await this.testEndpoint('GET', '/commun/communes?page=0&size=10', 'Get communes');
        await this.testEndpoint('GET', '/commun/civilites', 'Get civilites');
        await this.testEndpoint('GET', '/commun/nationalites', 'Get nationalites');
        await this.testEndpoint('GET', '/commun/qualitesDocument', 'Get qualites document');
        await this.testEndpoint('GET', '/commun/secteursActivite', 'Get secteurs activite');

        console.log('\n' + '='.repeat(80));
        console.log('📊 SECTION 4: TITRES FONCIERS');
        console.log('='.repeat(80) + '\n');

        await this.testEndpoint('GET', '/titres-fonciers?page=0&size=10', 'Get titres fonciers');

        // Print summary
        this.printSummary();
    }

    private printSummary(): void {
        console.log('\n' + '='.repeat(80));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(80) + '\n');

        const passed = this.results.filter(r => r.success).length;
        const failed = this.results.filter(r => !r.success).length;
        const total = this.results.length;
        const avgResponseTime = Math.round(
            this.results.reduce((sum, r) => sum + r.responseTime, 0) / total
        );

        console.log(`✅ Passed: ${passed}/${total}`);
        console.log(`❌ Failed: ${failed}/${total}`);
        console.log(`⏱️  Average Response Time: ${avgResponseTime}ms\n`);

        if (failed > 0) {
            console.log('Failed endpoints:');
            this.results
                .filter(r => !r.success)
                .forEach(r => {
                    console.log(`  - [${r.method}] ${r.endpoint} (Status: ${r.status})`);
                });
        }

        const slowEndpoints = this.results.filter(r => r.responseTime > 1000);
        if (slowEndpoints.length > 0) {
            console.log('\nSlow endpoints (>1000ms):');
            slowEndpoints.forEach(r => {
                console.log(`  - [${r.method}] ${r.endpoint} (${r.responseTime}ms)`);
            });
        }

        if (failed === 0) {
            console.log('\n🎉 ALL TESTS PASSED! 🎉');
        }
    }
}

// Run tests
const tester = new APITestSuite();
tester.runAllTests().catch(console.error);
