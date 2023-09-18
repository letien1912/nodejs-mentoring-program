import { IPatchUser, IUsers, UserRepository } from '../repositories/UserRepository';

export class UserController {
  user: UserRepository;

  constructor() {
    this.user = new UserRepository()
  }

  post(user: IUsers) {
    const id = this.user.createUser(user)
    return `User ${ id } has been created`
  }

  get(id?: number): IUsers | IUsers[] {
    return id ? this.user.getUserById(id) : this.user.getUsers()
  }

  put(id: number, user: IPatchUser) {
    return this.user.updateUser(id, user)
  }

  delete(id: number): string {
    this.user.deleteUser(id)
    return `User ${ id } has been removed`
  }

  deleteHobby(id: number, hobby: string): string {
    this.user.deleteHobby(id, hobby)
    return `Hobby ${ hobby } has been removed to User ${ id }`
  }

  getHobby(id: number): string[] {
    return this.user.getHobby(id)
  }

  addHobby(id: number, hobby: string[]): string {
    this.user.addHobby(id, hobby)
    return `Hobby ${ hobby } has been added to User ${ id }`
  }
}


