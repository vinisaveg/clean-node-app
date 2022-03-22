import { HttpResponse } from "@/presentation/protocols/http";

export interface Controller<T, Y> {
  handle: (request: T) => Promise<HttpResponse<Y>>;
}
