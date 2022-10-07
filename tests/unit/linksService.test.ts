import * as linksRepository from "../../src/repositories/linksRepository";
import * as linksService from "../../src/services/linksService";
import * as linksFactory from "../factories/linksFactory";
import * as userFactory from "../factories/userFactory";
import { Link } from "@prisma/client";
import * as errorUtils from "../../src/utils/errorUtils";

import { prisma } from "../../src/dbStrategy/database";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

afterAll(() => {
  prisma.$disconnect();
});

describe("Unit test on links services", () => {
  it("Crate new link", async () => {
    const linkData = linksFactory.newLink();
    const userData = userFactory.newUser();
    const _userId = 0;

    jest
      .spyOn(linksRepository, "findUser")
      .mockImplementationOnce((): any => userData);

    jest.spyOn(linksRepository, "create").mockImplementationOnce((): any => {});

    await linksService.create(linkData, _userId);

    expect(linksRepository.findUser).toBeCalled();
    expect(linksRepository.create).toBeCalled();
  });
  it("Get all links from user", async () => {
    const userData = userFactory.newUser();
    const _userId = 0;

    jest
      .spyOn(linksRepository, "findUser")
      .mockImplementationOnce((): any => userData);

    await linksService.get(_userId);

    expect(linksRepository.findUser).toBeCalled();
  });
  it("Delete link", async () => {
    const _userId = 1;
    const _linkId = 1;
    const linkData: Link = {
      ...linksFactory.newLink(),
      userId: _userId,
      id: _linkId,
      acessCount: 0,
      previewImage: "",
    };

    jest.spyOn(linksRepository, "findLink").mockResolvedValueOnce(linkData);

    jest.spyOn(linksRepository, "deleteLink").mockResolvedValueOnce();

    await linksService.deleteLink(_linkId, _userId);

    expect(linksRepository.findLink).toBeCalled();
    expect(linksRepository.deleteLink).toBeCalled();
  });

  it("Not found link data to delete", async () => {
    const _userId = 1;
    const _linkId = 1;

    jest
      .spyOn(linksRepository, "findLink")
      .mockImplementationOnce((): any => {});

    const promise = linksService.deleteLink(_linkId, _userId);

    expect(promise).rejects.toEqual(
      errorUtils.notFoundError("Dado não encontrado")
    );
  });
  it("User id and link is not from the same person", async () => {
    const _userId = 1;
    const _linkId = 1;
    const linkData: Link = {
      ...linksFactory.newLink(),
      userId: 0,
      id: _linkId,
      acessCount: 0,
      previewImage: "",
    };

    jest.spyOn(linksRepository, "findLink").mockResolvedValueOnce(linkData);

    const promise = linksService.deleteLink(_linkId, _userId);

    expect(promise).rejects.toEqual(
      errorUtils.unauthorizedError("Você não possui permissão para executar")
    );
  });
  it("Not foun user data", async () => {
    const linkData = linksFactory.newLink();
    const _userId = 0;
    jest
      .spyOn(linksRepository, "findUser")
      .mockImplementationOnce((): any => {});

    const promise = linksService.create(linkData, _userId);

    expect(promise).rejects.toEqual(
      errorUtils.notFoundError("Dados não encontrados")
    );
  });
  it("Get links to view type", async () => {
    const _urlId = "notExist";

    jest
      .spyOn(linksRepository, "viewLinks")
      .mockImplementationOnce((): any => {});

    await linksService.viewLinks(_urlId);

    expect(linksRepository.viewLinks).toBeCalled();
  });
});
