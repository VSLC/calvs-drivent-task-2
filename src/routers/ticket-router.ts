import { Router } from "express";
import { getTicketTypes, getTicketsByUser, postTicket } from "@/controllers/ticket-controller";
import { authenticateToken } from "@/middlewares";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTicketsByUser)
  .post("/", postTicket);

export { ticketRouter };
