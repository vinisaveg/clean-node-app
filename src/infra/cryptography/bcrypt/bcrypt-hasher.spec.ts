import { BcryptHasher } from "./bcrypt-hasher";

describe("BcryptHasher implementation", () => {
  it("Should call hash with correct text value", async () => {
    const salt = 10;
    const text = "1234567890";
    const sut = new BcryptHasher(salt);

    const bcryptHasherSpy = jest.spyOn(sut, "hash");

    await sut.hash(text);

    expect(bcryptHasherSpy).toHaveBeenCalledWith(text);
  });
});
