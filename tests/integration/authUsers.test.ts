import { prisma } from "../../src/dbStrategy/database";
import supertest from "supertest";
import app from "../../src/app";
import * as userFactory from "../factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

afterAll(() => {
  prisma.$disconnect();
});

describe("Users authentication ", () => {
  it("Create new user", async () => {
    const dataUser = userFactory.newUser();

    const result = await supertest(app).post("/users/signup").send(dataUser);
    const createdUser = await prisma.user.findUnique({
      where: { email: dataUser.email },
    });

    expect(result.status).toBe(201);
    expect(createdUser).not.toBe(null);
  });
  it.todo("Do a login with new user");
  it.todo("Not exist user");
  it("Do a login with new user", async () => {
    const dataUser = userFactory.newUser();

    await supertest(app).post("/users/signup").send(dataUser);
    const result = await supertest(app)
      .post("/users/signin")
      .send({ email: dataUser.email, password: dataUser.password });

    expect(result.status).toBe(200);
  });
});
