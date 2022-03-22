import { HttpResponse } from "@/presentation/protocols/http";

export interface Controller<T> {
  handle: (request: T) => Promise<HttpResponse>;
}
