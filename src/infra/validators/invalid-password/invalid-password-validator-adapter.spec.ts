import { InvalidPasswordValidatorAdapter } from "@/infra/validators/invalid-password/invalid-password-validator-adapter";

import faker from "@faker-js/faker";

describe("Invalid Password Validator adapter", () => {
  it("Should return true if password is valid", () => {
    const sut = new InvalidPasswordValidatorAdapter();

    const strongPassword = faker.internet.password(
      16,
      false,
      /[a-zA-Z0-9!@#$%^&*]/,
      "aZ0@"
    );

    const result = sut.isValid(strongPassword);

    expect(result).toBe(true);
  });

  it("Should return false if password is invalid", () => {
    const sut = new InvalidPasswordValidatorAdapter();

    const weakPassword = faker.random.word();

    const result = sut.isValid(weakPassword);

    expect(result).toBe(false);
  });
});
