export class RegistrationDto {
  email: string;
  password: string;
  userName: string;
  stationName: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class LoginResponse {
  access_token: string
}

