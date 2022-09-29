export interface IuserData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}
export interface IinserData {
  name: string;
  email: string;
  password: string;
  urlId: string;
}

export type signinData = Omit<IuserData, "repeatePassword">;
