import { FindByEmailRepositorySpy } from "./test/find-by-email-repository-spy";
import { RemoteLogin } from "./remote-login";
import faker from "@faker-js/faker";

type SutTypes = {
  findByEmailRepositorySpy: FindByEmailRepositorySpy;
  sut: RemoteLogin;
};

const makeSut = (): SutTypes => {
  const findByEmailRepositorySpy = new FindByEmailRepositorySpy();
  const sut = new RemoteLogin(findByEmailRepositorySpy);

  return {
    findByEmailRepositorySpy,
    sut,
  };
};

describe("Remote Login use-case", () => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  it("Should call findByEmailRepository with correct e-mail value", async () => {
    const { findByEmailRepositorySpy, sut } = makeSut();

    findByEmailRepositorySpy.result = true;

    await sut.execute({ email, password });

    expect(findByEmailRepositorySpy.email).toBe(email);
  });

  it("Should return false if findByEmailRepository returns false", async () => {
    const { findByEmailRepositorySpy, sut } = makeSut();

    findByEmailRepositorySpy.result = false;

    const loginResult = await sut.execute({ email, password });

    expect(loginResult.result).toBe(false);
  });

  it("Should return true if findByEmailRepository returns true", async () => {
    const { findByEmailRepositorySpy, sut } = makeSut();

    findByEmailRepositorySpy.result = true;

    const loginResult = await sut.execute({ email, password });

    expect(loginResult.result).toBe(true);
  });
});
