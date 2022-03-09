export interface CheckEmailRepository {
  check: (email: string) => Promise<boolean>;
}
