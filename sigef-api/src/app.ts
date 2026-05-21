import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();

import express, { ErrorRequestHandler } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import http from "http"
import router from "./routes"
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../swagger';
import { DatabaseConnection } from './core/helpers/DatabaseConnection'
import { ensureReferenceData } from './core/helpers/ensureReferenceData'
import TitresFonciersModule from './modules/titres-fonciers/TitresFonciersModule'
import OppositionsModule from './modules/oppositions/OppositionsModule'
import FormalitesModule from './modules/formalites/FormalitesModule'
import DepotsModule from './modules/depots/DepotsModule'


const app = express()
const port: number = Number(process.env.PORT) || 3000
const hostname: string = process.env.HOST || 'localhost'

/** CORS Configuration */
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['http://localhost:4200', 'http://localhost:3000', '*'];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) {
            // Allow requests with no origin like mobile apps or curl
            return callback(null, true);
        }
        if (corsOrigins.includes('*') || corsOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error(`CORS policy violation: origin ${origin} is not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Disposition', 'Content-Type', 'Content-Length'],
    optionsSuccessStatus: 200,
    maxAge: 3600
}

app.use(helmet())
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json({ limit: '1gb' }))
app.use(express.urlencoded({ extended: true, limit: '1gb' }))
app.use(express.static('public'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const API_BASE_URL = "/api/v1"
app.use(API_BASE_URL, router)
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
        return;
    }
    console.error('Unhandled error:', err);
    const isDev = process.env.NODE_ENV === 'development';
    res.status(err.status || 500).json({
        success: false,
        message: isDev ? err.message : 'Internal server error',
        stack: isDev ? err.stack : undefined
    });
}
app.use(errorHandler)

/** HTTP Server setup */
const server = http.createServer(app)

const startServer = async () => {
    const databaseConnection = DatabaseConnection.getInstance();
    if (process.env.SKIP_MIGRATIONS !== 'true') {
      await databaseConnection.init();
      console.log('Database initialized successfully');

      await ensureReferenceData();

      // Initialize module models
      await TitresFonciersModule.initModels();
      await OppositionsModule.initModels();
      await FormalitesModule.initModels();
      await DepotsModule.initModels();
      
    } else {
      console.log('DB init skipped - migrations pending');
    }

    server.listen(port, hostname, () => {
        console.log(`Listening on http://${hostname}:${port}`);
    });
};

startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

export default app;
