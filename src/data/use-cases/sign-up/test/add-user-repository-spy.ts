import {
  AddUserRepository,
  AddUserRepositoryParams,
  AddUserRepositoryResult,
} from "@/data/protocols/user/add-user-repository";

import faker from "@faker-js/faker";

export class AddUserRepositorySpy implements AddUserRepository {
  addUserParams: AddUserRepositoryParams;
  resultParams: AddUserRepositoryResult;

  execute(data: AddUserRepositoryParams): Promise<AddUserRepositoryResult> {
    this.addUserParams = data;
    this.resultParams = {
      id: faker.datatype.uuid(),
      name: data.name,
    };
    return Promise.resolve(this.resultParams);
  }
}
