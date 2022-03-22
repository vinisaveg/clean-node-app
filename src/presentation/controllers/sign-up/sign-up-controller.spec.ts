import { SignUpController } from "./sign-up-controller";
import { RemoteSignUpSpy } from "./test/remote-sign-up-spy";
import { mockSignUpParams } from "@/../test/mocks/sign-up/mock-sign-up";

type SutTypes = {
  remoteSignUpSpy: RemoteSignUpSpy;
  sut: SignUpController;
};

const makeSut = (): SutTypes => {
  const remoteSignUpSpy = new RemoteSignUpSpy();
  const sut = new SignUpController(remoteSignUpSpy);

  return {
    remoteSignUpSpy,
    sut,
  };
};

describe("Sign Up controller", () => {
  it("Should call RemoteSignUp with correct values", async () => {
    const { sut, remoteSignUpSpy } = makeSut();

    const request = mockSignUpParams();

    await sut.handle(request);

    expect(remoteSignUpSpy.signUpParams).toEqual({
      name: request.name,
      email: request.email,
      password: request.password,
    });
  });

  it("Should return 201 with correct body if signed up correctly", async () => {
    const { sut } = makeSut();

    const request = mockSignUpParams("name", "name@email.com");

    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toHaveProperty("result", true);
    expect(httpResponse.body).toHaveProperty("name", request.name);
    expect(httpResponse.body).toHaveProperty("accessToken");
  });
});
