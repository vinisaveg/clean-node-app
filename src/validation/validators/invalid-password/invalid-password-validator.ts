import { Validation } from "@/validation/protocols/validation";
import { PasswordValidator } from "@/validation/protocols/password-validator";
import { InvalidFieldError } from "@/presentation/errors/invalid-field-error";

export class InvalidPasswordValidator implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly passwordValidator: PasswordValidator
  ) {}

  validate(input: Record<string, string>): Error | null {
    const isValid = this.passwordValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidFieldError("password");
    }

    return null;
  }
}
