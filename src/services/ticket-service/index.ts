import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";

async function getTicketsTypesServices() {
  const getTicketsTypes = await ticketRepository.getTicketTypesRepository();
  return getTicketsTypes;
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
  const insertNewTicket = await ticketRepository.insertTicket(enrollment.id, ticketTypeId);
  return insertNewTicket;
}

const ticketService = {
  postTicket,
  getTickets,
  getTicketsTypesServices

};
export default ticketService;

