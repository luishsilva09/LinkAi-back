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
  it.todo("Delete link");
  it.todo("Get links to view type");
});
