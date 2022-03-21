import { BcryptHasher } from "./bcrypt-hasher";
import faker from "@faker-js/faker";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return "hashedText";
  },
}));

type SutTypes = {
  salt: number;
  sut: BcryptHasher;
};

const makeSut = (salt = 10): SutTypes => {
  const sut = new BcryptHasher(salt);

  return {
    salt,
    sut,
  };
};

describe("BcryptHasher implementation", () => {
  it("Should call hash with correct text value", async () => {
    const { sut } = makeSut();
    const text = faker.random.alphaNumeric(10);

    const bcryptHasherSpy = jest.spyOn(sut, "hash");

    await sut.hash(text);

    expect(bcryptHasherSpy).toHaveBeenCalledWith(text);
  });

  it("Should return a valid hashed text", async () => {
    const { sut } = makeSut();
    const text = faker.random.alphaNumeric(10);

    const hashedText = await sut.hash(text);

    expect(hashedText).toBe("hashedText");
  });
});
