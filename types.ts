
export enum Page {
  Home = 'HOME',
  EventDetails = 'EVENT_DETAILS',
  MyTickets = 'MY_TICKETS',
}

export interface Wallet {
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  total: number;
  sold: number;
}

export interface Event {
  id: string;
  name:string;
  organizer: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  ticketTiers: TicketTier[];
}

export interface Ticket {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  tierName: string;
  imageUrl: string;
  owner: string;
  isListed: boolean;
  price?: number;
  isScanned: boolean;
}

export interface POAP {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  imageUrl: string;
}
