export class AuthenticationResponse{
  id: number;
  username: string;
  token!: string;
  role!: string;
  access_token: string;
}