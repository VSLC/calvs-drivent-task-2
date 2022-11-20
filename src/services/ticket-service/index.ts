import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import { Ticket } from "@prisma/client";

async function getTicketsTypesServices() {
  const getTicketsTypes = await ticketRepository.getTicketTypesRepository();
  return getTicketsTypes;
}

export async function validateEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    return null;
  }
  return enrollment.id;
}

async function getTickets(userId: number) {
  const getUserEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!getUserEnrollment) {
    throw notFoundError();
  }
  const getUserTickets = await ticketRepository.searchUserTicket(getUserEnrollment.id);
  if (getUserTickets.length === 0) {
    throw notFoundError();
  }
  return getUserTickets;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const obj: Omit<Ticket, "id" | "createdAt" | "updatedAt"> = { enrollmentId: enrollment.id, ticketTypeId, status: "RESERVED" };
  const insertNewTicket = await ticketRepository.insertTicket(obj);
  return insertNewTicket;
}

const ticketService = {
  postTicket,
  getTickets,
  getTicketsTypesServices

};
export default ticketService;

