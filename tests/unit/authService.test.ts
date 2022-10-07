import * as authRepository from "../../src/repositories/authRespositorie";
import * as authService from "../../src/services/authService";
import * as userFactory from "../factories/userFactory";
import bcrypt from "bcrypt";
import { signinData } from "../../src/types/authTypes";

describe("Unit test to auth service", () => {
  it("Create a new user", async () => {
    const userData = userFactory.newUser();

    jest.spyOn(authRepository, "find").mockImplementationOnce((): any => {});

    jest.spyOn(authRepository, "create").mockImplementationOnce((): any => {});

    await authService.signup(userData);

    expect(authRepository.find).toBeCalled();
    expect(authRepository.create).toBeCalled();
  });
  it("Signin to with user", async () => {
    const userData = userFactory.newUser();
    const cryptPassword = bcrypt.hashSync(userData.password, 10);
    const signin: signinData = {
      name: userData.name,
      email: userData.email,
      password: cryptPassword,
      repeatPassword: cryptPassword,
      imageUrl: userData.imageUrl,
    };

    jest
      .spyOn(authRepository, "find")
      .mockImplementationOnce((): any => signin);
    const promise = await authService.signin(userData);

    expect(promise).not.toBe(null);
    expect(authRepository.find).toBeCalled();
  });
});
