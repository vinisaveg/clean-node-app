import { RemoteLogin } from "@/data/use-cases/login/remote-login";
import { BcryptAdapter } from "@/infra/cryptography/bcrypt/bcrypt-adapter";
import { JwtEncrypter } from "@/infra/cryptography/jwt/jwt-encrypter";
import { MongoFindByEmailRepository } from "@/infra/database/mongodb/user/find-by-email-repository/mongo-find-by-email-repository";

export const makeRemoteLogin = (): RemoteLogin => {
  const findByEmailRepository = new MongoFindByEmailRepository();
  const hasher = new BcryptAdapter(12);
  const encrypter = new JwtEncrypter(
    process.env.JWT_SECRET as string,
    process.env.JWT_ALGORITHM as string
  );

  return new RemoteLogin(findByEmailRepository, hasher, encrypter);
};
