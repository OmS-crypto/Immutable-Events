
import React, { useState } from 'react';
import { Event, Ticket, TicketTier, Wallet } from '../types';

interface EventDetailsPageProps {
  event: Event;
  onBuyTicket: (event: Event, tierId: string) => Promise<Ticket>;
  wallet: Wallet;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = ({ event, onBuyTicket, wallet }) => {
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [isBuying, setIsBuying] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  
  const handleBuyClick = async (tier: TicketTier) => {
    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }
    setSelectedTier(tier);
    setIsBuying(true);
    setPurchaseStatus('pending');
    try {
      await onBuyTicket(event, tier.id);
      setPurchaseStatus('success');
    } catch (error) {
      setPurchaseStatus('error');
    }
  };
  
  const ProgressBar: React.FC<{ sold: number, total: number }> = ({ sold, total }) => {
    const percentage = (sold / total) * 100;
    return (
      <div className="w-full bg-gray-600 rounded-full h-2.5">
        <div 
            className="bg-secondary h-2.5 rounded-full" 
            style={{ width: `${percentage}%` }}>
        </div>
      </div>
    );
  };

  const eventDate = new Date(event.date);

  if (isBuying) {
    return (
        <div className="text-center py-20 flex flex-col items-center">
            {purchaseStatus === 'pending' && (
                <>
                    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-primary mb-6"></div>
                    <h2 className="text-3xl font-bold">Processing Your Transaction</h2>
                    <p className="text-text-secondary mt-2">Your ticket purchase is being processed on the Solana blockchain via Raiku Protocol. <br/>This ensures your transaction is fair and will not fail.</p>
                </>
            )}
            {purchaseStatus === 'success' && (
                 <>
                    <svg className="w-32 h-32 text-secondary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h2 className="text-4xl font-bold text-secondary">Purchase Successful!</h2>
                    <p className="text-text-secondary mt-2">Your NFT ticket has been minted to your wallet.</p>
                    <button onClick={() => setIsBuying(false)} className="mt-8 bg-primary text-white font-bold py-3 px-6 rounded-lg">View My Tickets</button>
                </>
            )}
            {purchaseStatus === 'error' && (
                 <>
                    <svg className="w-32 h-32 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h2 className="text-4xl font-bold text-red-500">Purchase Failed</h2>
                    <p className="text-text-secondary mt-2">Something went wrong. Please try again.</p>
                    <button onClick={() => setIsBuying(false)} className="mt-8 bg-primary text-white font-bold py-3 px-6 rounded-lg">Back to Event</button>
                </>
            )}
        </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <img src={event.imageUrl} alt={event.name} className="w-full h-auto object-cover rounded-2xl shadow-2xl" />
        </div>
        <div className="lg:col-span-2 bg-surface p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-extrabold mb-2 text-text-primary">{event.name}</h1>
          <p className="text-lg text-text-secondary mb-4">by {event.organizer}</p>
          <div className="space-y-3 text-text-secondary">
             <p><strong>Date:</strong> {eventDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
             <p><strong>Time:</strong> {eventDate.toLocaleTimeString(undefined, {timeStyle: 'short'})}</p>
             <p><strong>Location:</strong> {event.location}</p>
          </div>
          <p className="mt-6 text-text-secondary">{event.description}</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Mint Your NFT Ticket</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.ticketTiers.map(tier => {
            const isSoldOut = tier.sold >= tier.total;
            return (
              <div key={tier.id} className={`bg-surface p-6 rounded-lg shadow-md border-2 ${isSoldOut ? 'border-gray-600' : 'border-primary/50'}`}>
                <h3 className="text-2xl font-bold text-primary">{tier.name}</h3>
                <p className="text-3xl font-bold my-4">{tier.price} SOL</p>
                <ProgressBar sold={tier.sold} total={tier.total} />
                <p className="text-sm text-text-secondary mt-2">{tier.sold} / {tier.total} sold</p>
                <button 
                  onClick={() => handleBuyClick(tier)}
                  disabled={isSoldOut}
                  className={`mt-6 w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 ${isSoldOut ? 'bg-gray-500 cursor-not-allowed' : 'bg-secondary text-background hover:bg-green-300'}`}
                >
                  {isSoldOut ? 'Sold Out' : 'Buy Ticket'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
