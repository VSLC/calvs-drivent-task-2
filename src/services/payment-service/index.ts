import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import { validateEnrollment } from "@/services/ticket-service";
import { Payment, PaymentData } from "@/protocols";

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticket = await confirmTicket(ticketId);
  const enrollment = await validateEnrollment(userId);
  if (ticket.enrollmentId !== enrollment) {
    throw unauthorizedError();
  }
  const searchPayment = await paymentRepository.findPaymentByTicket(ticket.id);
  return searchPayment;
}

async function createPayment(userId: number, payment: Payment) {
  const ticket = await confirmTicket(payment.ticketId);
  const enrollment = await validateEnrollment(userId);
  if (ticket.enrollmentId !== enrollment) {
    throw unauthorizedError();
  }

  const currentPayment: PaymentData = {
    ticketId: payment.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: payment.cardData.issuer,
    cardLastDigits: payment.cardData.number.toString().slice(-4)
  };

  const insertPayment = await paymentRepository.insertPayment(currentPayment);
  const updateStatusOfTicket = await ticketRepository.updateStatus(ticket.id);
  return insertPayment;
}

async function confirmTicket(ticketId: number) {
  const thereIsTicket = await ticketRepository.findTicketById(ticketId);
  if (!thereIsTicket) {
    throw notFoundError();
  }
  return thereIsTicket;
}

const paymentService = {
  getPaymentByTicketId,
  createPayment
};

export default paymentService;
