import { prisma } from "@/config";

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

async function insertTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: "RESERVED"
    },
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
