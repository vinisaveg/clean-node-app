import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import { AddUserRepository } from "@/data/protocols/user/add-user-repository";

export class RemoteSignUp implements SignUp {
  constructor(private readonly addUserRepository: AddUserRepository) {}

  execute(data: SignUpParams): Promise<SignUpResult> {
    return this.addUserRepository.execute(data);
  }
}
