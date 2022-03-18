import { MongoClient } from "mongodb";

export class MongoHelper {
  static client: MongoClient | null;
  static uri: string | null;

  static async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  }

  static async disconnect(): Promise<void> {
    await this.client?.close();
    this.client = null;
  }
}
