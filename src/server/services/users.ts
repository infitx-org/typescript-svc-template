import { User } from '../models';

const users: Array<User> = [];

export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>;

export class UsersService {

    public get(id: number): User | null {
        const foundUser = users.find(user => user.id === id);
        if(!foundUser) return null;
        return foundUser;
    }

    public getUsers(name?: string): Array<User> {
        return users.filter(user => user.name === name);
    }

    public create(userCreationParams: UserCreationParams): User {
        const user: User = {
            id: Math.floor(Math.random() * 10000), // Random
            status: 'Happy',
            ...userCreationParams,
        };
        users.push(user);
        return user; 
    }

    public getAll(): Array<User> {
        return users;
    }
}