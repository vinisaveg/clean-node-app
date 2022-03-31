export interface HasherComparer {
  compare: (text: string, hashedText: string) => Promise<boolean>;
}
