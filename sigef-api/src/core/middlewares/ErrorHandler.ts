import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('🔥 Error captured by Global Handler:', {
        message: err.message,
        name: err.name,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method
    });

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Erreur interne du serveur';

    // Gestion spécifique des erreurs Sequelize pour éviter les crashs de connexion
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409;
        message = 'Conflit : Cette ressource existe déjà (Doublon détecté).';
    } else if (err.name === 'SequelizeValidationError') {
        statusCode = 400;
        message = 'Erreur de validation : ' + err.errors.map((e: any) => e.message).join(', ');
    } else if (err.name === 'SequelizeConnectionError') {
        statusCode = 503;
        message = 'Erreur de connexion à la base de données.';
    }

    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
};