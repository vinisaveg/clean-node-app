import { Hasher } from "@/data/protocols/cryptography/hasher";
import { HasherComparer } from "@/data/protocols/cryptography/hash-comparer";

import bcrypt from "bcrypt";

export class BcryptAdapter implements Hasher, HasherComparer {
  constructor(private readonly salt: number) {}

  async hash(text: string): Promise<string> {
    const hashedText = await bcrypt.hash(text, this.salt);

    return hashedText;
  }

  async compare(text: string, hashedText: string): Promise<boolean> {
    const isValid = await bcrypt.compare(text, hashedText);

    return !!isValid;
  }
}
