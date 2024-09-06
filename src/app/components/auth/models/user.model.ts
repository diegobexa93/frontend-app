export interface User {
    username: string;
    email: string;
  }
  
  export class UserLoginResponse implements User {
    username: string;
    email: string;
  
    constructor(data: Partial<User> = {}) {
      this.username = data.username?? '';
      this.email = data.email?? '';
    }
  
  }
  