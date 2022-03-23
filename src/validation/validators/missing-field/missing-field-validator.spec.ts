import { MissingFieldValidator } from "@/validation/validators/missing-field/missing-field-validator";
import { MissingFieldError } from "@/presentation/errors/missing-field-error";

import faker from "@faker-js/faker";

describe("Missing Field validator", () => {
  it("Should return a MissingFieldError if validation fails", () => {
    const field = faker.database.column();
    const sut = new MissingFieldValidator(field);

    const error = sut.validate({ invalidFiled: faker.random.word() });

    expect(error).toEqual(new MissingFieldError(field));
  });

  it("Should return null if validation succeeds", () => {
    const field = faker.database.column();
    const sut = new MissingFieldValidator(field);

    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toBe(null);
  });
});
