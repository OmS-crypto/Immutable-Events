
import { Event } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: 'solana-summit-2024',
    name: 'Solana Summit 2024',
    organizer: 'Solana Foundation',
    date: '2024-09-20T10:00:00Z',
    location: 'Lisbon, Portugal',
    description: 'The biggest Solana event of the year. Join developers, creators, and enthusiasts for three days of talks, workshops, and networking.',
    imageUrl: 'https://picsum.photos/seed/summit/1200/800',
    ticketTiers: [
      { id: 'ss-ga', name: 'General Admission', price: 2, total: 5000, sold: 4500 },
      { id: 'ss-vip', name: 'VIP Pass', price: 5, total: 500, sold: 495 },
      { id: 'ss-dev', name: 'Developer Pass', price: 1, total: 1000, sold: 850 },
    ],
  },
  {
    id: 'raiku-rave',
    name: 'Raiku Protocol Rave',
    organizer: 'Raiku Labs',
    date: '2024-10-15T22:00:00Z',
    location: 'Berlin, Germany',
    description: 'An exclusive underground music event celebrating the launch of the Raiku Protocol. Experience guaranteed entry with our crash-proof ticketing system.',
    imageUrl: 'https://picsum.photos/seed/rave/1200/800',
    ticketTiers: [
      { id: 'rr-early', name: 'Early Bird', price: 0.5, total: 1000, sold: 980 },
      { id: 'rr-ga', name: 'General Admission', price: 1, total: 2000, sold: 1500 },
      { id: 'rr-backstage', name: 'Backstage Access', price: 3, total: 100, sold: 99 },
    ],
  },
  {
    id: 'nft-art-basel',
    name: 'NFT Art Basel Showcase',
    organizer: 'Digital Art Collective',
    date: '2024-11-05T12:00:00Z',
    location: 'Miami, USA',
    description: 'A curated exhibition of the finest digital art minted on the Solana blockchain. Meet the artists and collect exclusive pieces.',
    imageUrl: 'https://picsum.photos/seed/art/1200/800',
    ticketTiers: [
      { id: 'ab-day', name: 'Day Pass', price: 1.5, total: 3000, sold: 1200 },
      { id: 'ab-weekend', name: 'Weekend Pass', price: 3.5, total: 1500, sold: 500 },
      { id: 'ab-collector', name: 'Collector\'s VIP', price: 10, total: 200, sold: 150 },
    ],
  },
];
