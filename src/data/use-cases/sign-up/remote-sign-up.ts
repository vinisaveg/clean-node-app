import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import { AddUserRepository } from "@/data/protocols/user/add-user-repository";
import { CheckEmailRepository } from "@/data/protocols/user/check-email-repository";

export class RemoteSignUp implements SignUp {
  constructor(
    private readonly checkEmailRepository: CheckEmailRepository,
    private readonly addUserRepository: AddUserRepository
  ) {}

  async execute(data: SignUpParams): Promise<SignUpResult> {
    const isEmailTaken = await this.checkEmailRepository.execute(data.email);

    if (isEmailTaken) {
      return {
        result: false,
      };
    }

    return this.addUserRepository.execute(data);
  }
}
