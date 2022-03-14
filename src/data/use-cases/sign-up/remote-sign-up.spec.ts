import { RemoteSignUp } from "./remote-sign-up";
import { AddUserRepositorySpy } from "./test/add-user-repository-spy";
import { CheckEmailRepositorySpy } from "./test/check-email-repository-spy";
import { HasherSpy } from "./test/hasher-spy";
import { mockSignUpParams } from "./test/mocks/mock-sign-up";

type SutType = {
  checkEmailRepositorySpy: CheckEmailRepositorySpy;
  hasherSpy: HasherSpy;
  addUserRepositorySpy: AddUserRepositorySpy;
  sut: RemoteSignUp;
};

const makeSut = (): SutType => {
  const checkEmailRepositorySpy = new CheckEmailRepositorySpy();
  const hasherSpy = new HasherSpy();
  const addUserRepositorySpy = new AddUserRepositorySpy();
  const sut = new RemoteSignUp(
    checkEmailRepositorySpy,
    hasherSpy,
    addUserRepositorySpy
  );

  return {
    checkEmailRepositorySpy,
    hasherSpy,
    addUserRepositorySpy,
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

    const signUpParams = mockSignUpParams();

    checkEmailRepositorySpy.result = true;

    const signUpTry = await sut.execute(signUpParams);

    expect(signUpTry.result).toBe(false);
  });

  it("Should return true if CheckEmailRepository returns false", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    const signUpParams = mockSignUpParams();

    checkEmailRepositorySpy.result = false;

    const signUpTry = await sut.execute(signUpParams);

    expect(signUpTry.result).toBe(true);
  });

  it("Should throw error if CheckEmailRepository throws", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    jest
      .spyOn(checkEmailRepositorySpy, "execute")
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const signUpParams = mockSignUpParams();

    const promise = sut.execute(signUpParams);

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

    const signUpParams = mockSignUpParams();

    checkEmailRepositorySpy.result = false;

    const promise = sut.execute(signUpParams);

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

  it("Should throw if AddUserRepository throws", async () => {
    const { sut, addUserRepositorySpy, checkEmailRepositorySpy } = makeSut();

    jest.spyOn(addUserRepositorySpy, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    const signUpParams = mockSignUpParams();

    checkEmailRepositorySpy.result = false;

    const promise = sut.execute(signUpParams);

    expect(promise).rejects.toThrow();
  });
});
