import { Validation } from "@/validation/protocols/validation";
import { MissingFieldError } from "@/presentation/errors/missing-field-error";

export class MissingFieldValidator implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingFieldError(this.fieldName);
    }

    return null;
  }
}
