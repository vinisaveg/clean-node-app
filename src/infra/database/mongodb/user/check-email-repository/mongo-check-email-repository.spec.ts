import { Collection, Db } from "mongodb";
import { MongoHelper } from "../../mongo-helper";
import { MongoCheckEmailRepository } from "./mongo-check-email-repository";

describe("MongoCheckEmailRepository implementation", () => {
  let database: Db;
  let usersCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_TEST_URI as string);
    database = MongoHelper.client?.db() as Db;
    usersCollection = database.collection("users") as Collection;
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
});
