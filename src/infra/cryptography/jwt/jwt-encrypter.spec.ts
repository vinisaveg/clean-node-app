import faker from "@faker-js/faker";
import { JwtEncrypter } from "@/infra/cryptography/jwt/jwt-encrypter";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return "accessToken";
  },
}));

describe("JwtEncrypter implementation", () => {
  it("Should call encrypt with correct value", async () => {
    const sut = new JwtEncrypter("secret", "HS256");

    const text = faker.random.alphaNumeric(24);

    const jwtEncrypterSpy = jest.spyOn(sut, "encrypt");

    await sut.encrypt(text);

    expect(jwtEncrypterSpy).toBeCalledWith(text);
  });

  it("Should return a valid accessToken", async () => {
    const sut = new JwtEncrypter("secret", "HS256");

    const text = faker.random.alphaNumeric(24);

    const result = await sut.encrypt(text);

    expect(result).toBe("accessToken");
  });
});
