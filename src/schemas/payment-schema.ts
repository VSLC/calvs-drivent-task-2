import joi from "joi";

export const paymentSchema = joi.object({
  ticketId: joi.number().required(),
  cardData: joi.object({
    issuer: joi.string().required(),
    number: joi.number().required(),
    name: joi.string().required(),
    expirationDate: joi.string().required(),
    cvv: joi.number().required(),
  }).required(),
});
