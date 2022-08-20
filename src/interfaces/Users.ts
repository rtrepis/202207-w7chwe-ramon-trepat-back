export interface UserLogin {
  userName: string;
  password: string;
}

export interface UserSchema {
  id: string;
  userName: string;
  password: string;
}

export interface UserJwtPayload {
  id: string;
  userName: string;
}
