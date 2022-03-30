import { User } from "@/domain/entities/user";

export interface FindByEmailRepository {
  execute: (email: string) => Promise<FindByEmailResult>;
}

export type FindByEmailResult = {
  result: boolean;
  user?: Omit<User, "nickname" | "country" | "role">;
};
