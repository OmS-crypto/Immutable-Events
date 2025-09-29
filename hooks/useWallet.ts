
import { useState, useCallback } from 'react';
import { Wallet } from '../types';

export const useWallet = (): Wallet => {
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const connect = useCallback(async () => {
    // Simulate wallet connection popup delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Generate a mock public key
    const mockKey = 'User' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setPublicKey(mockKey);
  }, []);

  const disconnect = useCallback(() => {
    setPublicKey(null);
  }, []);

  return { publicKey, connect, disconnect };
};
