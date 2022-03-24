import { InvalidPasswordValidator } from "@/validation/validators/invalid-password/invalid-password-validator";
import { PasswordValidatorSpy } from "@/validation/validators/invalid-password/test/password-validator-spy";
import { InvalidFieldError } from "@/presentation/errors/invalid-field-error";

import faker from "@faker-js/faker";

type SutTypes = {
  passwordValidatorSpy: PasswordValidatorSpy;
  password: string;
  sut: InvalidPasswordValidator;
};

const makeSut = (): SutTypes => {
  const passwordValidatorSpy = new PasswordValidatorSpy();
  const sut = new InvalidPasswordValidator("password", passwordValidatorSpy);
  const password = faker.internet.password();

  return {
    passwordValidatorSpy,
    password,
    sut,
  };
};

describe("Invalid Password validator", () => {
  it("Should return null if password is valid", () => {
    const { passwordValidatorSpy, password, sut } = makeSut();
    passwordValidatorSpy.result = true;

    const error = sut.validate({ password });

    expect(error).toBe(null);
  });

  it("Should return an InvalidFieldError if password is invalid", () => {
    const { passwordValidatorSpy, password, sut } = makeSut();
    passwordValidatorSpy.result = false;

    const error = sut.validate({ password });

    expect(error).toEqual(new InvalidFieldError("password"));
  });
});
