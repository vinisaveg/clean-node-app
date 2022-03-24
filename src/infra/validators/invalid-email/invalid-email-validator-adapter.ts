import { EmailValidator } from "@/validation/protocols/email-validator";

import validator from "validator";

export class InvalidEmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    const isValid = validator.isEmail(email);

    return isValid;
  }
}
