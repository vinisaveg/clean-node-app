import { HttpResponse } from "@/presentation/protocols/http";

export function badRequest<T>(error: Error): HttpResponse<T> {
  return {
    statusCode: 400,
    body: error,
  };
}

export function forbidden<T>(error: Error): HttpResponse<T> {
  return {
    statusCode: 403,
    body: error,
  };
}

export function serverError<T>(error: Error): HttpResponse<T> {
  return {
    statusCode: 500,
    body: error,
  };
}

export function created<T>(data: T): HttpResponse<T> {
  return {
    statusCode: 201,
    body: data,
  };
}
