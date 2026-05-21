import { Sequelize, DataTypes, Dialect } from 'sequelize';

export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private _sequelize: Sequelize | null = null;
    private isInitialized: boolean = false;

    private constructor() { }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    public async init(): Promise<Sequelize> {
        if (!this._sequelize) {
            this._sequelize = this.createSequelize();
        }
        if (this.isInitialized) return this._sequelize;

        try {
            await this._sequelize.authenticate();
            this.isInitialized = true;
            console.log('✅ Sequelize connected successfully');
            return this._sequelize;
        } catch (error) {
            console.error('❌ Sequelize connection failed:', error);
            throw error;
        }
    }

    public getSequelize(): Sequelize {
        if (!this._sequelize) {
            this._sequelize = this.createSequelize();
        }
        return this._sequelize;
    }

    private createSequelize(): Sequelize {
        return new Sequelize({
            dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 3306,
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'nlf',
            logging: process.env.NODE_ENV === 'development' ? console.log : false,
            sync: {
                force: process.env.NODE_ENV === 'test',
                alter: process.env.NODE_ENV === 'development' && process.env.DB_SYNC === 'alter',
            },
            pool: {
                max: 20, // Increase pool size for better concurrency
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                timestamps: true,
                paranoid: true,
                underscored: false,
            }
        });
    }

    public get sequelize(): Sequelize {
        if (!this._sequelize) {
            this._sequelize = this.createSequelize();
        }
        return this._sequelize;
    }
}
