export interface IuserData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  imageUrl: string;
}
export interface IinserData {
  name: string;
  email: string;
  password: string;
  urlId: string;
  imageUrl: string;
}

export type signinData = Omit<IuserData, "repeatePassword">;
