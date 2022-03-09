import { CheckEmailRepository } from "@/data/protocols/user/check-email-repository";

export class CheckEmailRepositorySpy implements CheckEmailRepository {
  email: string;
  result: boolean;

  check(email: string): Promise<boolean> {
    this.email = email;
    return Promise.resolve(this.result);
  }
}
