import { SignUpParams } from "@/domain/use-cases/sign-up";

import { faker } from "@faker-js/faker";

export const mockSignUpParams = (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): SignUpParams => {
  return {
    name,
    email,
    password,
  };
};
