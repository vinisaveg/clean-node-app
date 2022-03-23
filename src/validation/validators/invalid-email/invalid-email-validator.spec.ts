import { InvalidFieldError } from "@/presentation/errors/invalid-field-error";
import { InvalidEmailValidator } from "@/validation/validators/invalid-email/invalid-email-validator";
import { EmailValidatorSpy } from "@/validation/validators/invalid-email/test/email-validator-spy";

import faker from "@faker-js/faker";

type SutTypes = {
  emailValidatorSpy: EmailValidatorSpy;
  sut: InvalidEmailValidator;
};

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new InvalidEmailValidator("email", emailValidatorSpy);

  return {
    emailValidatorSpy,
    sut,
  };
};

describe("Invalid Email validator", () => {
  it("Should return InvalidFieldError if e-mail is invalid", async () => {
    const { sut, emailValidatorSpy } = makeSut();

    emailValidatorSpy.result = false;

    const error = sut.validate({ email: faker.random.word() });

    expect(error).toEqual(new InvalidFieldError("email"));
  });

  it("Should return null if e-mail is valid", async () => {
    const { sut, emailValidatorSpy } = makeSut();

    emailValidatorSpy.result = true;

    const error = sut.validate({ email: faker.internet.email() });

    expect(error).toBe(null);
  });
});
