import { Validation } from "@/validation/protocols/validation";

export class ValidationSpy implements Validation {
  error: Error;
  input: any;

  validate(input: any): Error | null {
    this.input = input;

    if (this.error) {
      return this.error;
    }

    return null;
  }
}
