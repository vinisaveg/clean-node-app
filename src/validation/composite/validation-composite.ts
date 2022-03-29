import { Validation } from "@/validation/protocols/validation";

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Array<Validation>) {}

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
