import { SignUp, SignUpParams, SignUpResult } from "@/domain/use-cases/sign-up";
import {
  AddUserRepository,
  AddUserRepositoryParams,
  AddUserRepositoryResult,
} from "@/data/protocols/user/add-user-repository";

class RemoteSignUp implements SignUp {
  constructor(private readonly addUserRepository: AddUserRepository) {}

  execute(data: SignUpParams): Promise<SignUpResult> {
    return this.addUserRepository.execute(data);
  }
}

class AddUserRepositorySpy implements AddUserRepository {
  addUserParams: AddUserRepositoryParams;

  execute(data: AddUserRepositoryParams): Promise<AddUserRepositoryResult> {
    this.addUserParams = data;
    return Promise.resolve({ result: true, name: data.name });
  }
}

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
