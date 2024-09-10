import { Person } from "./person.model";

export interface IUser {
    guidId: string;
    password: string;
    person: Person;
  }
  
  export class User implements IUser {
    guidId: string;
    password: string;
    person: Person;
  
    constructor(guidId: string, password: string, person: Person) {
      this.guidId = guidId;
      this.password = password;
      this.person = person;
    }
  
    validatePassword(): boolean {
      return this.password.length >= 8;
    }
  }
  