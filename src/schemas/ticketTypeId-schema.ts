import joi from "joi";

export const ticketTypeSchema = joi.object({
  ticketTypeId: joi.number().required().min(0)
}); 
