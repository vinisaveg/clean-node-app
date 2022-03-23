import { Validation } from "@/validation/protocols/validation";
import { MissingFieldError } from "@/presentation/errors/missing-field-error";

export class MissingFieldValidator implements Validation {
  constructor(private readonly fieldName: string) {}

  validate<T>(input: Record<string, T>): Error | null {
    if (!input[this.fieldName]) {
      return new MissingFieldError(this.fieldName);
    }

    return null;
  }
}
