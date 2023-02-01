import { IUserAttributes } from '../db/models';

export interface IUsername {
  username: string;
}

export interface IPassword {
  password: string;
}

export type CredentialType = IUsername & IPassword;

export type NewUserInputType = IUsername &
  IPassword & {
    name: string;
  };

export type AccessTokenType = {
  userInfo: Pick<IUserAttributes, 'username' | 'name' | 'userId' | 'role'>;
};
export type RefreshTokenType = Pick<IUserAttributes, 'username'>;

export type DecodeTokenType = IUsername & {
  userId: string;
};

export type UserRole = 'admin' | 'user';
