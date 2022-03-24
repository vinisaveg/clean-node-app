import { Validation } from "@/validation/protocols/validation";

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Array<Validation>) {}

  validate(input: Record<string, any>): Error | null {
    for (const validation of this.validations) {
      const error = validation.validate(input);

      if (error) {
        return error;
      }
    }

    return null;
  }
}
