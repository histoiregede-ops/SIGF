import type { Model, ModelStatic } from 'sequelize';
import { TypesRegistre } from '../enums/TypesRegistre';
import { SexesPersonnePhysique } from '../enums/SexesPersonnePhysique';
import { QualiteDocument } from '../../modules/commun/models/QualiteDocument';
import { Periode } from '../../modules/commun/models/Periode';
import { Region } from '../../modules/commun/models/Region';
import { Prefecture } from '../../modules/commun/models/Prefecture';
import { Commune } from '../../modules/commun/models/Commune';
import { Canton } from '../../modules/commun/models/Canton';
import { Village } from '../../modules/commun/models/Village';
import { Ville } from '../../modules/commun/models/Ville';
import { Quartier } from '../../modules/commun/models/Quartier';
import { Civilite } from '../../modules/commun/models/Civilite';
import { Nationalite } from '../../modules/commun/models/Nationalite';
import { Profession } from '../../modules/commun/models/Profession';
import { FormeJuridique } from '../../modules/commun/models/FormeJuridique';
import { SecteurActivite } from '../../modules/commun/models/SecteurActivite';
import { TypePersonneMorale } from '../../modules/commun/models/TypePersonneMorale';
import { TypeRelationLegale } from '../../modules/commun/models/TypeRelationLegale';
import { TypeLienGroupe } from '../../modules/commun/models/TypeLienGroupe';
import { PieceIdentite } from '../../modules/commun/models/PieceIdentite';
import { TypeRegistre } from '../../modules/commun/models/TypeRegistre';
import { DirectionLimite } from '../../modules/gestion-dossiers-legacy/models/DirectionLimite';
import { ModeAcquisition } from '../../modules/gestion-dossiers-legacy/models/ModeAcquisition';
import { ModeAlienation } from '../../modules/gestion-dossiers-legacy/models/ModeAlienation';

async function seedIfEmpty<M extends Model>(
    model: ModelStatic<M>,
    rows: Record<string, unknown>[],
    uniqueKey: string = 'libelle'
): Promise<number> {
    const count = await model.count();
    if (count > 0) {
        return 0;
    }
    for (const row of rows) {
        const key = row[uniqueKey];
        if (key === undefined || key === null) {
            await model.create(row as never);
        } else {
            await model.findOrCreate({
                where: { [uniqueKey]: key } as never,
                defaults: row as never,
            });
        }
    }
    return rows.length;
}

