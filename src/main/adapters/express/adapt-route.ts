import { Controller } from "@/presentation/protocols/controller";

import { Request, Response } from "express";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const adaptRoute = (controller: Controller<any, any>) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };

    const httpResponse = await controller.handle(request);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
