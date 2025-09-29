
import React, { useState } from 'react';
import { Ticket, POAP } from '../types';
import TicketCard from '../components/TicketCard';
import POAPCard from '../components/POAPCard';
import Modal from '../components/Modal';

interface MyTicketsPageProps {
  tickets: Ticket[];
  poaps: POAP[];
  onListTicket: (ticketId: string, price: number) => void;
  onScanTicket: (ticketId: string) => void;
}

const MyTicketsPage: React.FC<MyTicketsPageProps> = ({ tickets, poaps, onListTicket, onScanTicket }) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'poaps'>('tickets');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [listingPrice, setListingPrice] = useState<string>('');

  const openListModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setListingPrice(ticket.price?.toString() || '');
    setIsModalOpen(true);
  };
  
  const handleListSubmit = () => {
    if (selectedTicket && listingPrice) {
      onListTicket(selectedTicket.id, parseFloat(listingPrice));
      setIsModalOpen(false);
      setSelectedTicket(null);
      setListingPrice('');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">My Collection</h1>
      <div className="border-b border-surface mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`${activeTab === 'tickets' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
          >
            My Tickets ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('poaps')}
            className={`${activeTab === 'poaps' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
          >
            POAPs ({poaps.length})
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'tickets' && (
          tickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} onListClick={openListModal} onScanClick={onScanTicket}/>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary py-16">You don't have any tickets yet.</p>
          )
        )}
        {activeTab === 'poaps' && (
          poaps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {poaps.map(poap => (
                <POAPCard key={poap.id} poap={poap} />
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary py-16">You haven't collected any POAPs. Attend an event to get one!</p>
          )
        )}
      </div>

      {isModalOpen && selectedTicket && (
        <Modal onClose={() => setIsModalOpen(false)}>
            <h2 className="text-2xl font-bold mb-4">List Ticket for Sale</h2>
            <p className="text-text-secondary mb-2">{selectedTicket.eventName} - {selectedTicket.tierName}</p>
            <div className="mt-4">
                <label htmlFor="price" className="block text-sm font-medium text-text-secondary">Listing Price (SOL)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="focus:ring-primary focus:border-primary block w-full pl-4 pr-12 sm:text-sm border-gray-600 bg-background rounded-md py-2 text-text-primary"
                        placeholder="0.00"
                        value={listingPrice}
                        onChange={(e) => setListingPrice(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 sm:text-sm">SOL</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    onClick={handleListSubmit}
                    className="bg-primary hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg"
                >
                    List Ticket
                </button>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default MyTicketsPage;
