import * as linksRepository from "../../src/repositories/linksRepository";
import * as linksService from "../../src/services/linksService";
import * as linksFactory from "../factories/linksFactory";
import * as userFactory from "../factories/userFactory";

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

  it.todo("Not foun link data to delete");
  it.todo("User id and link is not from the same person");
  it.todo("Not foun user data");
  it.todo("Get links to view type");
});
