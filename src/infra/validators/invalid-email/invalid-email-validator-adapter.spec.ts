import { InvalidEmailValidatorAdapter } from "@/infra/validators/invalid-email/invalid-email-validator-adapter";

import faker from "@faker-js/faker";
import validator from "validator";

type SutTypes = {
  sut: InvalidEmailValidatorAdapter;
  email: string;
};

const makeSut = (isEmailValid: boolean): SutTypes => {
  const sut = new InvalidEmailValidatorAdapter();
  const email = isEmailValid ? faker.internet.email() : faker.random.word();

  return {
    sut,
    email,
  };
};

describe("Invalid Email Validator adapter", () => {
  it("Should call InvalidEmailValidator with correct value", () => {
    const { sut, email } = makeSut(true);

    const isEmailSpy = jest.spyOn(validator, "isEmail");

    sut.isValid(email);

    expect(isEmailSpy).toBeCalledWith(email);
  });

  it("Should return true if e-mail is valid", () => {
    const { sut, email } = makeSut(true);

    const result = sut.isValid(email);

    expect(result).toBe(true);
  });

  it("Should return false if e-mail is invalid", () => {
    const { sut, email } = makeSut(false);

    const result = sut.isValid(email);

    expect(result).toBe(false);
  });
});
