import { ValidationError } from "class-validator";
import { Field } from "../exceptions/http-exception.exception";

export const compileValidationErrors = (validationError: ValidationError[]): Field[] => {
  return validationError.map(error => {
    return {
      property: error.property,
      errors: Object.values(error.constraints!)
    };
  });
}