import { SignUpParams } from "@/domain/use-cases/sign-up";

export interface AddUserRepository {
  execute: (data: AddUserRepositoryParams) => Promise<AddUserRepositoryResult>;
}

export type AddUserRepositoryParams = SignUpParams;

export type AddUserRepositoryResult = {
  id: string;
  name: string;
};
