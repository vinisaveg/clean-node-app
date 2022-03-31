import { InvalidEmailValidatorAdapter } from "@/infra/validators/invalid-email/invalid-email-validator-adapter";
import { InvalidPasswordValidatorAdapter } from "@/infra/validators/invalid-password/invalid-password-validator-adapter";
import { ValidationComposite } from "@/validation/composite/validation-composite";
import { InvalidEmailValidator } from "@/validation/validators/invalid-email/invalid-email-validator";
import { InvalidPasswordValidator } from "@/validation/validators/invalid-password/invalid-password-validator";
import { MissingFieldValidator } from "@/validation/validators/missing-field/missing-field-validator";
import { makeLoginValidation } from "@/main/factories/validation/login/make-login-validation";

describe("Login Validation factory", () => {
  it("Should return a Validation with correct validators", () => {
    const validators = [];

    for (const field of ["email", "password"]) {
      validators.push(new MissingFieldValidator(field));
    }

    const invalidEmailValidatorAdapter = new InvalidEmailValidatorAdapter();
    validators.push(
      new InvalidEmailValidator("email", invalidEmailValidatorAdapter)
    );

    const invalidPasswordValidatorAdapter =
      new InvalidPasswordValidatorAdapter();
    validators.push(
      new InvalidPasswordValidator("password", invalidPasswordValidatorAdapter)
    );

    const loginValidation = new ValidationComposite(validators);

    const sut = makeLoginValidation();

    expect(sut).toEqual(loginValidation);
  });
});
