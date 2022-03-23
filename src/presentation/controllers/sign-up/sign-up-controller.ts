import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { EmailTakenError } from "@/presentation/errors/email-taken-error";
import { Validation } from "@/validation/protocols/validation";
import {
  badRequest,
  forbidden,
  serverError,
  created,
} from "@/presentation/helpers/http-helper";

export class SignUpController
  implements Controller<SignUpParams, SignUpResult>
{
  constructor(
    private readonly remoteSignUp: SignUp,
    private readonly validaton: Validation
  ) {}

  async handle(request: SignUpParams): Promise<HttpResponse<SignUpResult>> {
    try {
      const error = this.validaton.validate(request);

      if (error) {
        return badRequest(error);
      }

      const signUpResult = await this.remoteSignUp.execute(request);

      if (!signUpResult.result) {
        return forbidden(new EmailTakenError());
      }

      return created(signUpResult);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
