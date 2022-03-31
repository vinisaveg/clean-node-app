import { mockLoginParams } from "@/../test/mocks/login/mock-login";
import { RemoteLoginSpy } from "@/presentation/controllers/login/test/remote-login-spy";
import { LoginController } from "@/presentation/controllers/login/login-controller";
import { ValidationSpy } from "@/../test/spies/authentication/validation-spy";
import { MissingFieldError } from "@/presentation/errors/missing-field-error";

import faker from "@faker-js/faker";

type SutTypes = {
  remoteLoginSpy: RemoteLoginSpy;
  validationSpy: ValidationSpy;
  sut: LoginController;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const remoteLoginSpy = new RemoteLoginSpy();
  const sut = new LoginController(remoteLoginSpy, validationSpy);

  return {
    remoteLoginSpy,
    validationSpy,
    sut,
  };
};

describe("Login controller", () => {
  it("Should call RemoteLogin with correct values", async () => {
    const { remoteLoginSpy, sut } = makeSut();

    const request = mockLoginParams();

    remoteLoginSpy.result = true;
    await sut.handle(request);

    expect(remoteLoginSpy.loginParams).toEqual(request);
  });

  it("Should return 200 with correct body if logged in correctly", async () => {
    const { remoteLoginSpy, sut } = makeSut();

    const request = mockLoginParams();

    remoteLoginSpy.result = true;
    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toHaveProperty("result", true);
    expect(httpResponse.body).toHaveProperty("name");
    expect(httpResponse.body).toHaveProperty("accessToken");
  });

  it("Should return 400 if request is invalid", async () => {
    const { validationSpy, remoteLoginSpy, sut } = makeSut();

    const request = mockLoginParams();

    remoteLoginSpy.result = true;
    validationSpy.error = new MissingFieldError(faker.database.column());

    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({
      error: {
        name: validationSpy.error.name,
        message: validationSpy.error.message,
      },
    });
  });
});
