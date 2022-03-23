import { EmailValidator } from "@/validation/protocols/email-validator";

export class EmailValidatorSpy implements EmailValidator {
  result: boolean;
  email: string;

  isValid(email: any): boolean {
    this.email = email;
    return this.result;
  }
}
