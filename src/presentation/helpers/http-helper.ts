import { HttpResponse } from "@/presentation/protocols/http";

export function badRequest<T>(error: Error): HttpResponse<T> {
  return {
    statusCode: 400,
    body: {
      error: {
        name: error.name,
        message: error.message,
      },
    },
  };
}

export function forbidden<T>(error: Error): HttpResponse<T> {
  return {
    statusCode: 403,
    body: {
      error: {
        name: error.name,
        message: error.message,
      },
    },
  };
}

export function serverError<T>(error: Error): HttpResponse<T> {
  return {
    statusCode: 500,
    body: {
      error: {
        name: error.name,
        message: error.message,
      },
    },
  };
}

export function created<T>(data: T): HttpResponse<T> {
  return {
    statusCode: 201,
    body: data,
  };
}

export function ok<T>(data: T): HttpResponse<T> {
  return {
    statusCode: 200,
    body: data,
  };
}
