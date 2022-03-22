import { SignUpController } from "./sign-up-controller";
import { RemoteSignUpSpy } from "./test/remote-sign-up-spy";

import faker from "@faker-js/faker";

describe("Sign Up controller", () => {
  it("Should call RemoteSignUp with correct values", async () => {
    const remoteSignUpSpy = new RemoteSignUpSpy();
    const sut = new SignUpController(remoteSignUpSpy);

    const request = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await sut.handle(request);

    expect(remoteSignUpSpy.signUpParams).toEqual({
      name: request.name,
      email: request.email,
      password: request.password,
    });
  });
});
