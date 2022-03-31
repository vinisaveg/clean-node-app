import { LoginController } from "@/presentation/controllers/login/login-controller";
import { makeRemoteLogin } from "@/main/factories/use-cases/login/make-remote-login";
import { makeLoginValidation } from "@/main/factories/validation/login/make-login-validation";
import { makeLoginController } from "@/main/factories/controllers/login/make-login-controller";

describe("Login Controller factory", () => {
  it("Should return a Controller with correct dependencies", () => {
    const remoteLogin = makeRemoteLogin();
    const validation = makeLoginValidation();

    const loginController = new LoginController(remoteLogin, validation);

    const sut = makeLoginController();

    expect(sut).toEqual(loginController);
  });
});
