import Joi from "joi";

export const transactionSchema = Joi.object({
  description: Joi.string().required(),
  value: Joi.number().positive().required(),
  type: Joi.string().valid("in", "out").required()
});