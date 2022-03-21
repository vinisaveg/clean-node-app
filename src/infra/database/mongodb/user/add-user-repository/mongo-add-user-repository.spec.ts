import { Collection } from "mongodb";
import { MongoHelper } from "../../mongo-helper";
import { MongoAddUserRepository } from "./mongo-add-user-repository";

describe("MongoAddUserRepository implementation", () => {
  let usersCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_TEST_URI as string);
    usersCollection = MongoHelper.getCollection("users");
  });

  afterAll(async () => {
    await usersCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  it("Should have correct result on execution", async () => {
    const sut = new MongoAddUserRepository();

    const addUserParams = {
      name: "name",
      email: "name@email.com",
      password: "1234567890",
    };

    const result = await sut.execute(addUserParams);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name", addUserParams.name);
  });
});
