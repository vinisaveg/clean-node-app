import { RemoteSignUp } from "./remote-sign-up";
import { AddUserRepositorySpy } from "./test/add-user-repository-spy";

describe("Remote Sign Up use-case", () => {
  it("Should execute with correct values", async () => {
    const addUserRepositorySpy = new AddUserRepositorySpy();
    const sut = new RemoteSignUp(addUserRepositorySpy);

    const signUpData = {
      name: "name",
      email: "name@email.com",
      password: "1234567890",
    };

    const promise = sut.execute(signUpData);

    expect(promise).resolves;
    expect(addUserRepositorySpy.addUserParams).toEqual({
      ...signUpData,
    });
  });
});
