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

import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
} from 'tsoa';
import { User } from '../models';
import { UsersService, UserCreationParams } from '../services/users';

@Route('users')
export class UsersController extends Controller {
    @Get('{userId}')
    public async getUser(
        @Path() userId: number,
    ): Promise<User | null> {
        return new UsersService().get(userId);
    }

    @Get()
    public async getUsers(
        @Query() name?: string,
    ): Promise<Array<User>> {
        return new UsersService().getUsers(name);
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams,
    ): Promise<User> {
        this.setStatus(201); // set return status 201
        const newUser: User = new UsersService().create(requestBody);
        return newUser;
    }
}
