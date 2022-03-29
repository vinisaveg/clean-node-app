import { ControllerSpy } from "@/main/adapters/express/test/controller-spy";
import { adaptRoute } from "@/main/adapters/express/adapt-route";

import { getMockReq, getMockRes } from "@jest-mock/express";
import faker from "@faker-js/faker";

describe("Express Route adapter", () => {
  it("Should adapt a route request to any controller", async () => {
    const controllerSpy = new ControllerSpy();
    const sut = adaptRoute(controllerSpy);

    const anyParam = faker.random.word();
    const anyField = faker.random.word();

    const { res } = getMockRes();
    const req = getMockReq({
      params: {
        anyParam,
      },
      body: {
        anyField,
      },
    });

    await sut(req, res);

    expect(controllerSpy.request).toEqual({
      anyField,
      anyParam,
    });
  });
});
