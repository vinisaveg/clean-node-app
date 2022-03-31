import { RemoteSignUp } from "@/data/use-cases/sign-up/remote-sign-up";
import { AddUserRepositorySpy } from "@/data/use-cases/sign-up/test/add-user-repository-spy";
import { CheckEmailRepositorySpy } from "@/data/use-cases/sign-up/test/check-email-repository-spy";
import { EncrypterSpy } from "@/../test/spies/authentication/encrypter-spy";
import { HasherSpy } from "@/data/use-cases/sign-up/test/hasher-spy";
import { mockSignUpParams } from "@/../test/mocks/sign-up/mock-sign-up";

type SutType = {
  checkEmailRepositorySpy: CheckEmailRepositorySpy;
  hasherSpy: HasherSpy;
  addUserRepositorySpy: AddUserRepositorySpy;
  encrypterSpy: EncrypterSpy;
  sut: RemoteSignUp;
};

const makeSut = (): SutType => {
  const checkEmailRepositorySpy = new CheckEmailRepositorySpy();
  const hasherSpy = new HasherSpy();
  const addUserRepositorySpy = new AddUserRepositorySpy();
  const encrypterSpy = new EncrypterSpy();
  const sut = new RemoteSignUp(
    checkEmailRepositorySpy,
    hasherSpy,
    addUserRepositorySpy,
    encrypterSpy
  );

  return {
    checkEmailRepositorySpy,
    hasherSpy,
    addUserRepositorySpy,
    encrypterSpy,
    sut,
  };
};

describe("Remote Sign Up use-case", () => {
  it("Should call checkEmailRepository with correct e-mail value", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    const signUpParams = mockSignUpParams();

    checkEmailRepositorySpy.result = false;

    await sut.execute(signUpParams);

    expect(checkEmailRepositorySpy.email).toBe(signUpParams.email);
  });

  it("Should return false if CheckEmailRepository returns true", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    checkEmailRepositorySpy.result = true;

    const signUpTry = await sut.execute(mockSignUpParams());

    expect(signUpTry.result).toBe(false);
  });

  it("Should return true if CheckEmailRepository returns false", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    checkEmailRepositorySpy.result = false;

    const signUpTry = await sut.execute(mockSignUpParams());

    expect(signUpTry.result).toBe(true);
  });

  it("Should throw error if CheckEmailRepository throws", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    jest
      .spyOn(checkEmailRepositorySpy, "execute")
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = sut.execute(mockSignUpParams());

    await expect(promise).rejects.toThrow();
  });

  it("Should call Hasher with correct value", async () => {
    const { sut, hasherSpy, checkEmailRepositorySpy } = makeSut();

    const signUpParams = mockSignUpParams();

    checkEmailRepositorySpy.result = false;

    await sut.execute(signUpParams);

    expect(hasherSpy.text).toBe(signUpParams.password);
  });

  it("Should throw if Hasher throws", async () => {
    const { sut, hasherSpy, checkEmailRepositorySpy } = makeSut();

    jest.spyOn(hasherSpy, "hash").mockImplementationOnce(() => {
      throw new Error();
    });

    checkEmailRepositorySpy.result = false;

    const promise = sut.execute(mockSignUpParams());

    expect(promise).rejects.toThrow();
  });

  it("Should call AddUserRepository with correct values", async () => {
    const { checkEmailRepositorySpy, addUserRepositorySpy, sut } = makeSut();

    const signUpParams = mockSignUpParams();

    checkEmailRepositorySpy.result = false;

    await sut.execute(signUpParams);

    expect(addUserRepositorySpy.addUserParams).toEqual({
      ...signUpParams,
    });
  });

  it("Should return correct values on AddUserRepository result", async () => {
    const { checkEmailRepositorySpy, addUserRepositorySpy, sut } = makeSut();

    const signUpParams = mockSignUpParams();

    checkEmailRepositorySpy.result = false;

    await sut.execute(signUpParams);

    expect(addUserRepositorySpy.resultParams).toEqual({
      id: addUserRepositorySpy.resultParams.id,
      name: signUpParams.name,
    });
  });

  it("Should throw if AddUserRepository throws", async () => {
    const { sut, addUserRepositorySpy, checkEmailRepositorySpy } = makeSut();

    jest.spyOn(addUserRepositorySpy, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    checkEmailRepositorySpy.result = false;

    const promise = sut.execute(mockSignUpParams());

    expect(promise).rejects.toThrow();
  });

  it("Should call Encrypter with correct value", async () => {
    const { sut, checkEmailRepositorySpy, addUserRepositorySpy, encrypterSpy } =
      makeSut();

    checkEmailRepositorySpy.result = false;

    await sut.execute(mockSignUpParams());

    expect(encrypterSpy.text).toBe(addUserRepositorySpy.resultParams.id);
  });

  it("Should throw if Encrypter throws", async () => {
    const { sut, checkEmailRepositorySpy, encrypterSpy } = makeSut();

    jest.spyOn(encrypterSpy, "encrypt").mockImplementationOnce(() => {
      throw new Error();
    });

    checkEmailRepositorySpy.result = false;

    const promise = sut.execute(mockSignUpParams());

    expect(promise).rejects.toThrow();
  });

  it("Should return correct data on SignUp execution", async () => {
    const { sut, checkEmailRepositorySpy } = makeSut();

    const signUpParams = mockSignUpParams();

    checkEmailRepositorySpy.result = false;

    const signUpResult = await sut.execute(signUpParams);

    expect(signUpResult).toEqual({
      result: true,
      name: signUpParams.name,
      accessToken: "accessToken",
    });
  });
});
