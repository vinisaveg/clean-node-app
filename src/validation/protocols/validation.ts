/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Validation {
  validate(input: Record<string, any>): Error | null;
}
