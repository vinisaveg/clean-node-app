import { Login, LoginParams, LoginResult } from "@/domain/use-cases/login";
import { badRequest, forbidden, ok } from "@/presentation/helpers/http-helper";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { InvalidCredentialsError } from "@/presentation/errors/invalid-credentials-error";
import { Validation } from "@/validation/protocols/validation";

export class LoginController implements Controller<LoginParams, LoginResult> {
  constructor(
    private readonly remoteLogin: Login,
    private readonly validation: Validation
  ) {}

  async handle(request: LoginParams): Promise<HttpResponse<LoginResult>> {
    const error = this.validation.validate(request);

    if (error) {
      return badRequest(error);
    }

    const loginResult = await this.remoteLogin.execute(request);

    if (loginResult.result) {
      return ok(loginResult);
    }

    return forbidden(new InvalidCredentialsError());
  }
}
