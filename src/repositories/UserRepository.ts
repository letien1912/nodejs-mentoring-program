const globalUser = [
  {
    "id": 1,
    "name": "Ann",
    "email": "ann@google.com",
    "hobbies": ["books", "sport", "dancing"]
  },
  {
    "id": 2,
    "name": "Ben",
    "email": "ben@google.com",
    "hobbies": ["series", "sport"]
  }
]

export interface IUsers {
  id: number
  name: string
  email: string
  hobbies?: string[]
}

export interface IPatchUser {
  name?: string
  email?: string
}

export class UserRepository {
  users: IUsers[] = [];
  uniqueIds = 0

  constructor() {
    const users = globalUser as IUsers[]
    this.users = users;
    this.uniqueIds = this.users[users.length - 1].id + 1;
  }

  getUsers() {
    return this.users.map(this.skipHobbies)
  }

  getUserById(userId: number): IUsers {
    const user = this.users.find(user => user.id === userId);
    if (!user)
      throw new Error(`User with id ${ userId } not found`);

    return this.skipHobbies(user);
  }

  createUser(newUser: IUsers) {
    const id = this.uniqueIds++;
    this.users.push({
      ...newUser,
      id,
    })
    return id;
  }

  updateUser(userId: number, updatedUserData: IPatchUser) {
    const user = this.getUserById(userId);
    user.name = updatedUserData.name || user.name;
    user.email = updatedUserData.email || user.email;
    return this.skipHobbies(user);
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  addHobby(userId: number, hobbies: string[]): string[] {
    const user = this.users.find(user => user.id === userId);
    if (!user)
      throw new Error(`User with id ${ userId } not found`);

    user.hobbies = user.hobbies || [];
    // @ts-ignore
    const newHobbies = hobbies.filter(hobby => !user.hobbies.includes(hobby));
    user.hobbies.push(...newHobbies);
    return hobbies
  }

  deleteHobby(userId: number, hobby: string) {
    const user = this.users.find(user => user.id === userId);
    if (!user)
      throw new Error(`User with id ${ userId } not found`);

    user.hobbies = user.hobbies || [];
    user.hobbies = user.hobbies.filter(i => i != hobby);
  }

  getHobby(userId: number): string[] {
    const user = this.users.find(user => user.id === userId);
    if (!user)
      throw new Error(`User with id ${ userId } not found`);

    user.hobbies = user.hobbies || [];
    return user.hobbies
  }

  skipHobbies(user: IUsers): IUsers {
    const { hobbies, ...userData } = user;
    return userData;
  }
}

