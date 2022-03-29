import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ControllerSpy implements Controller<any, any> {
  request: any;

  handle(request: any): Promise<HttpResponse<any>> {
    this.request = request;

    return Promise.resolve({
      statusCode: 200,
      body: {
        anyField: "any",
      },
    });
  }
}
