import {
  AddUserRepository,
  AddUserRepositoryResult,
} from "@/data/protocols/user/add-user-repository";
import { SignUpParams } from "@/domain/use-cases/sign-up";
import { MongoHelper } from "@/infra/database/mongodb/mongo-helper";

export class MongoAddUserRepository implements AddUserRepository {
  async execute(data: SignUpParams): Promise<AddUserRepositoryResult> {
    const usersCollection = MongoHelper.getCollection("users");

    const result = await usersCollection.insertOne(data);

    return {
      id: result.insertedId.toString(),
      name: data.name,
    };
  }
}
