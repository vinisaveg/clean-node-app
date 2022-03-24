import { PasswordValidator } from "@/validation/protocols/password-validator";

export class PasswordValidatorSpy implements PasswordValidator {
  password: string;
  result: boolean;

  isValid(password: string): boolean {
    this.password = password;

    return this.result;
  }
}
