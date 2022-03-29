export type HttpResponse<T> = {
  statusCode: number;
  body: T | error;
};

type error = {
  error: {
    name: string;
    message: string;
  };
};
