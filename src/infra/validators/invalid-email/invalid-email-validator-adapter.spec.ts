import { InvalidEmailValidatorAdapter } from "@/infra/validators/invalid-email/invalid-email-validator-adapter";

import faker from "@faker-js/faker";
import validator from "validator";

describe("Invalid Email Validator adapter", () => {
  it("Should call InvalidEmailValidator with correct value", () => {
    const sut = new InvalidEmailValidatorAdapter();

    const isEmailSpy = jest.spyOn(validator, "isEmail");

    const email = faker.internet.email();

    sut.isValid(email);

    expect(isEmailSpy).toBeCalledWith(email);
  });

  it("Should return true if e-mail is valid", () => {
    const sut = new InvalidEmailValidatorAdapter();

    const email = faker.internet.email();

    const result = sut.isValid(email);

    expect(result).toBe(true);
  });

  it("Should return false if e-mail is invalid", () => {
    const sut = new InvalidEmailValidatorAdapter();

    const invalidEmail = faker.random.word();

    const result = sut.isValid(invalidEmail);

    expect(result).toBe(false);
  });
});
