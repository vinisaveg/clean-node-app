import { Login, LoginParams, LoginResult } from "@/domain/use-cases/login";
import { forbidden, ok } from "@/presentation/helpers/http-helper";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { InvalidCredentialsError } from "@/presentation/errors/invalid-credentials-error";

export class LoginController implements Controller<LoginParams, LoginResult> {
  constructor(private readonly remoteLogin: Login) {}

  async handle(request: LoginParams): Promise<HttpResponse<LoginResult>> {
    const loginResult = await this.remoteLogin.execute(request);

    if (loginResult.result) {
      return ok(loginResult);
    }

    return forbidden(new InvalidCredentialsError());
  }
}
