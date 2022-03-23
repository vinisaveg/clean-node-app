export class EmailTakenError extends Error {
  constructor() {
    super("The given e-mail is already taken.");
    this.name = "EmailTakenError";
  }
}
