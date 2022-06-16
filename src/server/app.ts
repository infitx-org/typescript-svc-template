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
import YAML from 'yamljs';
import Handlers from './handlers';

export const app: Application = Express();

// TODO: Remove an option among these for API documentation
// API Docs - Option1 using https://github.com/stoplightio/elements
app.get('(/doc/*)|(/doc)', (_req, res) => {
    return res.sendFile('static-files/index.html', { root: __dirname });
});
// If we want to host the js and css files in our service, we can download them and enable the following section.
// app.get('/static-files/:filePath(*)', (req, res) => {
//   return res.sendFile(path.join('static-files', req.params.filePath), { root: __dirname });
// });
app.get('/interface/:filePath(*)', (req, res) => {
    return res.sendFile(path.join('interface', req.params.filePath), { root: __dirname });
});

// API Docs - Option2 using swagger-ui-express
const swaggerSpec = YAML.load(path.join(__dirname, './interface/api.yaml'));
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

// API middle-wares
// To parse Json in the payload
app.use(Express.json());

// API routes based on the swagger file
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

// Passing the openAPI object as express middle-ware
app.use((req, res) => api.handleRequest(req as Request, req, res));
