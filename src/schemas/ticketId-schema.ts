import joi from "joi";

export const ticketIdSchema = joi.object({
  ticketId: joi.number().min(0).required()
});
