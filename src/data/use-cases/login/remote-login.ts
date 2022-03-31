import { FindByEmailRepository } from "@/data/protocols/user/find-by-email-repository";
import { Login, LoginParams, LoginResult } from "@/domain/use-cases/login";
import { HasherComparer } from "@/data/protocols/cryptography/hash-comparer";
import { Encrypter } from "@/data/protocols/cryptography/encrypter";

export class RemoteLogin implements Login {
  constructor(
    private readonly findByEmailRepository: FindByEmailRepository,
    private readonly hasher: HasherComparer,
    private readonly encrypter: Encrypter
  ) {}

  async execute(data: LoginParams): Promise<LoginResult> {
    const userExists = await this.findByEmailRepository.execute(data.email);

    if (userExists.result && userExists.user) {
      const isValid = await this.hasher.compare(
        data.password,
        userExists.user.password
      );

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(userExists.user.id);

        return { result: true, name: userExists.user.name, accessToken };
      }
    }

    return { result: false };
  }
}
