export interface Trade {
  id: number;
  isBuyerMaker: boolean;
  price: string;
  quantity: string;
  quoteQuantity: string;
  timestamp: number;
}

export interface Depth {
  bids: [string, string][];
  asks: [string, string][];
  lastUpdateId: string;
}

export interface Ticker {
  firstPrice: string;
  high: string;
  lastPrice: string;
  low: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  trades: string;
  volume: string;
}

export interface TradeData {
  E: number; // Event time
  T: number; // Trade ID
  a: string; // Ask order ID
  b: string; // Bid order ID
  e: string; // Event type (e.g., "trade")
  m: boolean; // Is the buyer the maker?
  p: string; // Price
  q: string; // Quantity
  s: string; // Symbol
  t: number; // Trade timestamp
}

export interface TradeMessage {
  data: TradeData;
  stream: string;
}

export interface TickerData {
  E: number; // Event time
  V: string; // 24 Volume
  c: string; // Last trade price
  e: string; // Event type (e.g., "ticker")
  h: string; // High price
  l: string; // Low price
  n: number; // Number of trades
  o: string; // Open price
  s: string; // Symbol
  v: string; // Total volume
}

export interface TickerMessage {
  data: TickerData;
  stream: string;
}

export interface DepthData {
  E: number; // Event time
  T: number; // Trade ID
  U: number; // First update ID in event
  a: [string, string][]; // Asks: price and quantity
  b: [string, string][]; // Bids: price and quantity
  e: string; // Event type (e.g., "depth")
  s: string; // Symbol
  u: number; // Final update ID in event
}

export interface DepthMessage {
  data: DepthData;
  stream: string;
}

export enum IncomingMessage {
  ticker = "ticker",
  depth = "depth",
  trade = "trade",
}
