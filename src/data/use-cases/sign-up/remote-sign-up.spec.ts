import { SignUpParams } from "@/domain/use-cases/sign-up";
import { RemoteSignUp } from "./remote-sign-up";
import { AddUserRepositorySpy } from "./test/add-user-repository-spy";
import { CheckEmailRepositorySpy } from "./test/check-email-repository-spy";

type SutType = {
  checkEmailRepositorySpy: CheckEmailRepositorySpy;
  addUserRepositorySpy: AddUserRepositorySpy;
  sut: RemoteSignUp;
};

const makeSut = (): SutType => {
  const checkEmailRepositorySpy = new CheckEmailRepositorySpy();
  const addUserRepositorySpy = new AddUserRepositorySpy();
  const sut = new RemoteSignUp(checkEmailRepositorySpy, addUserRepositorySpy);

  return {
    checkEmailRepositorySpy,
    addUserRepositorySpy,
    sut,
  };
};

describe("Remote Sign Up use-case", () => {
  it("Should execute with correct values", async () => {
    const { checkEmailRepositorySpy, addUserRepositorySpy, sut } = makeSut();

    const signUpData = {
      name: "name",
      email: "name@email.com",
      password: "1234567890",
    };

    checkEmailRepositorySpy.result = false;

    await sut.execute(signUpData);

    expect(addUserRepositorySpy.addUserParams).toEqual({
      ...signUpData,
    });
  });

  it("Should call checkEmailRepository with correct e-mail value", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    const signUpData = {
      name: "name",
      email: "name@email.com",
      password: "1234567890",
    };

    checkEmailRepositorySpy.result = false;

    await sut.execute(signUpData);

    expect(checkEmailRepositorySpy.email).toBe(signUpData.email);
  });

  it("Should return false if CheckEmailRepository returns true", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    const signUpData = {
      name: "name",
      email: "name@email.com",
      password: "1234567890",
    };

    checkEmailRepositorySpy.result = true;

    const signUpTry = await sut.execute(signUpData);

    expect(signUpTry.result).toBe(false);
  });

  it("Should return true if CheckEmailRepository returns false", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    const signUpData = {
      name: "name",
      email: "name@email.com",
      password: "1234567890",
    };

    checkEmailRepositorySpy.result = false;

    const signUpTry = await sut.execute(signUpData);

    expect(signUpTry.result).toBe(true);
  });

  it("Should throw error if CheckEmailRepository throws", async () => {
    const { checkEmailRepositorySpy, sut } = makeSut();

    jest.spyOn(checkEmailRepositorySpy, "check").mockImplementationOnce(() => {
      throw new Error();
    });

    const signUpData = {
      name: "name",
      email: "name@email.com",
      password: "1234567890",
    };

    const promise = sut.execute(signUpData);

    await expect(promise).rejects.toThrow();
  });
});
