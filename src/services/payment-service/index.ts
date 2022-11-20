import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import { validateEnrollment } from "@/services/ticket-service";
import { Payment, PaymentData } from "@/protocols";

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const thereIsTicket = await ticketRepository.findTicketById(ticketId);
  if (!thereIsTicket) {
    throw notFoundError();
  }
  const enrollment = await validateEnrollment(userId);
  if (thereIsTicket.enrollmentId !== enrollment) {
    throw unauthorizedError();
  }
  const searchPayment = await paymentRepository.findPaymentByTicket(thereIsTicket.id);
  return searchPayment;
}

async function createPayment(userId: number, payment: Payment) {
  const thereIsTicket = await ticketRepository.findTicketById(payment.ticketId);
  if (!thereIsTicket) {
    throw notFoundError();
  }
  const confirmEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (thereIsTicket.enrollmentId !== confirmEnrollment.id) {
    throw unauthorizedError();
  }

  const currentPayment: PaymentData = {
    ticketId: payment.ticketId,
    value: thereIsTicket.TicketType.price,
    cardIssuer: payment.cardData.issuer,
    cardLastDigits: payment.cardData.number.toString().slice(-4)
  };

  const insertPayment = await paymentRepository.insertPayment(currentPayment);
  const updateStatusOfTicket = await ticketRepository.updateStatus(thereIsTicket.id);
  return insertPayment;
}

const paymentService = {
  getPaymentByTicketId,
  createPayment
};

export default paymentService;
