import {
  FindByEmailRepository,
  FindByEmailResult,
} from "@/data/protocols/user/find-by-email-repository";
import { MongoHelper } from "@/infra/database/mongodb/mongo-helper";

export class MongoFindByEmailRepository implements FindByEmailRepository {
  async execute(email: string): Promise<FindByEmailResult> {
    const usersCollection = MongoHelper.getCollection("users");
    const userExists = await usersCollection.findOne(
      { email },
      {
        projection: {
          _id: 1,
          name: 1,
          password: 1,
        },
      }
    );

    if (userExists) {
      return {
        result: true,
        user: {
          id: userExists._id.toString(),
          email,
          name: userExists.name,
          password: userExists.password,
        },
      };
    }

    return {
      result: false,
    };
  }
}
