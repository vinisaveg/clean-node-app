import { HasherComparer } from "@/data/protocols/cryptography/hash-comparer";

export class HashComparerSpy implements HasherComparer {
  text: string;
  hashedText: string;
  result: boolean;

  compare(text: string, hashedText: string): Promise<boolean> {
    this.text = text;
    this.hashedText = hashedText;

    return Promise.resolve(this.result);
  }
}
