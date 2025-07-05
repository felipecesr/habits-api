import { validationResult, Result, ValidationError } from "express-validator";
import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  errors: ValidationError[];
}

export const handleInputErrors = (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};
