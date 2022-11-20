import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketService from "@/services/ticket-service";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const resultGetTicketsType = await ticketService.getTicketsTypesServices();
    return res.status(httpStatus.OK).send(resultGetTicketsType);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicketsByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const findUserTicket = await ticketService.getTickets(userId);
    return res.status(httpStatus.OK).send(findUserTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId: number = req.body.ticketTypeId;

  try {
    const insertTicket = await ticketService.postTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(insertTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

