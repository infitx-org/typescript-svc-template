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

import { Context, Document } from 'openapi-backend';
import Express from 'express';
import { User } from '../models';
import { UsersService } from '../services/users';

export default {
    createUser: async (c: Context<Document>, _req: Express.Request, res: Express.Response) => {
      const newUser: User = new UsersService().create(c.request.body);
      return res.status(201).json(newUser);
    },
    getUser: async (c: Context<Document>, _req: Express.Request, res: Express.Response) =>
    {
      const user = new UsersService().get(+c.request.params?.userId);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).send();
      }

    },
    getUsers: async (c: Context<Document>, _req: Express.Request, res: Express.Response) =>
    {
      if (c.request.query?.name) {
        const users = new UsersService().getUsers(c.request.query.name + '');
        return res.status(200).json(users);
      } else {
        const users = new UsersService().getAll();
        return res.status(200).json(users);
      }
    },
}

