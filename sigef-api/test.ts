import { FileMetadataExtractor } from "./src/core/helpers/FileMetadataExtractor"
import * as fs from "fs"
import * as path from "path"
// import * as fs from "fs/promises"

import { PDFDocument } from "pdf-lib";
import { exec, ExecException } from 'child_process';

// File Metadata Extractor
// const fileMetadataExtractor = FileMetadataExtractor.getInstance()

// console.time('executionTime')
// fileMetadataExtractor.test()
// console.timeEnd('executionTime')

// File Gettings time

// export async function readFileQuickly(filePath: string) {
//     console.log("Starting")
//     return new Promise((resolve, reject) => {
//         console.time('executionTime');
//         let chunks: Uint8Array[] = []
//         let count = 1
//         let totalLength = 0
//         // await fs.readFile("./public/fichiers/6caa792f0f0050f67ae325fda42a61_1740847336437")
//         //     .then(() => {
//         //         console.log("Got it")
//         //     })
//         //     .catch()

//         const stream = fs.createReadStream(filePath, { highWaterMark: 10 * 1024 * 1024 }); // 64 Ko par chunk

//         stream.on('data', (chunk: Buffer) => {
//             chunks.push(chunk)
//             count += 1
//             totalLength += chunk.length
//             console.log(`Lecture d'un chunk de taille : ${count}`, totalLength);
//         });

//         stream.on('end', () => {
//             console.log('Lecture terminée');
//             console.timeEnd('executionTime')
//             console.log(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER >= totalLength)

//             let total = 0
//             for (let index = 0; index < chunks.length; index++) {
//                 const element = chunks[index];
//                 total += element.length
//             }
//             console.log(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER >= totalLength, total == totalLength)

//             try {
//                 const buffer: Buffer = Buffer.concat(chunks, totalLength);
//                 // chunks = []
//                 resolve(buffer);
//             } catch (error) {
//                 reject(error);
//             }
//         });

//         stream.on('error', (err) => {
//             console.error('Erreur de lecture:', err);
//             console.timeEnd('executionTime')
//             reject(err)
//         });
//     })
// }

// function getPageCount(filePath: string): Promise<number | null> {
//     // exec('pdfinfo ' + path.resolve(filePath), (err, stdout, stderr) => {
//     //     if (err) {
//     //         console.error('Erreur lors de l\'exécution de pdfinfo:', err);
//     //         return;
//     //     }
//     //     const pagesMatch = stdout.match(/Pages:\s+(\d+)/);
//     //     if (pagesMatch) {
//     //         console.log(`Nombre de pages: ${pagesMatch[1]}`);
//     //     } else {
//     //         console.log('Impossible de déterminer le nombre de pages.');
//     //     }
//     // });
//     const command = 'pdfinfo ' + path.resolve(filePath)

//     return new Promise((resolve, reject) => {
//         exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
//             if (error) {
//                 return reject(error);
//             }

//             const pagesMatch = stdout.match(/Pages:\s+(\d+)/);
//             if (pagesMatch) {
//                 resolve(Number(pagesMatch[1]))
//             } else {
//                 reject('Impossible de déterminer le nombre de pages.')
//             }
//         });
//     });
// }

// // Use
// const filePath: string = "./public/fichiers/test.pdf";
// const filePath: string = "./public/fichiers/ea61c27d94d7c2c5299a61d860c475_1740564203618";
// const filePath: string = "./public/fichiers/cfa6bad749332c40e28e7b307c2308_1740521664402"
// const filePath: string = "./public/fichiers/d8d97fb25958520c09a008a5f48997_1740847135504"
// const filePath: string = "./public/fichiers/6caa792f0f0050f67ae325fda42a61_1740847336437"

// getPageCount(filePath)
//     .then((value) => {
//         console.log("Value:", value)
//     })
//     .catch((err) => {
//         console.log("Error.........0", err)
//     })

// const tiffFilePath: string = "./public/fichiers/output.tiff.tif"
// console.log("Tiff Page count: ", FileMetadataExtractor.getInstance().getTiffPageCount(tiffFilePath))

// readFileQuickly(filePath)
//     .then(() => {
//         console.log("Finished.........1")
//     })
//     .catch((err) => {
//         console.log("Error.........0", err)
//     })

// async function getPdfPageCount(filePath) {
//     const chunks = [];

//     let count = 1
//     let totalLength = 0
//     for await (const chunk of fs.createReadStream(filePath)) {
//         count += 1
//         console.log(count, totalLength)

//         chunks.push(chunk);
//         totalLength += chunk.length
//     }

//     try {
//         const combined = new Uint16Array(totalLength);

//         let offset = 0;
//         for (const buf of chunks) {
//             combined.set(buf, offset);
//             offset += buf.length;
//         }

//         // const data = Buffer.concat(chunks);

//         await PDFDocument.load(combined.buffer)
//             .then((value) => {
//                 console.log(value.getPageCount())
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     } catch (error) {
//         console.log(error)
//     }
//     // const pdfDocument = await pdfjsLib.getDocument({ data }).promise;
//     // console.log(`PDF has ${pdfDocument.numPages} pages.`);

// }

// console.log("Test");

// getPdfPageCount(filePath)


/**
 * Generate date between interavl
 */
// function generateDates(start: Date, end: Date): Date[] {
//     console.log(start, end)

//     let dates: Date[] = []
//     if(start <= end) {
//         let currentDate: Date = new Date(start)
//         while (currentDate <= end) {
//             dates.push(new Date(currentDate))
//             currentDate.setDate(currentDate.getDate() + 1)
//         }
//     }

//     return dates
// }


// const startDate: Date = new Date(2022, 2, 23)
// const endDate: Date = new Date(2022, 3, 1)
// // const endDate: Date = new Date(Date.now())

// const dates: Date[] = generateDates(startDate, endDate)
// console.log(dates, dates.length)