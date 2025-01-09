import { gql } from "graphql-request";

// Add the correct query here
export const placeOrderEventss = gql`
  query GetOrderHistory {
    placeOrderEventss {
      items {
        volume
        user
        timestamp
        tick
        remaining_volume
        order_index
        is_market
        is_buy
        id
      }
    }
  }
`;

export const tickss = gql`
  query GetTicks {
    tickss {
      items {
        id
        is_buy
        tick
        timestamp
        volume
      }
    }
  }
`;

export const setCurrentTickEventss = gql`
  query setCurrentTickEventss {
    setCurrentTickEventss {
      items {
        id
        tick
        timestamp
      }
    }
  }
`;