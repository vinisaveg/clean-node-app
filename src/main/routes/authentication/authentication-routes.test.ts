import { MongoHelper } from "@/infra/database/mongodb/mongo-helper";
import { ServerHelper } from "@/main/server/server";

import { Application } from "express";
import { Collection } from "mongodb";
import request from "supertest";

describe("Authentication routes", () => {
  let usersCollection: Collection;
  let app: Application;

  beforeAll(async () => {
    const serverHelper = new ServerHelper(3000);
    await serverHelper.init(process.env.MONGODB_TEST_URI as string);
    app = serverHelper.app;

    usersCollection = MongoHelper.getCollection("users");
  });

  afterAll(async () => {
    await usersCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  describe("/signup route", () => {
    it("Should sign up a new user", async () => {
      const response = await request(app).post("/api/signup").send({
        name: "vinicius",
        email: "vinicius@test.com",
        password: "abC12&*c5F@0",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("result", true);
      expect(response.body).toHaveProperty("name", "vinicius");
      expect(response.body).toHaveProperty("accessToken");
    });
  });
});
