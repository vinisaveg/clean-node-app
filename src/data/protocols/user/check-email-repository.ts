export interface CheckEmailRepository {
  execute: (email: string) => Promise<boolean>;
}
