import React from 'react';
import { SolanaIcon } from './icons/Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-text-secondary">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <SolanaIcon className="h-6 w-6 text-primary" />
          <p className="font-bold text-lg">Immutable Events</p>
        </div>
        <p>Powered by Solana & the Raiku Protocol for a crash-proof experience.</p>
        <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} Immutable Events. All Rights Reserved.</p>
        <p className="mt-4 text-xs text-gray-400">made by om p</p>
      </div>
    </footer>
  );
};

export default Footer;