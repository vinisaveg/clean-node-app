import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import { AddUserRepository } from "@/data/protocols/user/add-user-repository";
import { CheckEmailRepository } from "@/data/protocols/user/check-email-repository";
import { Hasher } from "@/data/protocols/cryptography/hasher";

export class RemoteSignUp implements SignUp {
  constructor(
    private readonly checkEmailRepository: CheckEmailRepository,
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository
  ) {}

  async execute(data: SignUpParams): Promise<SignUpResult> {
    const isEmailTaken = await this.checkEmailRepository.execute(data.email);

    if (!isEmailTaken) {
      await this.hasher.hash(data.password);

      return this.addUserRepository.execute(data);
    }

    return {
      result: false,
    };
  }
}
