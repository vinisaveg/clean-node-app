import { User } from "@/domain/entities/user";

export interface SignUp {
  execute: (data: SignUpParams) => Promise<SignUpResult>;
}

export type SignUpParams = Omit<User, "id" | "nickname" | "country" | "role">;

export type SignUpResult = {
  result: boolean;
  name?: string;
  accessToken?: string;
};
