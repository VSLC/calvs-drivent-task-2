import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function getTicketTypesRepository() {
  return await prisma.ticketType.findMany();
}

async function searchUserTicket(enrollmentId: number) {
  return await prisma.ticket.findFirst({
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

async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    },
    include: {
      TicketType: true
    }
  });
}

async function updateStatus(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: "PAID"
    }
  });
}

const ticketRepository = {
  getTicketTypesRepository,
  searchUserTicket,
  insertTicket,
  findTicketById,
  updateStatus
};
export default ticketRepository;
