import { Router } from "express";
import { getPayment, postPayment } from "@/controllers/payment-controller";
import { authenticateToken, validateQuery, validateBody } from "@/middlewares";
import { ticketIdSchema } from "@/schemas/ticketId-schema";

import { paymentSchema } from "@/schemas/payment-schema";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", validateQuery(ticketIdSchema), getPayment)
  .post("/process", validateBody(paymentSchema), postPayment);

export { paymentRouter };
