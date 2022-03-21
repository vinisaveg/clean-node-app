import faker from "@faker-js/faker";
import { JwtEncrypter } from "@/infra/cryptography/jwt/jwt-encrypter";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return "accessToken";
  },
}));

type SutTypes = {
  sut: JwtEncrypter;
};

const makeSut = (secret = "secret", algorithm = "HS256"): SutTypes => {
  const sut = new JwtEncrypter(secret, algorithm);

  return {
    sut,
  };
};

describe("JwtEncrypter implementation", () => {
  it("Should call encrypt with correct value", async () => {
    const { sut } = makeSut();
    const text = faker.datatype.uuid();

    const jwtEncrypterSpy = jest.spyOn(sut, "encrypt");

    await sut.encrypt(text);

    expect(jwtEncrypterSpy).toBeCalledWith(text);
  });

  it("Should return a valid accessToken", async () => {
    const { sut } = makeSut();
    const text = faker.datatype.uuid();

    const result = await sut.encrypt(text);

    expect(result).toBe("accessToken");
  });
});
