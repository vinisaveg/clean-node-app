import { User } from "../entities/user";

export interface SignUp {
  signup: (data: SignUpParams) => Promise<SignUpResult>;
}

export type SignUpParams = Omit<
  User,
  "id" | "nickname" | "country" | "role" | "ranking"
>;

export type SignUpResult = {
  result: boolean;
  name?: string;
  accessToken?: string;
};
