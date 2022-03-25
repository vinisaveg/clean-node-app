import { PasswordValidator } from "@/validation/protocols/password-validator";

import validator from "validator";

export class InvalidPasswordValidatorAdapter implements PasswordValidator {
  isValid(password: string): boolean {
    const isValid = validator.isStrongPassword(password);

    return isValid;
  }
}
