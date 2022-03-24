import { InvalidFieldError } from "@/presentation/errors/invalid-field-error";
import { EmailValidator } from "@/validation/protocols/email-validator";
import { Validation } from "@/validation/protocols/validation";

export class InvalidEmailValidator implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate(input: Record<string, string>): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidFieldError("email");
    }

    return null;
  }
}
