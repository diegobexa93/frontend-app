export interface IUserCreate {
      personName:  string;
      personEmail: string;
      userPassword:string;
  }
  
  export class UserCreate implements IUserCreate {
    personName:  string;
    personEmail: string;
    userPassword:string;
  
    constructor(name: string, email: string, password: string) {
      this.personName = name;
      this.personEmail = email;
      this.userPassword = password;
    }
  }
  

  export interface IUserList {
    personName:  string;
    personEmail: string;
    guidId: string;
    createdAt: Date;
}

export class UserList implements IUserList {
  personName:  string;
  personEmail: string;
  guidId: string;
  createdAt: Date;

  constructor(name: string, email: string, guidId: string, createdAt: Date) {
    this.personName = name;
    this.personEmail = email;
    this.guidId = guidId;
    this.createdAt = createdAt;
  }
}