async function seedGeoHierarchy(): Promise<void> {
    if ((await Region.count()) > 0) {
        return;
    }

    const [periodeColoniale] = await Periode.findOrCreate({
        where: { libelle: 'Période coloniale (des cercles)' },
        defaults: { libelle: 'Période coloniale (des cercles)', sigle: 'PC' },
    });
    const [periodeTerritoire] = await Periode.findOrCreate({
        where: { libelle: 'Période du Territoire du Togo' },
        defaults: { libelle: 'Période du Territoire du Togo', sigle: 'TT' },
    });
    const [periodeRepublique] = await Periode.findOrCreate({
        where: { libelle: 'Période de la République togolaise' },
        defaults: { libelle: 'Période de la République togolaise', sigle: 'RT' },
    });

    const regionRows = [
        { libelle: 'Grand Lomé', sigle: 'GL', actuelle: true, periodeId: periodeRepublique.id },
        { libelle: 'Région Maritime', sigle: 'RM', actuelle: true, periodeId: periodeRepublique.id },
        { libelle: 'Région des Plateaux', sigle: 'RP', actuelle: true, periodeId: periodeRepublique.id },
        { libelle: 'Région Centrale', sigle: 'RC', actuelle: true, periodeId: periodeRepublique.id },
        { libelle: 'Région de la Kara', sigle: 'RK', actuelle: true, periodeId: periodeRepublique.id },
        { libelle: 'Région des Savanes', sigle: 'RS', actuelle: true, periodeId: periodeRepublique.id },
        { libelle: 'Cercle de Lomé', sigle: 'CL', actuelle: false, periodeId: periodeColoniale.id },
        { libelle: 'Territoire Togolais', sigle: 'TT', actuelle: false, periodeId: periodeTerritoire.id },
    ];

    const regions: Record<string, Region> = {};
    for (const row of regionRows) {
        const [region] = await Region.findOrCreate({
            where: { libelle: row.libelle },
            defaults: row,
        });
        regions[row.libelle] = region;
    }

    const grandLome = regions['Grand Lomé'];
    const [prefAgoe] = await Prefecture.findOrCreate({
        where: { libelle: 'AGOE-NYIVE' },
        defaults: { libelle: 'AGOE-NYIVE', regionId: grandLome.id },
    });
    const [prefGolfe] = await Prefecture.findOrCreate({
        where: { libelle: 'GOLFE' },
        defaults: { libelle: 'GOLFE', regionId: grandLome.id },
    });

    const communeRows = [
        { libelle: 'AGOE-NYIVE 1', prefectureId: prefAgoe.id },
        { libelle: 'AGOE-NYIVE 2', prefectureId: prefAgoe.id },
        { libelle: 'GOLFE 1', prefectureId: prefGolfe.id },
        { libelle: 'GOLFE 2', prefectureId: prefGolfe.id },
    ];
    const communes: Record<string, Commune> = {};
    for (const row of communeRows) {
        const [commune] = await Commune.findOrCreate({
            where: { libelle: row.libelle },
            defaults: row,
        });
        communes[row.libelle] = commune;
    }

    const cantonRows = [
        { libelle: 'AGOE-NYIVE', communeId: communes['AGOE-NYIVE 1'].id },
        { libelle: 'LEGBASSITO', communeId: communes['AGOE-NYIVE 1'].id },
        { libelle: 'TOGBLEKOPE', communeId: communes['GOLFE 1'].id },
    ];
    const cantons: Record<string, Canton> = {};
    for (const row of cantonRows) {
        const [canton] = await Canton.findOrCreate({
            where: { libelle: row.libelle },
            defaults: row,
        });
        cantons[row.libelle] = canton;
    }

    await Ville.findOrCreate({
        where: { libelle: 'Lomé' },
        defaults: { libelle: 'Lomé', cantonId: cantons['AGOE-NYIVE'].id },
    });
    await Village.findOrCreate({
        where: { libelle: 'Vogan' },
        defaults: { libelle: 'Vogan', cantonId: cantons['TOGBLEKOPE'].id },
    });
    await Quartier.findOrCreate({
        where: { libelle: 'Kégué' },
        defaults: { libelle: 'Kégué' },
    });
}

async function seedTypesRegistre(): Promise<void> {
    const rows = [
        { id: TypesRegistre.FORMALITES_PREALABLES, abbreviation: 'FP', libelle: 'Formalités préalables' },
        { id: TypesRegistre.OPPOSITIONS, abbreviation: 'OPP', libelle: 'Oppositions' },
        { id: TypesRegistre.DEPOTS, abbreviation: 'DPT', libelle: 'Dépôts' },
        { id: TypesRegistre.TITRES_FONCIERS, abbreviation: 'LF', libelle: 'Titres fonciers' },
        { id: TypesRegistre.ACTES, abbreviation: 'ACT', libelle: 'Actes' },
    ];
    for (const row of rows) {
        await TypeRegistre.findOrCreate({
            where: { id: row.id },
            defaults: row,
        });
    }
}

