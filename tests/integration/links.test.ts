import { prisma } from "../../src/dbStrategy/database";
import supertest from "supertest";
import app from "../../src/app";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE  TABLE links `;
});

afterAll(() => {
  prisma.$disconnect();
});

describe("Links tests /links", () => {
  it.todo("Create new link");
  it.todo("Delete a link");
  it.todo("Get all links");
});
