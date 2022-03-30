import { MongoHelper } from "@/infra/database/mongodb/mongo-helper";
import { ServerHelper } from "@/main/server/server";
import faker from "@faker-js/faker";

import { Application } from "express";
import { Collection } from "mongodb";
import request from "supertest";

describe("Authentication routes", () => {
  let usersCollection: Collection;
  let app: Application;
  const strongPassword = faker.internet.password(
    16,
    false,
    /[a-zA-Z0-9!@#$%^&*]/,
    "aZ0@"
  );

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
        password: strongPassword,
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("result", true);
      expect(response.body).toHaveProperty("name", "vinicius");
      expect(response.body).toHaveProperty("accessToken");
    });

    it("Should return 400 if the request is invalid", async () => {
      const response = await request(app).post("/api/signup").send({
        name: faker.name.findName(),
        password: strongPassword,
      });

      expect(response.status).toBe(400);
    });
  });
});
