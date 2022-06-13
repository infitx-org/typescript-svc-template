/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License                                             *
 ******************************************************************************/

import Express, { Application } from 'express';
import OpenAPIBackend from 'openapi-backend';
import type { Request } from 'openapi-backend';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

import Handlers from './handlers';

import YAML from 'yamljs';
const swaggerSpec = YAML.load(path.join(__dirname, './interface/api.yaml'));

export const app: Application = Express();

// API Docs
app.get('(/doc/*)|(/doc)', (_req, res) => {
    return res.sendFile('static-files/index.html', { root: __dirname });
});

// app.get('/static-files/:filePath(*)', (req, res) => {
//   return res.sendFile(path.join('static-files', req.params.filePath), { root: __dirname });
// });

app.get('/interface/:filePath(*)', (req, res) => {
    return res.sendFile(path.join('interface', req.params.filePath), { root: __dirname });
});

app.use(Express.static('public'));
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            spec: swaggerSpec,
        },
    }),
);

// API middle wares

app.use(Express.json());

// define api
const api = new OpenAPIBackend({
    definition: path.join(__dirname, './interface/api.yaml'),
    handlers: {
        ...Handlers,
        validationFail: async (c, _req: Express.Request, res: Express.Response) =>
            res.status(400).json({ err: c.validation.errors }),
        notFound: async (_c, _req: Express.Request, res: Express.Response) => res.status(404).json({ err: 'not found' }),
    },
});

api.init();

// use as express middleware
app.use((req, res) => api.handleRequest(req as Request, req, res));
