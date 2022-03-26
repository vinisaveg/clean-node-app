import { InvalidEmailValidatorAdapter } from "@/infra/validators/invalid-email/invalid-email-validator-adapter";
import { InvalidPasswordValidatorAdapter } from "@/infra/validators/invalid-password/invalid-password-validator-adapter";
import { ValidationComposite } from "@/validation/composite/validation-composite";
import { Validation } from "@/validation/protocols/validation";
import { InvalidEmailValidator } from "@/validation/validators/invalid-email/invalid-email-validator";
import { InvalidPasswordValidator } from "@/validation/validators/invalid-password/invalid-password-validator";
import { MissingFieldValidator } from "@/validation/validators/missing-field/missing-field-validator";

export const makeSignUpValidation = (): Validation => {
  const validators = [];

  for (const field of ["name", "email", "password"]) {
    validators.push(new MissingFieldValidator(field));
  }

  const invalidPasswordValidatorAdapter = new InvalidPasswordValidatorAdapter();
  validators.push(
    new InvalidPasswordValidator("password", invalidPasswordValidatorAdapter)
  );

  const invalidEmailValidatorAdapter = new InvalidEmailValidatorAdapter();
  validators.push(
    new InvalidEmailValidator("email", invalidEmailValidatorAdapter)
  );

  return new ValidationComposite(validators);
};
