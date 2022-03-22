import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";

import faker from "@faker-js/faker";

export class RemoteSignUpSpy implements SignUp {
  signUpParams: SignUpParams;

  execute(data: SignUpParams): Promise<SignUpResult> {
    this.signUpParams = data;

    return Promise.resolve({
      result: true,
      name: data.name,
      accessToken: faker.datatype.uuid(),
    });
  }
}
