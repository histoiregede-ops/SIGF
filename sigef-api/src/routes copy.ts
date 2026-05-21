import express, { Request, Response } from "express";
import AuthRoutes from "./modules/auth/AuthRoutes";
import TestController from "../test/TestController";

const router = express.Router();

const handleHelloGet = async (req: Request, res: Response): Promise<any> => {
    // Simulate an asynchronous operation
    const message = await new Promise<string>((resolve) =>
        setTimeout(() => resolve('Hello, world!'), 500)
    );

    const condition = true; // Example condition (you can modify it)

    // Handle conditional responses
    if (condition) {
        return res.json({ message });
    }
    
    return res.json({ message2: 'Alternate message' });
};

router
    .get('', async (req: Request, res: Response) => {
        res.send("Hello world");
    })
    // .get('/test', TestController.test)
    .get('/test2', handleHelloGet)
    .use('/auth', AuthRoutes)

    // Not found
    .use('*', (req: Request, res: Response): void => {
        res.status(404).json({
            success: false,
            message: 'Ressource non trouvée'
        });
    })

export default router;