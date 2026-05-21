import * as fs from 'fs/promises'
import sharp from 'sharp'
import { PDFDocument } from 'pdf-lib'
import path from 'path'
import { exec, ExecException } from 'child_process'

export class FileMetadataExtractor {
    private static instance: FileMetadataExtractor

    constructor() {
    }

    public static getInstance(): FileMetadataExtractor {
        if (!FileMetadataExtractor.instance) {
            FileMetadataExtractor.instance = new FileMetadataExtractor()
        }
        return FileMetadataExtractor.instance
    }

    // public async getPdfPageCount(fileBuffer: Buffer): Promise<number | null> {
    //     try {
    //         const pdfDoc = await PDFDocument.load(fileBuffer)
    //         return pdfDoc.getPageCount()
    //     } catch (error) {
    //         console.log(error)
    //         return null
    //     }
    // }

    public async getPdfPageCount(filePath: string): Promise<number | null> {
        try {
            const command = 'pdfinfo ' + path.resolve(filePath)

            return new Promise((resolve, reject) => {
                exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
                    if (error) {
                        return reject(error);
                    }

                    const pagesMatch = stdout.match(/Pages:\s+(\d+)/);
                    if (pagesMatch && pagesMatch[1]) {
                        resolve(Number(pagesMatch[1]))
                    } else {
                        reject('Impossible de déterminer le nombre de pages.')
                    }
                });
            });
        } catch (error) {
            console.log(error)
            return null
        }
    }

    public async getTiffPageCount(filePath: string): Promise<number | null> {
        try {
            const metadata = await sharp(filePath).metadata()
            return metadata.pages ?? null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    public async test(): Promise<void> {
        // let pdfPages = await this.getPdfPageCount("C:/Users/T&B/Documents/_NLF/100MB-TESTFILE.ORG.pdf")
        // let pdfPages = await this.getPdfPageCount("C:/Users/T&B/Documents/_NLF/DEPOT_IMMATRICULATION_66_33250-35582.pdf")
        // let tiffPages = await this.getTiffPageCount("C:/Users/T&B/Documents/_NLF/Test.tiff")

        // console.log("Test test: ", pdfPages)
        // console.log("Test test: ", tiffPages)
        // console.log("Test test: ", this.getPageCount())
    }

    public async getPageCount(fileExtension: string, filePath?: string): Promise<number | null> {
        try {
            if (fileExtension.length == 0) {
                return null
            }
            else if (fileExtension == '.pdf') {
                return await this.getPdfPageCount(filePath)
            } else if (fileExtension == '.tiff' || fileExtension == '.tif') {
                return await this.getTiffPageCount(filePath)
            }
            else {
                return 1
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

}