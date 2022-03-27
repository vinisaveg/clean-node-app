import { SignUpController } from "@/presentation/controllers/sign-up/sign-up-controller";
import { makeRemoteSignUp } from "@/main/factories/use-cases/sign-up/make-remote-sign-up";
import { makeSignUpValidation } from "@/main/factories/validation/sign-up/make-sign-up-validation";
import { makeSignUpController } from "@/main/factories/controllers/sign-up/make-sign-up-controller";

describe("Sign Up Controller factory", () => {
  it("Should return a Controller with correct dependencies", () => {
    const remoteSignUp = makeRemoteSignUp();
    const signUpValidation = makeSignUpValidation();

    const signUpController = new SignUpController(
      remoteSignUp,
      signUpValidation
    );

    const sut = makeSignUpController();

    expect(sut).toEqual(signUpController);
  });
});
