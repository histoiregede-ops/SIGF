import axios from 'axios';
import fs from 'fs';

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}/api/v1`;

async function runSmokeTest() {
    console.log('\n🚀 --- DÉMARRAGE DU SMOKE TEST AVANCÉ SIGEF --- 🚀');
    console.log(`📡 Cible : ${BASE_URL}\n`);
    
    let exitCode = 0;
    let token = '';
    const report = { pass: 0, fail: 0 };
    const details: string[] = [];

    const COMMUN_RESOURCES = [
        'typesRegistre', 'formesJuridiques', 'periodes', 'regions', 'prefectures', 
        'communes', 'cantons', 'villes', 'villages', 'quartiers', 'qualitesDocument', 
        'typesPersonneMorale', 'typesRelationLegale', 'typesLienGroupe', 'civilites', 
        'nationalites', 'professions', 'secteursActivite', 'piecesIdentite'
    ];

    // Helper function for individual endpoint tests
    const test = async (name: string, method: string, url: string, data?: any) => {
        const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            if (method === 'GET') await axios.get(fullUrl, config);
            else if (method === 'POST') await axios.post(fullUrl, data, config);
            else if (method === 'PUT') await axios.put(fullUrl, data, config);
            else if (method === 'DELETE') await axios.delete(fullUrl, config);
            console.log(`✅ [${method}] PASS : ${url}`);
            details.push(`- ✅ PASS : ${name} ([${method}] ${url})`);
            report.pass++;
        } catch (e: any) {
            const status = e.response?.status || 'CRASH';
            console.error(`❌ [${method}] FAIL : ${url} (${status})`);
            if (e.response?.data) console.error(`   Note: ${JSON.stringify(e.response.data)}`);
            details.push(`- ❌ FAIL : ${name} ([${method}] ${url} - Status: ${status})`);
            report.fail++;
            exitCode = 1;
        }
    };

    // Helper function for full CRUD testing
    async function testCrud(resourceName: string, baseUrl: string, createData: any, updateData: any) {
        let createdId: string | number | null = null;
        const resourceUrl = `${baseUrl}/${resourceName}`;

        console.log(`\n--- CRUD Test for ${resourceName} ---`);

        // 1. POST (Create)
        try {
            const res = await axios.post(resourceUrl, createData, { headers: { Authorization: `Bearer ${token}` } });
            createdId = res.data.data.id;
            console.log(`✅ [POST] PASS : ${resourceUrl} (Created ID: ${createdId})`);
            report.pass++;
        } catch (e: any) {
            console.error(`❌ [POST] FAIL : ${resourceUrl} (Create) (${e.response?.status || 'CRASH'})`);
            if (e.response?.data) console.error(`   Note: ${JSON.stringify(e.response.data)}`);
            report.fail++;
            return; // Cannot proceed with CRUD without creation
        }

        if (!createdId) {
            console.error(`❌ [POST] FAIL : ${resourceUrl} (No ID returned after creation)`);
            report.fail++;
            return;
        }

        // 2. GET (Detail)
        await test(`Detail ${resourceName}`, 'GET', `${resourceUrl}/${createdId}`);

        // 3. PUT (Update)
        await test(`Update ${resourceName}`, 'PUT', `${resourceUrl}/${createdId}`, updateData);

        // 4. DELETE
        await test(`Delete ${resourceName}`, 'DELETE', `${resourceUrl}/${createdId}`);
    }

    // 1. Baseline & Connectivité
    await test('Root API', 'GET', '/');

    // 2. Module Authentification
    // Note: This login is critical for subsequent tests, so it's handled outside the generic 'test' function
    // to provide specific error messages.
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, {
            identifiant: 'admin',
            motDePasse: 'test12348'
        });
        token = res.data.token || res.data.data?.token;
        console.log('🔑 Authentification : OK');
        report.pass++;
    } catch (e) {
        console.error('❌ Echec Login Admin');
        report.fail++;
    }

    if (token) {
        // --- Module AUTH (Read-only for now, CRUD can be added for Utilisateur/Profil) ---
        console.log('\n--- 📂 SCAN DU MODULE AUTH ---');
        await test('List Profils', 'GET', '/auth/profils');
        await test('Count Utilisateurs', 'GET', '/auth/utilisateurs/statistics/count'); // Test collision

        console.log('\n--- 📂 SCAN DU MODULE COMMUN (DICTIONNAIRES) ---');
        for (const res of COMMUN_RESOURCES) {
            await test(`List ${res}`, 'GET', `/commun/${res}`);
            await test(`Count ${res}`, 'GET', `/commun/${res}/statistics/count`);

            // On ne teste le CRUD complet que pour les ressources simples ou configurées
            // pour éviter les échecs dus aux contraintes de clés étrangères (FK)
            if (['regions', 'civilites', 'nationalites'].includes(res)) {
                const createData = { libelle: `Test ${res} ${Date.now()}`, code: `C-${Date.now()}` };
                const updateData = { libelle: `Updated ${res}` };
                await testCrud(res, `${BASE_URL}/commun`, createData, updateData);
            } else {
                console.log(`⏭️ SKIP : CRUD complet pour ${res} (vérification lecture seule uniquement)`);
            }
        }

        console.log('\n--- 📂 SCAN DU MODULE INDEXATION ---');
        const indRes = ['dossiers', 'fichiers', 'tachesIndexation', 'progressionsTachesIndexation', 'donneesIndexation'];
        for (const res of indRes) {
            await test(`List ${res}`, 'GET', `/indexation/${res}`);
            await test(`Count ${res}`, 'GET', `/indexation/${res}/statistics/count`);

            // CRUD for Indexation resources is complex due to FK dependencies.
            // Example for 'dossiers':
            // if (res === 'dossiers') {
            //     const dossierCreateData = { nom: `Dossier Test ${Date.now()}` };
            //     const dossierUpdateData = { nom: `Dossier Updated ${Date.now()}` };
            //     await testCrud(res, `${BASE_URL}/indexation`, dossierCreateData, dossierUpdateData);
            // }
            // For 'fichiers', 'tachesIndexation', etc., you'd need to create parent entities first.
            console.log(`⏭️ SKIP : CRUD tests for /indexation/${res} (complex dependencies)`);
        }

        console.log('\n--- 📂 SCAN DU MODULE TITRES-FONCIERS ---');
        await test('List Titres', 'GET', '/titres-fonciers');
        await test('Count Titres', 'GET', '/titres-fonciers/statistics/count');
        await test('Search Titre by Numero', 'GET', `/titres-fonciers/numero/TF-12345`); // Will likely 404 if not created

        // Full CRUD for TitresFoncier
        const titreFoncierCreateData = {
            numero: `TF-${Date.now()}`,
            description: 'Titre foncier de test créé par smoke test',
            // Add other required fields if any, e.g., typeRegistreId, regionId
        };
        const titreFoncierUpdateData = {
            description: 'Titre foncier de test mis à jour par smoke test',
        };
        await testCrud('titres-fonciers', `${BASE_URL}`, titreFoncierCreateData, titreFoncierUpdateData);
    }

    // Résumé final
    console.log('\n--- 📊 RÉSUMÉ DU RAPPORT ---');
    console.log(`✅ Succès : ${report.pass}`);
    console.log(`❌ Échecs : ${report.fail}`);
    
    if (report.fail > 0) {
        console.log('\n⚠️  CONSEILS :');
        console.log('1. Si Titres-Fonciers échoue, vérifie que src/modules/titres-fonciers/routes.ts existe.');
        console.log('2. Si les stats renvoient 404, vérifie l\'ordre des routes (statistiques avant :id).');
        console.log('3. Si le login échoue, vérifie que le script create-admin-seed a bien tourné.');
        exitCode = 1;
    }

    // Génération du rapport Markdown
    const reportContent = `# Rapport d'Audit Avancé des Endpoints SIGEF API
**Date du test :** ${new Date().toLocaleString()}
**Base URL :** \`${BASE_URL}\`
**Statut :** ${report.fail === 0 ? 'Opérationnel' : 'Erreurs détectées'}

## Résumé
- ✅ PASS : ${report.pass}
- ❌ FAIL : ${report.fail}

## Détails
${details.join('\n')}`;

    fs.writeFileSync('SMOKE_TEST_REPORT_ADVANCED.md', reportContent);
    console.log('\n📝 Rapport généré : SMOKE_TEST_REPORT_ADVANCED.md');

    console.log(exitCode === 0 ? '\n🎉 TOUS LES SYSTÈMES SONT OPÉRATIONNELS !' : '\n⚠️ DES ERREURS ONT ÉTÉ DÉTECTÉES.');
    process.exit(exitCode);
}

runSmokeTest();