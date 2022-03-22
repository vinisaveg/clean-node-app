import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";

export class SignUpController
  implements Controller<SignUpParams, SignUpResult>
{
  constructor(private readonly remoteSignUp: SignUp) {}

  async handle(request: SignUpParams): Promise<HttpResponse<SignUpResult>> {
    const signUpResult = await this.remoteSignUp.execute(request);

    if (!signUpResult.result) {
      return {
        statusCode: 403,
        body: new Error("This e-mail is already taken."),
      };
    }

    return { statusCode: 201, body: signUpResult };
  }
}
