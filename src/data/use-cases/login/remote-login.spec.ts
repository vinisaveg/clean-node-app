import { FindByEmailRepositorySpy } from "./test/find-by-email-repository-spy";
import { RemoteLogin } from "./remote-login";

describe("Remote Login use-case", () => {
  it("Should call findByEmailRepository with correct e-mail value", async () => {
    const findByEmailRepositorySpy = new FindByEmailRepositorySpy();
    const sut = new RemoteLogin(findByEmailRepositorySpy);

    const email = "email@example.com";
    const password = "1234567890";

    findByEmailRepositorySpy.result = true;

    await sut.execute({ email, password });

    expect(findByEmailRepositorySpy.email).toBe(email);
  });

  it("Should return false if findByEmailRepository returns false", async () => {
    const findByEmailRepositorySpy = new FindByEmailRepositorySpy();
    const sut = new RemoteLogin(findByEmailRepositorySpy);

    const email = "email@example.com";
    const password = "1234567890";

    findByEmailRepositorySpy.result = false;

    const loginResult = await sut.execute({ email, password });

    expect(loginResult.result).toBe(false);
  });

  it("Should return true if findByEmailRepository returns true", async () => {
    const findByEmailRepositorySpy = new FindByEmailRepositorySpy();
    const sut = new RemoteLogin(findByEmailRepositorySpy);

    const email = "email@example.com";
    const password = "1234567890";

    findByEmailRepositorySpy.result = true;

    const loginResult = await sut.execute({ email, password });

    expect(loginResult.result).toBe(true);
  });
});
