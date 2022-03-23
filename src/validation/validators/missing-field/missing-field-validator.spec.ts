import { MissingFieldValidator } from "@/validation/validators/missing-field/missing-field-validator";
import { MissingFieldError } from "@/presentation/errors/missing-field-error";

import faker from "@faker-js/faker";

const makeSut = (field: string): MissingFieldValidator => {
  const sut = new MissingFieldValidator(field);
  return sut;
};

describe("Missing Field validator", () => {
  it("Should return a MissingFieldError if validation fails", () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ invalidField: faker.random.word() });

    expect(error).toEqual(new MissingFieldError(field));
  });

  it("Should return null if validation succeeds", () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toBe(null);
  });
});
