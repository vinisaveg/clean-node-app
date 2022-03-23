import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { EmailTakenError } from "@/presentation/errors/email-taken-error";
import { ServerError } from "@/presentation/errors/server-error";

export class SignUpController
  implements Controller<SignUpParams, SignUpResult>
{
  constructor(private readonly remoteSignUp: SignUp) {}

  async handle(request: SignUpParams): Promise<HttpResponse<SignUpResult>> {
    try {
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
