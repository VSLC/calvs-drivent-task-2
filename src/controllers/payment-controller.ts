import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

import httpStatus from "http-status";
import paymentService from "@/services/payment-service";

import { Payment } from "@/protocols";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const { userId } = req;

  try {
    const paymentResult = await paymentService.getPaymentByTicketId(ticketId, userId);
    return res.status(httpStatus.OK).send(paymentResult);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const payment: Payment = req.body;
  try {
    const doPayment = await paymentService.createPayment(userId, payment);
    return res.status(httpStatus.OK).send(doPayment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

