import { SignUpController } from "./sign-up-controller";
import { RemoteSignUpSpy } from "./test/remote-sign-up-spy";
import { mockSignUpParams } from "@/../test/mocks/sign-up/mock-sign-up";
import { EmailTakenError } from "@/presentation/errors/email-taken-error";
import { ServerError } from "@/presentation/errors/server-error";
import { SignUpParams } from "@/domain/use-cases/sign-up";
import { MissingFieldError } from "@/presentation/errors/missing-field-error";
import { ValidationSpy } from "./test/validation-spy";

type SutTypes = {
  remoteSignUpSpy: RemoteSignUpSpy;
  validationSpy: ValidationSpy;
  sut: SignUpController;
};

const makeSut = (): SutTypes => {
  const remoteSignUpSpy = new RemoteSignUpSpy();
  const validationSpy = new ValidationSpy();
  const sut = new SignUpController(remoteSignUpSpy, validationSpy);

  return {
    remoteSignUpSpy,
    validationSpy,
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

  it("Should return 400 if request is invalid", async () => {
    const { sut, validationSpy } = makeSut();

    const request = mockSignUpParams();

    validationSpy.error = new MissingFieldError("password");

    const httpResponse = await sut.handle(request as SignUpParams);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingFieldError("password"));
  });

  it("Should return 403 if e-mail is taken", async () => {
    const { sut, remoteSignUpSpy } = makeSut();

    const request = mockSignUpParams();

    remoteSignUpSpy.result = false;
    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(403);
    expect(httpResponse.body).toEqual(new EmailTakenError());
  });

  it("Should return 500 if RemoteSignUp throws", async () => {
    const { sut, remoteSignUpSpy } = makeSut();

    jest.spyOn(remoteSignUpSpy, "execute").mockImplementationOnce(() => {
      throw new ServerError("Internal server error.");
    });

    const request = mockSignUpParams();
    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(
      new ServerError("Internal server error.")
    );
  });
});
