import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodAny, ZodError } from "zod";
import log from "../utils/logger";

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error: any) {
    log.error(`There's been an error in %s with code %s - %s`,
      validateResource.name,
      error.errors[0].code,
      error.errors[0].message
    );
    return res.status(400).send(error.errors);
  }
};

export default validateResource;