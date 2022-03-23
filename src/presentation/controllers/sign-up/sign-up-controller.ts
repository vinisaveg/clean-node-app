import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { EmailTakenError } from "@/presentation/errors/email-taken-error";
import { ServerError } from "@/presentation/errors/server-error";
import { Validation } from "@/validation/protocols/validation";
import { MissingFieldError } from "@/presentation/errors/missing-field-error";

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
        return { statusCode: 400, body: error };
      }

      const signUpResult = await this.remoteSignUp.execute(request);

      if (!signUpResult.result) {
        return {
          statusCode: 403,
          body: new EmailTakenError(),
        };
      }

      return { statusCode: 201, body: signUpResult };
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(error as string),
      };
    }
  }
}
