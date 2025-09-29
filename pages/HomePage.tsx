
import React from 'react';
import { Event } from '../types';
import EventCard from '../components/EventCard';

interface HomePageProps {
  events: Event[];
  onEventClick: (eventId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ events, onEventClick }) => {
  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-text-primary mb-4">The Future of Ticketing is Here.</h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Experience high-demand events without the chaos. Powered by Solana and Raiku Protocol for a fair, fast, and crash-proof ticketing experience.
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onEventClick={onEventClick} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
