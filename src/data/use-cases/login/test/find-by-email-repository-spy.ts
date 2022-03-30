import {
  FindByEmailRepository,
  FindByEmailResult,
} from "@/data/protocols/user/find-by-email-repository";

export class FindByEmailRepositorySpy implements FindByEmailRepository {
  result: boolean;
  email: string;

  async execute(email: string): Promise<FindByEmailResult> {
    this.email = email;

    return Promise.resolve({
      result: this.result,
    });
  }
}
