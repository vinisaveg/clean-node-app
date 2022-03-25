import { InvalidPasswordValidatorAdapter } from "@/infra/validators/invalid-password/invalid-password-validator-adapter";

import faker from "@faker-js/faker";

type SutTypes = {
  sut: InvalidPasswordValidatorAdapter;
};

const makeSut = (): SutTypes => {
  const sut = new InvalidPasswordValidatorAdapter();

  return {
    sut,
  };
};

describe("Invalid Password Validator adapter", () => {
  it("Should return true if password is valid", () => {
    const { sut } = makeSut();

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
    const { sut } = makeSut();

    const weakPassword = faker.random.word();

    const result = sut.isValid(weakPassword);

    expect(result).toBe(false);
  });
});
