import { prisma } from "@/config";
import { Payment } from "@prisma/client";
import { PaymentData } from "@/protocols";

async function findPaymentByTicket(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

async function insertPayment(currentPayment: PaymentData) {
  return prisma.payment.create({
    data: currentPayment
  });
}

const paymentRepository = {
  findPaymentByTicket,
  insertPayment

};
export default paymentRepository;
