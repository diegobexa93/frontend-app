export interface IPerson {
    name: string;
    email: string;
  }
  
  export class Person implements IPerson {
    name: string;
    email: string;
  
    constructor(name: string, email: string) {
      this.name = name;
      this.email = email;
    }
  }
  