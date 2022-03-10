import { SignUpParams } from "@/domain/use-cases/sign-up";

export const mockSignUpParams = (): SignUpParams => {
  return {
    name: "name",
    email: "name@email.com",
    password: "1234567890",
  };
};
