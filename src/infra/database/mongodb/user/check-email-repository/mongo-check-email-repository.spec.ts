import { Collection } from "mongodb";
import { MongoHelper } from "../../mongo-helper";
import { MongoCheckEmailRepository } from "./mongo-check-email-repository";
import faker from "@faker-js/faker";

type SutTypes = {
  sut: MongoCheckEmailRepository;
  result: boolean;
};

const makeSut = async (
  email: string = faker.internet.email()
): Promise<SutTypes> => {
  const sut = new MongoCheckEmailRepository();

  const isEmailTaken = await sut.execute(email);

  return {
    result: isEmailTaken,
    sut,
  };
};

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
    const email = "name@email.com";

    const { result } = await makeSut(email);

    expect(result).toBe(true);
  });

  it("Should return false if e-mail is not taken", async () => {
    const { result } = await makeSut();

    expect(result).toBe(false);
  });
});
