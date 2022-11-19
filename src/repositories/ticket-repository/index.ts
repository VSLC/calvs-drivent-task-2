import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function getTicketTypesRepository() {
  return await prisma.ticketType.findMany();
}

async function searchUserTicket(enrollmentId: number) {
  return await prisma.ticket.findMany({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true,
    }
  });
}

async function insertTicket(obj: Omit<Ticket, "id" | "createdAt" | "updatedAt">) {
  return prisma.ticket.create({
    data: obj,
    include: {
      TicketType: true
    }
  });
}

const ticketRepository = {
  getTicketTypesRepository,
  searchUserTicket,
  insertTicket
};
export default ticketRepository;
