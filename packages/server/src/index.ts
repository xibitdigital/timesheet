/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import { testRouter } from './test/test.router';
import path from 'path';

const API_ROOT = '/api'

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
const router= express.Router();
const appDir = path.join(process.cwd(), './../', 'cli/build');
const indexFile = path.join(appDir, 'index.html');
console.log('App Files', appDir, indexFile);

/**
*  App Configuration
*/

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(appDir));

/**
 * Routers
 */
router.use(`/test`, testRouter);

app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
    res.sendFile(indexFile);
});


/**
 * Global handlers
 */
app.use(errorHandler);
app.use(notFoundHandler);


/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;


if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}