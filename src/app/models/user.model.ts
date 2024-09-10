export interface IUser {
      personName: string;
      personEmail: string;
      userPassword:string;
  }
  
  export class User implements IUser {
    personName: string;
    personEmail: string;
    userPassword:string;
  
    constructor(name: string, email: string, password: string) {
      this.personName = name;
      this.personEmail = email;
      this.userPassword = password;
    }
  }
  