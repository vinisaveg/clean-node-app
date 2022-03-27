import { SignUpController } from "@/presentation/controllers/sign-up/sign-up-controller";
import { makeRemoteSignUp } from "@/main/factories/use-cases/sign-up/make-remote-sign-up";
import { makeSignUpValidation } from "@/main/factories/validation/sign-up/make-sign-up-validation";

export const makeSignUpController = (): SignUpController => {
  const remoteSignUp = makeRemoteSignUp();
  const signUpValidation = makeSignUpValidation();

  return new SignUpController(remoteSignUp, signUpValidation);
};
