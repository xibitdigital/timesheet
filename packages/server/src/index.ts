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
import { authRouter } from './auth/auth.router';
import path from 'path';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
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

app.get('/', (req: Request, res: Response) => {
    res.sendFile(indexFile);
});


app.use("/authorize", authRouter);
app.use("/test", testRouter);


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