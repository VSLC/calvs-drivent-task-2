import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import { Ticket } from "@prisma/client";

async function getTicketsTypesServices() {
  const getTicketsTypes = await ticketRepository.getTicketTypesRepository();
  return getTicketsTypes;
}

async function getTickets(userId: number) {
  const confirmedEnrollment = await confirmEnrollment(userId);

  const tickets = await ticketRepository.searchUserTicket(confirmedEnrollment.id);
  if (!tickets) {
    throw notFoundError();
  }
  return tickets;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const confirmedEnrollment = await confirmEnrollment(userId);
  const newTicketObject: Omit<Ticket, "id" | "createdAt" | "updatedAt"> = { enrollmentId: confirmedEnrollment.id, ticketTypeId, status: "RESERVED" };
  const insertNewTicket = await ticketRepository.insertTicket(newTicketObject);
  return insertNewTicket;
}

async function confirmEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  return enrollment;
}

export async function validateEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    return null;
  }
  return enrollment.id;
}

const ticketService = {
  postTicket,
  getTickets,
  getTicketsTypesServices

};
export default ticketService;

