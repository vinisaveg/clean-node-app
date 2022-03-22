import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";

export class SignUpController implements Controller<SignUpParams> {
  constructor(private readonly remoteSignUp: SignUp) {}

  async handle(request: SignUpParams): Promise<HttpResponse<SignUpResult>> {
    const result = await this.remoteSignUp.execute(request);

    return Promise.resolve({ statusCode: 201, body: result });
  }
}
