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
async function createLink(token: string) {
  const linkData = linkFactory.newLink();
  const authUser = { Authorization: `Bearer ${token}` };

  return await supertest(app)
    .post("/links/create")
    .send(linkData)
    .set(authUser);
}
describe("Links tests /links", () => {
  it("Create new link", async () => {
    const token = await returnToken();
    const result = await createLink(token);

    expect(result.status).toBe(201);
    expect(result.body).not.toBe(null);
  });
  it("Delete a link", async () => {
    const token = await returnToken();
    const authUser = { Authorization: `Bearer ${token}` };
    const createdLink = await createLink(token);

    const result = await supertest(app)
      .delete(`/links/${createdLink.body.id}`)
      .set(authUser);

    const deleted = await prisma.link.findUnique({
      where: { id: createdLink.body.id },
    });

    expect(result.status).toBe(200);
    expect(deleted).toBe(null);
  });
  it("Get all user links", async () => {
    const token = await returnToken();
    const authUser = { Authorization: `Bearer ${token}` };
    await createLink(token);

    const result = await supertest(app).get("/links").set(authUser);

    expect(result.status).toBe(200);
    expect(result.body).not.toBe(null);
  });
});
