import { Router } from "express";
import { getTicketTypes, getTicketsByUser, postTicket } from "@/controllers/ticket-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketTypeSchema } from "@/schemas";
const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTicketsByUser)
  .post("/", validateBody(ticketTypeSchema), postTicket);

export { ticketRouter };
