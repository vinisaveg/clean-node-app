import { LoginController } from "@/presentation/controllers/login/login-controller";
import { makeRemoteLogin } from "@/main/factories/use-cases/login/make-remote-login";
import { makeLoginValidation } from "@/main/factories/validation/login/make-login-validation";

export const makeLoginController = (): LoginController => {
  const remoteLogin = makeRemoteLogin();
  const validation = makeLoginValidation();

  return new LoginController(remoteLogin, validation);
};
