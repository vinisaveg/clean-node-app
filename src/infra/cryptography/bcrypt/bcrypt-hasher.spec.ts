import { BcryptHasher } from "./bcrypt-hasher";

describe("BcryptHasher implementation", () => {
  it("Should call hash with correct values", async () => {
    const salt = 10;
    const password = "1234567890";
    const sut = new BcryptHasher(salt);

    const bcryptHasherSpy = jest.spyOn(sut, "hash");

    await sut.hash(password);

    expect(bcryptHasherSpy).toHaveBeenCalledWith(password);
  });
});
