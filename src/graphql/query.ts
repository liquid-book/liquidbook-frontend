import { gql } from "graphql-request";

export const placeOrderEvents = gql` query placeOrderEvents{
    placeOrder(orderBy: timestamp, orderDirection: desc) {
        id
        user
        tick
        is_busy
        volume
        timestamp
    }
}`

export const insertOrderEvents = gql` query insertOrderEvents{
    insertOrder(orderBy: timestamp, orderDirection: desc) {
        id
        user
        tick
        is_busy
        volume
        timestamp
    }
}`

export const insertOrderEventPages = gql` query insertOrderEventPages {
    insertOrderPage() {
        items
        pageInfo
        totalCount
    }
}`

export const insertOrderEventFilter = gql` query insertOrderEventFilter {
    insertOrderFilter() {
        AND
        OR
        id
        id_not
        id_in
        id_not_in
        id_contains
        id_not_contains
        id_starts_with
        id_ends_with
        id_not_starts_with
        id_not_ends_with
        user
        user_not
        user_in
        user_not_in
        user_contains
        user_not_contains
        user_starts_with
        user_ends_with
        user_not_starts_with
        user_not_ends_with
        tick
        tick_not
        tick_in
        tick_not_in
        tick_gt
        tick_lt
        tick_gte
        tick_lte
        is_buy
        is_buy_not
        is_buy_in
        is_buy_not_in
        volume
        volume_not
        volume_in
        volume_not_in
        volume_gt
        volume_lt
        volume_gte
        volume_lte
        timestamp
        timestamp_not
        timestamp_in
        timestamp_not_in
        timestamp_gt
        timestamp_lt
        timestamp_gte
        timestamp_lte
    }
}`

export const updateOrderEvents = gql` query updateOrderEvents{
    updateOrder(orderBy: timestamp, orderDirection: desc) {
        id
        tick
        order_index
        volume
        timestamp
    }
}`

export const updateOrderEventPage = gql` query updateOrderEventPage {
    updateOrderPage() {
        items
        pageInfo
        totalCount
    }
}`

export const updateOrderEventFilter = gql` query updateOrderEventFilter {
    updateOrderFilter() {
        AND
        OR
        id
        id_not
        id_in
        id_not_in
        id_contains
        id_not_contains
        id_starts_with
        id_ends_with
        id_not_starts_with
        id_not_ends_with
        tick
        tick_not
        tick_in
        tick_not_in
        tick_gt
        tick_lt
        tick_gte
        tick_lte
        order_index
        order_index_not
        order_index_in
        order_index_not_in
        order_index_gt
        order_index_lt
        order_index_gte
        order_index_lte
        volume
        volume_not
        volume_in
        volume_not_in
        volume_gt
        volume_lt
        volume_gte
        volume_lte
        timestamp
        timestamp_not
        timestamp_in
        timestamp_not_in
        timestamp_gt
        timestamp_lt
        timestamp_gte
        timestamp_lte
    }
}`

export const setTickDataEvents = gql` query setTickDataEvents{
    setTickData(orderBy: timestamp, orderDirection: desc) {
        id
        tick
        is_busy
        volume
        is_existing_order
        timestamp
    }
}`

export const setTickDataEventPage = gql` query setTickDataEventPage {
    setTickDataPage() {
        items
        pageInfo
        totalCount
    }
}`

export const setTickDataEventFilter = gql` query setTickDataEventFilter {
    setTickDataFilter() {
        AND
        OR
        id
        id_not
        id_in
        id_not_in
        id_contains
        id_not_contains
        id_starts_with
        id_ends_with
        id_not_starts_with
        id_not_ends_with
        tick
        tick_not
        tick_in
        tick_not_in
        tick_gt
        tick_lt
        tick_gte
        tick_lte
        is_buy
        is_buy_not
        is_buy_in
        is_buy_not_in
        volume
        volume_not
        volume_in
        volume_not_in
        volume_gt
        volume_lt
        volume_gte
        volume_lte
        is_existing_order
        is_existing_order_not
        is_existing_order_in
        is_existing_order_not_in
        timestamp
        timestamp_not
        timestamp_in
        timestamp_not_in
        timestamp_gt
        timestamp_lt
        timestamp_gte
        timestamp_lte
    }
}`

// export const setCurrentTickEvents = gql`
//   query setCurrentTickEvents($id: String!) {
//     setCurrentTick(id: $id, orderBy: timestamp, orderDirection: desc) {
//       id
//       tick
//       timestamp
//     }
//   }
// `;

export const SET_CURRENT_TICK_EVENTS = gql`
  query SetCurrentTickEvents($id: String!) {
    setCurrentTick(id: $id, orderBy: timestamp, orderDirection: desc) {
      id
      tick
      timestamp
    }
  }
`;

export const setCurrentTickEvents = gql` query setCurrentTickEvents{
    setCurrentTick(orderBy: timestamp, orderDirection: desc) {
        id
        tick
        timestamp
    }
}`

export const setCurrentTickEventPage = gql` query setCurrentTickEventPage {
    setCurrentTickPage() {
        items
        pageInfo
        totalCount
    }
}`

export const setCurrentTickEventFilter = gql` query setCurrentTickEventFilter {
    setCurrentTickFilter() {
        AND
        OR
        id
        id_not
        id_in
        id_not_in
        id_contains
        id_not_contains
        id_starts_with
        id_ends_with
        id_not_starts_with
        id_not_ends_with
        tick
        tick_not
        tick_in
        tick_not_in
        tick_gt
        tick_lt
        tick_gte
        tick_lte
        timestamp
        timestamp_not
        timestamp_in
        timestamp_not_in
        timestamp_gt
        timestamp_lt
        timestamp_gte
        timestamp_lte
    }
}`

export const flipTickEvents = gql` query flipTickEvents{
    flipTick(orderBy: timestamp, orderDirection: desc) {
        id
        tick
        timestamp
    }
}`

export const ticks = gql` query ticks{
    getTick(orderBy: timestamp, orderDirection: desc) {
        id
        tick
        is_busy
        volume
        timestamp
    }
}`

export const orders = gql` query orders{
    getOrder(orderBy: timestamp, orderDirection: desc) {
        id
        user
        tick
        is_busy
        is_market
        is_filled
        volume
        filled_volume
        timestamp
    }
}`