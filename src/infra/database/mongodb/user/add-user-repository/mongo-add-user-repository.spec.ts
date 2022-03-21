import { Collection } from "mongodb";
import { MongoHelper } from "@/infra/database/mongodb/mongo-helper";
import { MongoAddUserRepository } from "@/infra/database/mongodb/user/add-user-repository/mongo-add-user-repository";
import { mockSignUpParams } from "@/../test/mocks/sign-up/mock-sign-up";

type SutTypes = {
  sut: MongoAddUserRepository;
};

const makeSut = (): SutTypes => {
  const sut = new MongoAddUserRepository();

  return {
    sut,
  };
};

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
    const { sut } = makeSut();

    const addUserParams = mockSignUpParams();

    const result = await sut.execute(addUserParams);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name", addUserParams.name);
  });
});
