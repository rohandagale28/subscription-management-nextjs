import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(6, "user name atleast 6 charater long")
  .regex(/^[a-zA-Z0-9_]+$/, "user name should not contain any special character")
