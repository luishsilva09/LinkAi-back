import { prisma } from "../../src/dbStrategy/database";
import supertest from "supertest";
import app from "../../src/app";
import * as linkFactory from "../factories/linksFactory";
import * as userFactory from "../factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

afterAll(() => {
  prisma.$disconnect();
});

async function returnToken() {
  const userData = userFactory.newUser();

  await supertest(app).post("/users/signup").send(userData);
  const result = await supertest(app)
    .post("/users/signin")
    .send({ email: userData.email, password: userData.password });

  return result.text;
}

describe("Links tests /links", () => {
  it("Create new link", async () => {
    const linkData = linkFactory.newLink();
    const token = await returnToken();

    const authUser = { Authorization: `Bearer ${token}` };
    const result = await supertest(app)
      .post("/links/create")
      .send(linkData)
      .set(authUser);

    expect(result.status).toBe(201);
    expect(result.body).not.toBe(null);
  });
  it("Delete a link", async () => {
    const linkData = linkFactory.newLink();
    const token = await returnToken();
    const authUser = { Authorization: `Bearer ${token}` };
    const createdLink = await supertest(app)
      .post("/links/create")
      .send(linkData)
      .set(authUser);

    const result = await supertest(app)
      .delete(`/links/${createdLink.body.id}`)
      .set(authUser);

    const deleted = await prisma.link.findUnique({
      where: { id: createdLink.body.id },
    });

    expect(result.status).toBe(200);
    expect(deleted).toBe(null);
  });
  it.todo("Get all links");
});
