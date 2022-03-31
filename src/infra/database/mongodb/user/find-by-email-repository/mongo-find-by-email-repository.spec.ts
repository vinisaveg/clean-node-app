import { MongoHelper } from "../../mongo-helper";
import { MongoFindByEmailRepository } from "./mongo-find-by-email-repository";

import { Collection } from "mongodb";

describe("MongoFindByEmailRepository implementation", () => {
  let usersCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_TEST_URI as string);
    usersCollection = MongoHelper.getCollection("users");
    await usersCollection.insertOne({
      name: "test",
      email: "test@test.com",
      password: "1234567890",
    });
  });

  afterAll(async () => {
    await usersCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  it("Should return false if e-mail does not exist", async () => {
    const sut = new MongoFindByEmailRepository();

    const email = "test2@test.com";

    const userExists = await sut.execute(email);

    expect(userExists.result).toBe(false);
  });

  it("Should return true if e-mail exists", async () => {
    const sut = new MongoFindByEmailRepository();

    const email = "test@test.com";

    const userExists = await sut.execute(email);

    expect(userExists.result).toBe(true);
  });
});
