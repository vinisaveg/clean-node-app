import { BcryptHasher } from "./bcrypt-hasher";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return "hashedText";
  },
}));

describe("BcryptHasher implementation", () => {
  it("Should call hash with correct text value", async () => {
    const salt = 10;
    const text = "1234567890";
    const sut = new BcryptHasher(salt);

    const bcryptHasherSpy = jest.spyOn(sut, "hash");

    await sut.hash(text);

    expect(bcryptHasherSpy).toHaveBeenCalledWith(text);
  });

  it("Should return a valid hashed text", async () => {
    const salt = 10;
    const text = "1234567890";
    const sut = new BcryptHasher(salt);

    const hashedText = await sut.hash(text);

    expect(hashedText).toBe("hashedText");
  });
});
