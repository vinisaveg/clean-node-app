import { Collection, MongoClient } from "mongodb";

export class MongoHelper {
  static client: MongoClient;
  static uri: string;

  static async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  }

  static async disconnect(): Promise<void> {
    await this.client.close();
  }

  static getCollection(name: string): Collection {
    return this.client.db().collection(name) as Collection;
  }
}
