
import React from 'react';
import { Page, Wallet } from '../types';
import { SolanaIcon, TicketIcon } from './icons/Icons';

interface HeaderProps {
  wallet: Wallet;
  navigateTo: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ wallet, navigateTo }) => {
  const { publicKey, connect, disconnect } = wallet;

  return (
    <header className="bg-surface shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigateTo(Page.Home)}
        >
          <SolanaIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Immutable Events</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <button
            onClick={() => navigateTo(Page.Home)}
            className="text-text-secondary hover:text-primary transition-colors duration-200 font-medium"
          >
            Events
          </button>
          {publicKey && (
             <button
              onClick={() => navigateTo(Page.MyTickets)}
              className="flex items-center text-text-secondary hover:text-primary transition-colors duration-200 font-medium"
            >
              <TicketIcon className="h-5 w-5 mr-2" />
              My Tickets
            </button>
          )}
          {publicKey ? (
            <div className="flex items-center space-x-3">
              <span className="bg-gray-700 text-secondary text-sm font-mono px-3 py-1 rounded-full">
                {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
              </span>
              <button
                onClick={disconnect}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              className="bg-primary hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Connect Wallet
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
