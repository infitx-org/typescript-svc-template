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

import { User } from '../models';

const users: Array<User> = [];

export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>;

export class UsersService {

    // Get a user with id
    public get(id: number): User | null {
        const foundUser = users.find(user => user.id === id);
        if(!foundUser) return null;
        return foundUser;
    }

    // Get the users filtering by name
    public getUsers(name?: string): Array<User> {
        return users.filter(user => user.name === name);
    }

    // Create a new user with random id
    public create(userCreationParams: UserCreationParams): User {
        const user: User = {
            id: Math.floor(Math.random() * 10000), // Random
            status: 'Happy',
            ...userCreationParams,
        };
        users.push(user);
        return user; 
    }

    // Get all users
    public getAll(): Array<User> {
        return users;
    }
}