import { Validation } from "@/validation/protocols/validation";

export class ValidationSpy implements Validation {
  error: Error;
  input: object;

  validate(input: object): Error | null {
    this.input = input;

    if (this.error) {
      return this.error;
    }

    return null;
  }
}
