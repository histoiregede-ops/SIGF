export interface DetailsNumeroTitreFoncier {
    prefixe?: string;
    numero: number;
    suffixe?: string;
    niveau?: string;
    type?: string;
}

export class NumeroTitreFoncierUtils {
    private static instance: NumeroTitreFoncierUtils

    constructor() {
    }

    public static getInstance(): NumeroTitreFoncierUtils {
        if (!NumeroTitreFoncierUtils.instance) {
            NumeroTitreFoncierUtils.instance = new NumeroTitreFoncierUtils()
        }
        return NumeroTitreFoncierUtils.instance
    }

    public test(): void {
        console.log('test')
    }

    public parseNumeroTitreFoncier(numeroTitreFoncier: string): DetailsNumeroTitreFoncier | null {
        // Format Immatriculation: AB-00001-CD
        // const formatImmatriculation = /^([A-Z]{2})-(\d+)-([A-Z]{2})$/;
        const formatImmatriculation = /^(?:(\w+)-)?(\d+)(?:-([\w]+))?$/;

        // Format Copropriete: AB F-00001-DE CD
        // const formatCopropriete = /^([A-Z]{2})\s([A-Z])-(\d+)-([A-Z]{2})\s([A-Z]{2})$/;
        const formatCopropriete = /^(?:(\w+)\s)?([A-Z])-(\d+)(?:-([A-Z]+))?(?:\s(\w+))?$/;

        let match

        if ((match = numeroTitreFoncier.match(formatCopropriete))) {
            const detailsNumeroTitreFoncier: DetailsNumeroTitreFoncier = {
                prefixe: match[1],
                niveau: match[2],
                numero: parseInt(match[3], 10),
                type: match[4],
                suffixe: match[5]
            }
            console.log(detailsNumeroTitreFoncier)

            return detailsNumeroTitreFoncier;
        }

        if ((match = numeroTitreFoncier.match(formatImmatriculation))) {
            const detailsNumeroTitreFoncier: DetailsNumeroTitreFoncier = {
                prefixe: match[1],
                numero: parseInt(match[2], 10),
                suffixe: match[3]
            }
            console.log(detailsNumeroTitreFoncier)

            return detailsNumeroTitreFoncier;
        }

        return null
    }

    // public getProchainNumeroTitreFoncier(value: string): boolean | undefined {
    //     if (value == 'true') {
    //         return true
    //     } else if (value == 'false') {
    //         return false
    //     }
    //     else {
    //         return undefined
    //     }
    // }

}