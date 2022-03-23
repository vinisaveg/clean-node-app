export interface Validation {
  validate<T>(input: Record<string, T>): Error | null;
}
