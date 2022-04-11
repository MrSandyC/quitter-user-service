export class CreateUserDto {
  id: number;

  auth0id: string;

  nickname: string;

  username: string;

  role: string;

  profileUri: string;

  created_at: Date;
}
