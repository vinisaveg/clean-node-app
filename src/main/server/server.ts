import { authenticationRoutes } from "@/main/routes/authentication/authentication-routes";
import { MongoHelper } from "@/infra/database/mongodb/mongo-helper";

import express, { Application, Router } from "express";
import { Server } from "http";

export class ServerHelper {
  private server: Server;
  app: Application;

  constructor(private readonly port: number) {
    this.app = express();
  }

  public async init(databaseUri: string): Promise<void> {
    this.setupExpress();
    this.setupRoutes();
    await this.setupDatabase(databaseUri);
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    const router = Router();
    authenticationRoutes(router);
    this.app.use("/api", router);
  }

  private async setupDatabase(uri: string): Promise<void> {
    await MongoHelper.connect(uri);
  }

  public start(): void {
    const server = this.app.listen(this.port, () => {
      console.info(`Server listening on port: ${this.port}`);
    });

    this.server = server;
  }

  public async shutdown(): Promise<void> {
    await MongoHelper.disconnect();
    this.server.close();
  }
}
