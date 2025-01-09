export interface OrderEvent {
    volume: string;
    user: string;
    timestamp: string;
    tick: string;
    remaining_volume: string;
    order_index: string;
    is_market: boolean;
    is_buy: boolean;
    id: string;
  }
  
  export interface OrderHistoryResponse {
    placeOrderEventss: {
      items: OrderEvent[];
    }
  }