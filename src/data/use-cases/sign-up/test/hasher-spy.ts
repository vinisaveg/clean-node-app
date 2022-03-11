import { Hasher } from "@/data/protocols/cryptography/hasher";

export class HasherSpy implements Hasher {
  text: string;

  hash(text: string): Promise<string> {
    this.text = text;

    return Promise.resolve(text);
  }
}
