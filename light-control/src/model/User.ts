export class User {
  pseudo: string;
  email: string;
  password: string;
  role: string;

  constructor(parameters: {
    pseudo: string;
    email: string;
    password: string;
    role: string;
  }) {
    this.pseudo = parameters.pseudo;
    this.email = parameters.email;
    this.password = parameters.password;
    this.role = parameters.role;
  }
}
