import { RemoteSignUp } from "@/data/use-cases/sign-up/remote-sign-up";
import { BcryptHasher } from "@/infra/cryptography/bcrypt/bcrypt-hasher";
import { JwtEncrypter } from "@/infra/cryptography/jwt/jwt-encrypter";
import { MongoAddUserRepository } from "@/infra/database/mongodb/user/add-user-repository/mongo-add-user-repository";
import { MongoCheckEmailRepository } from "@/infra/database/mongodb/user/check-email-repository/mongo-check-email-repository";

export const makeRemoteSignUp = (): RemoteSignUp => {
  const mongoCheckEmailRepository = new MongoCheckEmailRepository();
  const hasher = new BcryptHasher(12);
  const addUserRepository = new MongoAddUserRepository();
  const encrypter = new JwtEncrypter(
    process.env.JWT_SECRET as string,
    process.env.JWT_ALGORITHM as string
  );

  return new RemoteSignUp(
    mongoCheckEmailRepository,
    hasher,
    addUserRepository,
    encrypter
  );
};
