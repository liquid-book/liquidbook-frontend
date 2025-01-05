export interface TickData {
    id: string;
    is_buy: boolean;
    tick: string;
    timestamp: string;
    volume: string;
  }
  
  export interface QueryResponse {
    tickss: {
      items: TickData[];
    }
  }