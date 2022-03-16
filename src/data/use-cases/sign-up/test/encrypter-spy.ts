import { Encrypter } from "@/data/protocols/cryptography/encrypter";

export class EncrypterSpy implements Encrypter {
  text: string;

  encrypt(text: string): Promise<string> {
    this.text = text;

    return Promise.resolve(text);
  }
}
