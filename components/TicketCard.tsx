
import React, { useState } from 'react';
import { Ticket } from '../types';
import { QrCodeIcon, CheckCircleIcon } from './icons/Icons';
import Modal from './Modal';


interface TicketCardProps {
  ticket: Ticket;
  onListClick: (ticket: Ticket) => void;
  onScanClick: (ticketId: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onListClick, onScanClick }) => {
    const [showQr, setShowQr] = useState(false);

    const handleScan = () => {
        onScanClick(ticket.id);
        setShowQr(false); // Close modal after scanning
    }

    return (
        <>
            <div className={`bg-surface rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${ticket.isScanned ? 'opacity-60' : ''}`}>
                <img src={ticket.imageUrl} alt={ticket.eventName} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-xl font-bold">{ticket.eventName}</h3>
                    <p className="text-sm text-text-secondary">{new Date(ticket.eventDate).toLocaleDateString()}</p>
                    <p className="mt-2 bg-primary/20 text-primary text-sm font-bold inline-block px-3 py-1 rounded-full">{ticket.tierName}</p>
                    
                    {ticket.isListed && (
                        <div className="mt-3 text-center bg-yellow-500/20 text-yellow-300 py-1 rounded-md">
                            Listed for {ticket.price} SOL
                        </div>
                    )}
                    
                    {ticket.isScanned && (
                         <div className="mt-4 flex items-center justify-center text-secondary font-bold p-2 bg-secondary/10 rounded-lg">
                            <CheckCircleIcon className="w-6 h-6 mr-2" />
                            <span>Checked In</span>
                        </div>
                    )}

                    {!ticket.isScanned && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                             <button
                                onClick={() => setShowQr(true)}
                                className="w-full bg-secondary text-background font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                            >
                                <QrCodeIcon className="w-5 h-5 mr-2"/>
                                Show QR
                            </button>
                            <button
                                onClick={() => onListClick(ticket)}
                                disabled={ticket.isListed}
                                className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-600"
                            >
                                {ticket.isListed ? 'Listed' : 'List for Sale'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {showQr && !ticket.isScanned && (
                <Modal onClose={() => setShowQr(false)}>
                    <div className="text-center p-4">
                        <h2 className="text-2xl font-bold mb-4">{ticket.eventName}</h2>
                        <p className="text-text-secondary mb-4">Present this QR code at the venue entrance.</p>
                        <div className="bg-white p-4 inline-block rounded-lg">
                             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticket.id}`} alt="QR Code" />
                        </div>
                        <button onClick={handleScan} className="mt-6 bg-primary text-white font-bold py-2 px-8 rounded-lg">
                            Simulate Scan
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default TicketCard;
