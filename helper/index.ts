// Helper functions
export const calculatePrice = (tick: string): number => {
  return Math.pow(1.0001, parseInt(tick));
};

export const formatDate = (timestamp: string): string => {
  return new Date(parseInt(timestamp) * 1000).toLocaleString();
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};