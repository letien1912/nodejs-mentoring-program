import { userdata, UserEntity } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

class UserRepository {
    private users: UserEntity[] = [];

    constructor() {
        this.users.push(userdata)
    }


    create(): UserEntity {
        const newUser: UserEntity = {
            id: uuidv4(),
        };
        this.users.push(newUser);
        return newUser;
    }

    findById(userId: string): UserEntity | undefined {
        return this.users.find(user => user.id === userId);
    }

    delete(userId: string): boolean {
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }

}

export default new UserRepository();
