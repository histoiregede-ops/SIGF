import { z } from 'zod';

export const createTitreFoncierSchema = z.object({
  body: z.object({
    numeroPrefixe: z.string().min(1).max(3),
    numero: z.number().optional(),
    numeroSuffixe: z.string().optional(),
    processusCreation: z.enum(['IMMATRICULATION', 'MORCELLEMENT', 'COPROPRIETE']),
    numeroRequisition: z.string().optional(),
    statut: z.enum(['A_COMPLETER', 'A_VALIDER', 'VALIDE', 'ANNULE']),
    utilisateurId: z.string(),
    // Add other fields
  }),
});


export const updateTitreFoncierSchema = createTitreFoncierSchema.partial();

export type CreateTitreFoncierDto = z.infer<typeof createTitreFoncierSchema.shape.body>;

