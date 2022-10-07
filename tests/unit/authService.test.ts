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
