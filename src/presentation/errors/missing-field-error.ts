export class MissingFieldError extends Error {
  constructor(fieldName: string) {
    super(`Missing field: ${fieldName}.`);
    this.name = "MissingFieldError";
  }
}
