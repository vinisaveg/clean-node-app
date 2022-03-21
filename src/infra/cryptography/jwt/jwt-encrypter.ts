import { Encrypter } from "@/data/protocols/cryptography/encrypter";

import jwt from "jsonwebtoken";

export class JwtEncrypter implements Encrypter {
  constructor(
    private readonly secret: string,
    private readonly algorithm: string
  ) {}

  async encrypt(text: string): Promise<string> {
    const token = jwt.sign({ id: text }, this.secret, {
      algorithm: this.algorithm as jwt.Algorithm,
    });

    return token;
  }
}
