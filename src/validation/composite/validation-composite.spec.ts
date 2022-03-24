import { ValidationSpy } from "@/presentation/controllers/sign-up/test/validation-spy";
import { MissingFieldError } from "@/presentation/errors/missing-field-error";
import { ValidationComposite } from "@/validation/composite/validation-composite";

import faker from "@faker-js/faker";

describe("Composite validation", () => {
  it("Should return null if all validations pass", () => {
    const field = faker.database.column();
    const validationSpies: Array<ValidationSpy> = [
      new ValidationSpy(),
      new ValidationSpy(),
    ];

    const sut = new ValidationComposite(validationSpies);

    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toBe(null);
  });

  it("Should return an error if a validation fails", () => {
    const field = faker.database.column();
    const validationSpies: Array<ValidationSpy> = [
      new ValidationSpy(),
      new ValidationSpy(),
    ];

    const sut = new ValidationComposite(validationSpies);

    validationSpies[1].error = new MissingFieldError(field);

    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toEqual(validationSpies[1].error);
  });
});
