export interface IUser {
    email?: string;
    username: string;
    password: string;
    success?: boolean;
    message?: string;
    token?: string;
    user?: User;
  }

export class User implements IUser {
    email?: string;
    username: string;
    password: string;
    success?: boolean;
    message?: string;
    token?: string;
    user?: User;


    constructor(user: IUser) {
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
    }
  }
