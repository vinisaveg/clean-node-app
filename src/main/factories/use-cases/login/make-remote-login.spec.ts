import { BcryptAdapter } from "@/infra/cryptography/bcrypt/bcrypt-adapter";
import { JwtEncrypter } from "@/infra/cryptography/jwt/jwt-encrypter";
import { MongoFindByEmailRepository } from "@/infra/database/mongodb/user/find-by-email-repository/mongo-find-by-email-repository";
import { RemoteLogin } from "@/data/use-cases/login/remote-login";
import { makeRemoteLogin } from "./make-remote-login";

describe("Remote Login factory", () => {
  it("Should return a RemoteLogin with correct dependencies", () => {
    const findByEmailRepository = new MongoFindByEmailRepository();
    const hasher = new BcryptAdapter(12);
    const encrypter = new JwtEncrypter("secret", "HS256");

    const remoteLogin = new RemoteLogin(
      findByEmailRepository,
      hasher,
      encrypter
    );

    const sut = makeRemoteLogin();

    expect(sut).toEqual(remoteLogin);
  });
});
