import { NextFunction, Request, RequestHandler, Response } from 'express'
import jwt from 'jsonwebtoken'

const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is required. Copy .env.example to .env and set a strong secret.');
    }
    return secret;
}

const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.headers['authorization']) {
        res.status(401).json({ success: false, message: 'No access token provided' })
        return;
    }

    const [scheme, accessToken] = req.headers.authorization.split(' ')
    if (scheme !== 'Bearer' || !accessToken) {
        res.status(401).json({ success: false, message: 'Invalid authorization header format' })
        return;
    }

    try {
        const decoded = jwt.verify(accessToken, getJwtSecret()) as unknown as EncodePayload
        (req as any).utilisateurId = decoded.id;
        (req as any).utilisateurIdentifiant = decoded.identifiant;
        (req as any).utilisateurEmail = decoded.email;

        next()
    } catch (error: any) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' })
        return;
    }
}

export default authenticate;

export interface EncodePayload {
    id: number,
    // nom: string,
    // prenoms: string,
    identifiant: string,
    email: string
    // profil: Profil
}