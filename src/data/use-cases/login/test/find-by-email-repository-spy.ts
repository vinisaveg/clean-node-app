import {
  FindByEmailRepository,
  FindByEmailResult,
} from "@/data/protocols/user/find-by-email-repository";
import faker from "@faker-js/faker";

export class FindByEmailRepositorySpy implements FindByEmailRepository {
  result: boolean;
  email: string;
  id: string;

  async execute(email: string): Promise<FindByEmailResult> {
    this.email = email;
    this.id = faker.datatype.uuid();

    return Promise.resolve({
      result: this.result,
      user: {
        id: this.id,
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password(),
      },
    });
  }
}
