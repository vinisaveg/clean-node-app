import { LoginParams } from "@/domain/use-cases/login";

import { faker } from "@faker-js/faker";

export const mockLoginParams = (
  email = faker.internet.email(),
  password = faker.internet.password()
): LoginParams => {
  return {
    email,
    password,
  };
};
