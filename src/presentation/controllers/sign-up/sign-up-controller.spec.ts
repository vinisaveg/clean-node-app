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

  it("Should return 201 with correct body if signed up correctly", async () => {
    const remoteSignUpSpy = new RemoteSignUpSpy();
    const sut = new SignUpController(remoteSignUpSpy);

    const request = {
      name: "name",
      email: "name@email.com",
      password: faker.internet.password(),
    };

    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toHaveProperty("result", true);
    expect(httpResponse.body).toHaveProperty("name", request.name);
    expect(httpResponse.body).toHaveProperty("accessToken");
  });
});
