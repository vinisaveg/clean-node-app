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
});
