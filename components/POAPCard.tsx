
import React from 'react';
import { POAP } from '../types';

interface POAPCardProps {
  poap: POAP;
}

const POAPCard: React.FC<POAPCardProps> = ({ poap }) => {
  return (
    <div className="bg-surface rounded-lg overflow-hidden shadow-lg group">
      <div className="aspect-square overflow-hidden">
        <img src={poap.imageUrl} alt={`POAP for ${poap.eventName}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <p className="text-xs text-secondary font-bold uppercase">Proof of Attendance</p>
        <h3 className="text-lg font-bold text-text-primary">{poap.eventName}</h3>
        <p className="text-sm text-text-secondary">{new Date(poap.eventDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default POAPCard;