export async function ensureReferenceData(): Promise<void> {
    const seeded: string[] = [];

    const nQualites = await seedIfEmpty(QualiteDocument, [
        { libelle: 'BONNE', description: null, aSignaler: false },
        { libelle: 'ILLISIBLE', description: null, aSignaler: true },
        { libelle: 'MAUVAISE', description: 'Pour les documents dégradés', aSignaler: true },
    ]);
    if (nQualites) seeded.push(`${nQualites} qualités document`);

    await seedTypesRegistre();

    const beforeGeo = await Region.count();
    await seedGeoHierarchy();
    if ((await Region.count()) > beforeGeo || beforeGeo === 0) {
        seeded.push('géographie (périodes, régions, préfectures…)');
    }

    const nCivilites = await seedIfEmpty(Civilite, [
        { libelle: 'Monsieur', abbreviation: 'M.', sexe: SexesPersonnePhysique.MASCULIN },
        { libelle: 'Mademoiselle', abbreviation: 'Mlle', sexe: SexesPersonnePhysique.FEMININ },
        { libelle: 'Madame', abbreviation: 'Mme', sexe: SexesPersonnePhysique.FEMININ },
    ]);
    if (nCivilites) seeded.push(`${nCivilites} civilités`);

    const nNationalites = await seedIfEmpty(Nationalite, [
        { libelle: 'Togolaise', pays: 'TOGO' },
        { libelle: 'Française', pays: 'FRANCE' },
        { libelle: 'Ghanéenne', pays: 'GHANA' },
    ]);
    if (nNationalites) seeded.push(`${nNationalites} nationalités`);

    const nProfessions = await seedIfEmpty(Profession, [
        { libelle: 'Commerçant' },
        { libelle: 'Fonctionnaire' },
        { libelle: 'Agriculteur' },
        { libelle: 'Revendeur' },
    ]);
    if (nProfessions) seeded.push(`${nProfessions} professions`);

    const nFormes = await seedIfEmpty(FormeJuridique, [
        { sigle: null, libelle: 'Non déclarée', declaree: false },
        { sigle: 'SARL', libelle: 'Société à Responsabilité Limitée', declaree: true },
        { sigle: 'SA', libelle: 'Société Anonyme', declaree: true },
    ], 'libelle');
    if (nFormes) seeded.push(`${nFormes} formes juridiques`);

    const nSecteurs = await seedIfEmpty(SecteurActivite, [
        { libelle: 'Informatique', description: null },
        { libelle: 'Commerce', description: null },
        { libelle: 'Bâtiment', description: null },
    ]);
    if (nSecteurs) seeded.push(`${nSecteurs} secteurs d'activité`);

    const nTypesPm = await seedIfEmpty(TypePersonneMorale, [
        { libelle: 'Entreprise' },
        { libelle: 'Collectivité' },
        { libelle: 'Association' },
        { libelle: 'ONG' },
    ]);
    if (nTypesPm) seeded.push(`${nTypesPm} types personne morale`);

    const nTypesRl = await seedIfEmpty(TypeRelationLegale, [
        { libelle: 'Héritiers' },
        { libelle: 'Successeurs' },
        { libelle: 'Conjoint' },
        { libelle: 'Epouse' },
    ]);
    if (nTypesRl) seeded.push(`${nTypesRl} types relation légale`);

    const nTypesLien = await seedIfEmpty(TypeLienGroupe, [
        { libelle: 'Non précisé' },
        { libelle: 'Amis' },
        { libelle: 'Collègues' },
    ]);
    if (nTypesLien) seeded.push(`${nTypesLien} types lien groupe`);

    const nPieces = await seedIfEmpty(PieceIdentite, [
        { libelle: "Carte d'identité nationale (CNI)", categorie: 'personne_physique' },
        { libelle: "Carte d'Electeur", categorie: 'personne_physique' },
        { libelle: 'Carte unique de création d’entreprise', categorie: 'personne_morale' },
        { libelle: 'Carte d’immatriculation fiscale', categorie: 'personne_morale' },
    ]);
    if (nPieces) seeded.push(`${nPieces} pièces d'identité`);

    const nDirections = await seedIfEmpty(DirectionLimite, [
        { libelle: 'Nord', abbreviation: 'N' },
        { libelle: 'Sud', abbreviation: 'S' },
        { libelle: 'Ouest', abbreviation: 'O' },
        { libelle: 'Est', abbreviation: 'E' },
    ]);
    if (nDirections) seeded.push(`${nDirections} directions limite`);

    const nModesAcq = await seedIfEmpty(ModeAcquisition, [
        { libelle: 'Vente' },
        { libelle: 'Donation' },
        { libelle: 'Succession' },
        { libelle: 'Échange' },
    ]);
    if (nModesAcq) seeded.push(`${nModesAcq} modes acquisition`);

    const nModesAli = await seedIfEmpty(ModeAlienation, [
        { libelle: 'Vente' },
        { libelle: 'Donation' },
        { libelle: 'Hypothèque' },
    ]);
    if (nModesAli) seeded.push(`${nModesAli} modes aliénation`);

    if (seeded.length > 0) {
        console.log(`✅ Données de référence initialisées : ${seeded.join(', ')}`);
    }
}

/** @deprecated Utiliser ensureReferenceData */
export const ensureQualitesDocument = ensureReferenceData;
