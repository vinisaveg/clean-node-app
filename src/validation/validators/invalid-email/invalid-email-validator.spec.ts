import { InvalidFieldError } from "@/presentation/errors/invalid-field-error";
import { InvalidEmailValidator } from "@/validation/validators/invalid-email/invalid-email-validator";
import { EmailValidatorSpy } from "@/validation/validators/invalid-email/test/email-validator-spy";

import faker from "@faker-js/faker";

describe("Invalid Email validator", () => {
  it("Should return InvalidFieldError if e-mail is invalid", async () => {
    const emailValidatorSpy = new EmailValidatorSpy();
    const sut = new InvalidEmailValidator("email", emailValidatorSpy);

    const invalidEmail = faker.random.word();

    emailValidatorSpy.result = false;

    const error = sut.validate({ email: invalidEmail });

    expect(error).toEqual(new InvalidFieldError("email"));
  });

  it("Should return null if e-mail is valid", async () => {
    const emailValidatorSpy = new EmailValidatorSpy();
    const sut = new InvalidEmailValidator("email", emailValidatorSpy);

    const validEmail = faker.internet.email();

    emailValidatorSpy.result = true;

    const error = sut.validate({ email: validEmail });

    expect(error).toBe(null);
  });
});
