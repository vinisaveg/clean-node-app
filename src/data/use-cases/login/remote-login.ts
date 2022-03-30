import { FindByEmailRepository } from "@/data/protocols/user/find-by-email-repository";
import { Login, LoginParams, LoginResult } from "@/domain/use-cases/login";

export class RemoteLogin implements Login {
  constructor(private readonly findByEmailRepository: FindByEmailRepository) {}

  async execute(data: LoginParams): Promise<LoginResult> {
    const userExists = await this.findByEmailRepository.execute(data.email);

    if (userExists.result) {
      return { result: true };
    }

    return { result: false };
  }
}
