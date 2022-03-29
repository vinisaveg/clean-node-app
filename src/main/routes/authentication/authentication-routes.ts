import { adaptRoute } from "@/main/adapters/express/adapt-route";
import { makeSignUpController } from "@/main/factories/controllers/sign-up/make-sign-up-controller";

import { Router } from "express";

export const authenticationRoutes = (router: Router): void => {
  router.post("/signup", adaptRoute(makeSignUpController()));
};
