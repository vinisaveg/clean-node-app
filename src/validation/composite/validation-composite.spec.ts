import { ValidationSpy } from "@/presentation/controllers/sign-up/test/validation-spy";
import { MissingFieldError } from "@/presentation/errors/missing-field-error";
import { ValidationComposite } from "@/validation/composite/validation-composite";

import faker from "@faker-js/faker";

type SutTypes = {
  validationSpies: Array<ValidationSpy>;
  field: string;
  sut: ValidationComposite;
};

const makeSut = (): SutTypes => {
  const validationSpies = [new ValidationSpy(), new ValidationSpy()];
  const field = faker.database.column();
  const sut = new ValidationComposite(validationSpies);

  return {
    validationSpies,
    field,
    sut,
  };
};

describe("Composite validation", () => {
  it("Should return null if all validations pass", () => {
    const { field, sut } = makeSut();

    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toBe(null);
  });

  it("Should return an error if a validation fails", () => {
    const { field, validationSpies, sut } = makeSut();

    validationSpies[1].error = new MissingFieldError(field);

    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toEqual(validationSpies[1].error);
  });

  it("Should return first error when more errors occur", () => {
    const { field, validationSpies, sut } = makeSut();

    validationSpies[0].error = new MissingFieldError(field);
    validationSpies[1].error = new Error("Some other error");

    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toEqual(validationSpies[0].error);
  });
});
