import * as authRepository from "../../src/repositories/authRespositorie";
import * as authService from "../../src/services/authService";
import * as userFactory from "../factories/userFactory";
import bcrypt from "bcrypt";
import { signinData } from "../../src/types/authTypes";
import * as errorUtils from "../../src/utils/errorUtils";
import { prisma } from "../../src/dbStrategy/database";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

afterAll(() => {
  prisma.$disconnect();
});
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

  it("Error to exist user to create same email", async () => {
    const userData = { ...userFactory.newUser(), id: 0, urlId: "null" };

    jest.spyOn(authRepository, "find").mockResolvedValueOnce(userData);

    const promise = authService.signup(userData);

    expect(promise).rejects.toEqual(
      errorUtils.unauthorizedError("Não autorizado")
    );
  });

  it("Signin wrong email", async () => {
    const userData = userFactory.newUser();
    jest.spyOn(authRepository, "find").mockImplementationOnce((): any => {});

    const promise = authService.signin(userData);

    expect(promise).rejects.toEqual(
      errorUtils.unauthorizedError("Verifique seus dados")
    );
  });
  it("Wrong passwor to login", async () => {
    const userData = userFactory.newUser();
    const signin: signinData = {
      name: userData.name,
      email: userData.email,
      password: "_password",
      repeatPassword: "_password",
      imageUrl: userData.imageUrl,
    };

    jest
      .spyOn(authRepository, "find")
      .mockImplementationOnce((): any => signin);
    const promise = authService.signin(userData);

    expect(promise).rejects.toEqual(
      errorUtils.unauthorizedError("Verifique seus dados")
    );
  });
});
