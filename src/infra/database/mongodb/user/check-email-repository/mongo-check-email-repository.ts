import { CheckEmailRepository } from "@/data/protocols/user/check-email-repository";
import { MongoHelper } from "@/infra/database/mongodb/mongo-helper";

export class MongoCheckEmailRepository implements CheckEmailRepository {
  async execute(email: string): Promise<boolean> {
    const usersCollection = MongoHelper.getCollection("users");

    const result = await usersCollection.findOne({ email });

    return Promise.resolve(!!result);
  }
}
