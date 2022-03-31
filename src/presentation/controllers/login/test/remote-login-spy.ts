import { Login, LoginParams, LoginResult } from "@/domain/use-cases/login";
import faker from "@faker-js/faker";

export class RemoteLoginSpy implements Login {
  loginParams: LoginParams;
  result: boolean;

  async execute(data: LoginParams): Promise<LoginResult> {
    this.loginParams = data;

    return {
      result: this.result,
      name: faker.name.findName(),
      accessToken: faker.random.alphaNumeric(20),
    };
  }
}
