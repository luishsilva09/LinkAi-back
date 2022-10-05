import { faker } from "@faker-js/faker";

export function newLink() {
  return {
    tag: faker.lorem.words(),
    originalLink:
      "https://stackoverflow.com/questions/17690803/node-js-getaddrinfo-enotfound",
  };
}
