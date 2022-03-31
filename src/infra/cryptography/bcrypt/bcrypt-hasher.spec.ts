import { BcryptAdapter } from "@/infra/cryptography/bcrypt/bcrypt-adapter";
import faker from "@faker-js/faker";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return "hashedText";
  },

  async compare(): Promise<boolean> {
    return true;
  },
}));

type SutTypes = {
  salt: number;
  sut: BcryptAdapter;
};

const makeSut = (salt = 10): SutTypes => {
  const sut = new BcryptAdapter(salt);

  return {
    salt,
    sut,
  };
};

describe("BcrypAdapter implementation", () => {
  describe("hash", () => {
    it("Should call hash with correct text value", async () => {
      const { sut } = makeSut();
      const text = faker.random.alphaNumeric(10);

      const bcryptAdapterSpy = jest.spyOn(sut, "hash");

      await sut.hash(text);

      expect(bcryptAdapterSpy).toHaveBeenCalledWith(text);
    });

    it("Should return a valid hashed text", async () => {
      const { sut } = makeSut();
      const text = faker.random.alphaNumeric(10);

      const hashedText = await sut.hash(text);

      expect(hashedText).toBe("hashedText");
    });
  });

  describe("compare", () => {
    it("Should call compare with correct values", async () => {
      const { sut } = makeSut();
      const text = faker.random.alphaNumeric(10);
      const hashedText = faker.random.alphaNumeric(30);

      const bcryptAdapterSpy = jest.spyOn(sut, "compare");

      await sut.compare(text, hashedText);

      expect(bcryptAdapterSpy).toBeCalledWith(text, hashedText);
    });
  });
});
