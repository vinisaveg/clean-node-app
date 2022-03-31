import { Login, LoginParams, LoginResult } from "@/domain/use-cases/login";

export class RemoteLoginSpy implements Login {
  loginParams: LoginParams;
  result: boolean;

  async execute(data: LoginParams): Promise<LoginResult> {
    this.loginParams = data;

    return {
      result: this.result,
    };
  }
}
