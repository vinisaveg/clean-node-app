import { FindByEmailRepositorySpy } from "./test/find-by-email-repository-spy";
import { RemoteLogin } from "./remote-login";
import { mockLoginParams } from "../../../../test/mocks/login/mock-login";
import { HashComparerSpy } from "./test/hash-comparer-spy";

type SutTypes = {
  findByEmailRepositorySpy: FindByEmailRepositorySpy;
  hashComparerSpy: HashComparerSpy;
  sut: RemoteLogin;
};

const makeSut = (): SutTypes => {
  const findByEmailRepositorySpy = new FindByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const sut = new RemoteLogin(findByEmailRepositorySpy, hashComparerSpy);

  return {
    findByEmailRepositorySpy,
    hashComparerSpy,
    sut,
  };
};

describe("Remote Login use-case", () => {
  it("Should call findByEmailRepository with correct e-mail value", async () => {
    const { findByEmailRepositorySpy, sut } = makeSut();

    findByEmailRepositorySpy.result = true;

    const loginParams = mockLoginParams();

    await sut.execute(loginParams);

    expect(findByEmailRepositorySpy.email).toBe(loginParams.email);
  });

  it("Should return false if findByEmailRepository returns false", async () => {
    const { findByEmailRepositorySpy, sut } = makeSut();

    findByEmailRepositorySpy.result = false;

    const loginParams = mockLoginParams();

    const loginResult = await sut.execute(loginParams);

    expect(loginResult.result).toBe(false);
  });

  it("Should return true if findByEmailRepository returns true", async () => {
    const { findByEmailRepositorySpy, hashComparerSpy, sut } = makeSut();

    findByEmailRepositorySpy.result = true;
    hashComparerSpy.result = true;

    const loginParams = mockLoginParams();

    const loginResult = await sut.execute(loginParams);

    expect(loginResult.result).toBe(true);
  });

  it("Should throw if findByEmailRepository throws", async () => {
    const { findByEmailRepositorySpy, sut } = makeSut();

    jest
      .spyOn(findByEmailRepositorySpy, "execute")
      .mockImplementationOnce(() => {
        throw new Error();
      });

    findByEmailRepositorySpy.result = false;

    const promise = sut.execute(mockLoginParams());

    expect(promise).rejects.toThrow();
  });

  it("Should call Hasher with correct value", async () => {
    const { findByEmailRepositorySpy, hashComparerSpy, sut } = makeSut();

    findByEmailRepositorySpy.result = true;
    hashComparerSpy.result = true;

    const loginParams = mockLoginParams();

    await sut.execute(loginParams);

    expect(hashComparerSpy.text).toBe(loginParams.password);
  });

  it("Should throw if Hasher throws", () => {
    const { findByEmailRepositorySpy, hashComparerSpy, sut } = makeSut();

    jest.spyOn(hashComparerSpy, "compare").mockImplementationOnce(() => {
      throw new Error();
    });

    findByEmailRepositorySpy.result = true;
    hashComparerSpy.result = false;

    const promise = sut.execute(mockLoginParams());

    expect(promise).rejects.toThrow();
  });
});
