import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";

import faker from "@faker-js/faker";

export class RemoteSignUpSpy implements SignUp {
  signUpParams: SignUpParams;
  result: boolean;

  execute(data: SignUpParams): Promise<SignUpResult> {
    this.signUpParams = data;

    return Promise.resolve({
      result: this.result,
      name: data.name,
      accessToken: faker.datatype.uuid(),
    });
  }
}
