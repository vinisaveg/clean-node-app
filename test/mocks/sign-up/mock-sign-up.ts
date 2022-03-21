import { SignUpParams } from "@/domain/use-cases/sign-up";

import { faker } from "@faker-js/faker";

export const mockSignUpParams = (): SignUpParams => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(7),
  };
};
