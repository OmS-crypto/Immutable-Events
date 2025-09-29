
import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onEventClick: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEventClick }) => {
  const eventDate = new Date(event.date);
  
  return (
    <div 
      className="bg-surface rounded-lg overflow-hidden shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onClick={() => onEventClick(event.id)}
    >
      <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors duration-200">{event.name}</h3>
                <p className="text-sm text-text-secondary mb-2">by {event.organizer}</p>
            </div>
            <div className="text-center bg-gray-700 rounded-md px-2 py-1">
                <p className="text-sm font-bold text-secondary uppercase">{eventDate.toLocaleString('default', { month: 'short' })}</p>
                <p className="text-lg font-extrabold text-text-primary">{eventDate.getDate()}</p>
            </div>
        </div>
        <p className="text-text-secondary mt-2 text-sm">{event.location}</p>
        <p className="text-text-secondary mt-4 h-12 overflow-hidden text-ellipsis">{event.description}</p>
        <button className="mt-4 w-full bg-primary text-white font-bold py-2 px-4 rounded-lg group-hover:bg-purple-500 transition-all duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
