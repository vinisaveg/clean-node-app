import { RemoteSignUp } from "@/data/use-cases/sign-up/remote-sign-up";
import { BcryptHasher } from "@/infra/cryptography/bcrypt/bcrypt-hasher";
import { JwtEncrypter } from "@/infra/cryptography/jwt/jwt-encrypter";
import { MongoAddUserRepository } from "@/infra/database/mongodb/user/add-user-repository/mongo-add-user-repository";
import { MongoCheckEmailRepository } from "@/infra/database/mongodb/user/check-email-repository/mongo-check-email-repository";
import { makeRemoteSignUp } from "@/main/factories/use-cases/sign-up/make-remote-sign-up";

describe("Remote Sign Up factory", () => {
  it("Should return a RemoteSignUp with correct dependencies", () => {
    const factoryRemoteSignUp: RemoteSignUp = makeRemoteSignUp();

    const mongoCheckEmailRepository = new MongoCheckEmailRepository();
    const hasher = new BcryptHasher(12);
    const addUserRepository = new MongoAddUserRepository();
    const encrypter = new JwtEncrypter("secret", "HS256");

    const remoteSignUp = new RemoteSignUp(
      mongoCheckEmailRepository,
      hasher,
      addUserRepository,
      encrypter
    );

    expect(factoryRemoteSignUp).toEqual(remoteSignUp);
  });
});
