import { Collection } from "mongodb";
import { MongoHelper } from "../../mongo-helper";
import { MongoCheckEmailRepository } from "./mongo-check-email-repository";
import faker from "@faker-js/faker";

describe("MongoCheckEmailRepository implementation", () => {
  let usersCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_TEST_URI as string);
    usersCollection = MongoHelper.getCollection("users");
    await usersCollection.insertOne({ name: "name", email: "name@email.com" });
  });

  afterAll(async () => {
    await usersCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  it("Should return true if e-mail is taken", async () => {
    const sut = new MongoCheckEmailRepository();

    const email = "name@email.com";

    const isEmailTaken = await sut.execute(email);

    expect(isEmailTaken).toBe(true);
  });

  it("Should return false if e-mail is not taken", async () => {
    const sut = new MongoCheckEmailRepository();

    const email = faker.internet.email();

    const isEmailTaken = await sut.execute(email);

    expect(isEmailTaken).toBe(false);
  });
});
