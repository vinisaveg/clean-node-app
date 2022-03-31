import { MongoHelper } from "../../mongo-helper";
import { MongoFindByEmailRepository } from "./mongo-find-by-email-repository";

import { Collection } from "mongodb";
import faker from "@faker-js/faker";

describe("MongoFindByEmailRepository implementation", () => {
  let usersCollection: Collection;
  const name = faker.name.findName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_TEST_URI as string);
    usersCollection = MongoHelper.getCollection("users");
    await usersCollection.insertOne({
      name,
      email,
      password,
    });
  });

  afterAll(async () => {
    await usersCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  it("Should return false if e-mail does not exist", async () => {
    const sut = new MongoFindByEmailRepository();

    const email = "test@test.com";

    const userExists = await sut.execute(email);

    expect(userExists.result).toBe(false);
  });

  it("Should return true if e-mail exists", async () => {
    const sut = new MongoFindByEmailRepository();

    const userExists = await sut.execute(email);

    expect(userExists.result).toBe(true);
  });

  it("Should return the correct User data on success", async () => {
    const sut = new MongoFindByEmailRepository();

    const userExists = await sut.execute(email);

    expect(userExists.user).toEqual({
      id: userExists.user?.id,
      name,
      email,
      password,
    });
  });
});
