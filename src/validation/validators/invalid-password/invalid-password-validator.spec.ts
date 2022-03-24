import { InvalidPasswordValidator } from "@/validation/validators/invalid-password/invalid-password-validator";
import { PasswordValidatorSpy } from "./test/password-validator-spy";
import { InvalidFieldError } from "@/presentation/errors/invalid-field-error";

import faker from "@faker-js/faker";

describe("Invalid Password validator", () => {
  it("Should return null if password is valid", () => {
    const passwordValidatorSpy = new PasswordValidatorSpy();
    const sut = new InvalidPasswordValidator("password", passwordValidatorSpy);
    passwordValidatorSpy.result = true;

    const validPassword = faker.internet.password();

    const error = sut.validate({ password: validPassword });

    expect(error).toBe(null);
  });

  it("Should return an InvalidFieldError if password is invalid", () => {
    const passwordValidatorSpy = new PasswordValidatorSpy();
    const sut = new InvalidPasswordValidator("password", passwordValidatorSpy);
    passwordValidatorSpy.result = false;

    const invalidPassword = faker.internet.password();

    const error = sut.validate({ password: invalidPassword });

    expect(error).toEqual(new InvalidFieldError("password"));
  });
});
