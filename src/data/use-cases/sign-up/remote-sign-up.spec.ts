import { RemoteSignUp } from "./remote-sign-up";
import { AddUserRepositorySpy } from "./test/add-user-repository-spy";
import { CheckEmailRepositorySpy } from "./test/check-email-repository-spy";

describe("Remote Sign Up use-case", () => {
  it("Should execute with correct values", async () => {
    const checkEmailRepositorySpy = new CheckEmailRepositorySpy();
    const addUserRepositorySpy = new AddUserRepositorySpy();
    const sut = new RemoteSignUp(checkEmailRepositorySpy, addUserRepositorySpy);

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
    const checkEmailRepositorySpy = new CheckEmailRepositorySpy();
    const addUserRepositorySpy = new AddUserRepositorySpy();
    const sut = new RemoteSignUp(checkEmailRepositorySpy, addUserRepositorySpy);

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
    const checkEmailRepositorySpy = new CheckEmailRepositorySpy();
    const addUserRepositorySpy = new AddUserRepositorySpy();
    const sut = new RemoteSignUp(checkEmailRepositorySpy, addUserRepositorySpy);

    const signUpData = {
      name: "name",
      email: "name@email.com",
      password: "1234567890",
    };

    checkEmailRepositorySpy.result = true;

    const signUpTry = await sut.execute(signUpData);

    expect(signUpTry.result).toBe(false);
  });
});
