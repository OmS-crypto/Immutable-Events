
import React, { useState, useCallback, useEffect } from 'react';
import { Page, Event, Ticket, POAP, Wallet } from './types';
import { MOCK_EVENTS } from './constants';
import { useWallet } from './hooks/useWallet';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import MyTicketsPage from './pages/MyTicketsPage';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [userPOAPs, setUserPOAPs] = useState<POAP[]>([]);
  
  const wallet: Wallet = useWallet();

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const viewEventDetails = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      navigateTo(Page.EventDetails);
    }
  };

  const buyTicket = useCallback((event: Event, tierId: string) => {
    return new Promise<Ticket>((resolve) => {
      const tier = event.ticketTiers.find(t => t.id === tierId);
      if (!tier) throw new Error("Ticket tier not found");

      const newTicket: Ticket = {
        id: `ticket-${Date.now()}`,
        eventId: event.id,
        eventName: event.name,
        eventDate: event.date,
        tierName: tier.name,
        imageUrl: event.imageUrl,
        owner: wallet.publicKey || 'unknown',
        isListed: false,
        price: tier.price,
        isScanned: false
      };
      
      setTimeout(() => {
        setUserTickets(prev => [...prev, newTicket]);
        setEvents(prevEvents => prevEvents.map(e => {
            if (e.id === event.id) {
                return {
                    ...e,
                    ticketTiers: e.ticketTiers.map(t => {
                        if (t.id === tierId) {
                            return {...t, sold: t.sold + 1};
                        }
                        return t;
                    })
                };
            }
            return e;
        }));
        resolve(newTicket);
      }, 1500); // Simulate transaction time
    });
  }, [wallet.publicKey]);

  const listTicketForSale = (ticketId: string, price: number) => {
      setUserTickets(prev => prev.map(t => t.id === ticketId ? {...t, isListed: true, price} : t));
      // In a real app, this would also add it to a public marketplace list
  };
  
  const scanTicket = (ticketId: string) => {
      const ticket = userTickets.find(t => t.id === ticketId);
      if(ticket && !ticket.isScanned) {
        setUserTickets(prev => prev.map(t => t.id === ticketId ? {...t, isScanned: true} : t));
        
        // Mint a POAP
        const newPOAP: POAP = {
          id: `poap-${Date.now()}`,
          eventId: ticket.eventId,
          eventName: ticket.eventName,
          eventDate: ticket.eventDate,
          imageUrl: `https://picsum.photos/seed/${ticket.eventId}/500`
        };
        setUserPOAPs(prev => [...prev, newPOAP]);
      }
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage events={events} onEventClick={viewEventDetails} />;
      case Page.EventDetails:
        if (selectedEvent) {
          return <EventDetailsPage event={selectedEvent} onBuyTicket={buyTicket} wallet={wallet} />;
        }
        navigateTo(Page.Home);
        return null;
      case Page.MyTickets:
        return <MyTicketsPage tickets={userTickets} poaps={userPOAPs} onListTicket={listTicketForSale} onScanTicket={scanTicket} />;
      default:
        return <HomePage events={events} onEventClick={viewEventDetails} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header wallet={wallet} navigateTo={navigateTo} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
