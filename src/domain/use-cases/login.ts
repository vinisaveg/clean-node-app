import { User } from "@/domain/entities/user";

export interface Login {
  execute: (data: LoginParams) => Promise<LoginResult>;
}

export type LoginParams = Omit<
  User,
  "id" | "name" | "nickname" | "country" | "role"
>;

export type LoginResult = {
  result: boolean;
  name?: string;
  accessToken?: string;
};
