import Joi from "joi";

export const transactionSchema = Joi.object({
  description: Joi.string().trim().required(),
  value: Joi.number().positive().required().precision(2).strict(),
  type: Joi.string().valid("in", "out").required()
});