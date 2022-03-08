import {
  AddUserRepository,
  AddUserRepositoryParams,
  AddUserRepositoryResult,
} from "@/data/protocols/user/add-user-repository";

export class AddUserRepositorySpy implements AddUserRepository {
  addUserParams: AddUserRepositoryParams;

  execute(data: AddUserRepositoryParams): Promise<AddUserRepositoryResult> {
    this.addUserParams = data;
    return Promise.resolve({ result: true, name: data.name });
  }
}
