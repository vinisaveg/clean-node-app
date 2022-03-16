import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import { AddUserRepository } from "@/data/protocols/user/add-user-repository";
import { CheckEmailRepository } from "@/data/protocols/user/check-email-repository";
import { Hasher } from "@/data/protocols/cryptography/hasher";
import { Encrypter } from "@/data/protocols/cryptography/encrypter";

export class RemoteSignUp implements SignUp {
  constructor(
    private readonly checkEmailRepository: CheckEmailRepository,
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository,
    private readonly encrypter: Encrypter
  ) {}

  async execute(data: SignUpParams): Promise<SignUpResult> {
    const isEmailTaken = await this.checkEmailRepository.execute(data.email);

    if (!isEmailTaken) {
      const hashedPassword = await this.hasher.hash(data.password);

      const addUserResult = await this.addUserRepository.execute({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });

      const accessToken = await this.encrypter.encrypt(addUserResult.id);

      return {
        result: true,
        name: addUserResult.name,
        accessToken,
      };
    }

    return {
      result: false,
    };
  }
}
