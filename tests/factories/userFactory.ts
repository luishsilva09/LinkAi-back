import { faker } from "@faker-js/faker";

export function newUser() {
  const password = faker.internet.password();
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: password,
    repeatPassword: password,
    imageUrl: faker.image.avatar(),
  };
}
