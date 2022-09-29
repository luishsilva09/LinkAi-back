import * as authRepository from "../repositories/authRespositorie";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import { IuserData, signinData } from "../types/authTypes";
import { unauthorizedError } from "../utils/errorUtils";

dotenv.config();
const secretKey = process.env.SECRET_KEY || "muitosecreto";

async function findUser(email: string) {
  return await authRepository.find(email);
}

export async function signup(newUserData: IuserData) {
  const userData = await findUser(newUserData.email);
  if (userData) throw unauthorizedError("Não autorizado");

  const cryptPassword = bcrypt.hashSync(newUserData.password, 10);
  const inserData = {
    name: newUserData.name,
    email: newUserData.email,
    password: cryptPassword,
    urlId: uuid(),
  };
  await authRepository.create(inserData);
}

export async function signin(signinData: signinData) {
  const userData = await findUser(signinData.email);
  if (!userData) throw unauthorizedError("Verifique seus dados");

  const confirmPassword = bcrypt.compareSync(
    signinData.password,
    userData.password
  );
  if (!confirmPassword) throw unauthorizedError("Verifique seus dados");

  const token = jwt.sign({ id: userData.id, name: userData.name }, secretKey);

  return { token };
}
