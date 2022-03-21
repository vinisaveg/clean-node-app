import { Hasher } from "@/data/protocols/cryptography/hasher";

import bcrypt from "bcrypt";

export class BcryptHasher implements Hasher {
  constructor(private readonly salt: number) {}

  async hash(text: string): Promise<string> {
    const hashedText = await bcrypt.hash(text, this.salt);

    return hashedText;
  }
}
