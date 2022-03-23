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

    remoteSignUpSpy.result = true;
    await sut.handle(request);

    expect(remoteSignUpSpy.signUpParams).toEqual({
      name: request.name,
      email: request.email,
      password: request.password,
    });
  });

  it("Should return 201 with correct body if signed up correctly", async () => {
    const { sut, remoteSignUpSpy } = makeSut();

    const request = mockSignUpParams("name", "name@email.com");

    remoteSignUpSpy.result = true;
    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toHaveProperty("result", true);
    expect(httpResponse.body).toHaveProperty("name", request.name);
    expect(httpResponse.body).toHaveProperty("accessToken");
  });

  it("Should return 403 if e-mail is taken", async () => {
    const { sut, remoteSignUpSpy } = makeSut();

    const request = mockSignUpParams();

    remoteSignUpSpy.result = false;
    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(403);
    expect(httpResponse.body).toEqual(
      new Error("This e-mail is already taken.")
    );
  });

  it("Should return 500 if RemoteSignUp throws", async () => {
    const { sut, remoteSignUpSpy } = makeSut();

    jest.spyOn(remoteSignUpSpy, "execute").mockImplementationOnce(() => {
      throw new Error("Server Error.");
    });

    const request = mockSignUpParams();
    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new Error("Server Error."));
  });
});
