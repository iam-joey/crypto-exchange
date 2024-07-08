import {
  Depth,
  DepthMessage,
  IncomingMessage,
  Ticker,
  TickerMessage,
  Trade,
  TradeData,
  TradeMessage,
} from "./types";

const BASE_URL = "wss://ws.backpack.exchange"; // Replace with your WebSocket URL

interface CallbackInfo {
  callback: (...args: any[]) => void;
  id: string;
}

export class WebSocketManager {
  private ws: WebSocket;
  private static instance: WebSocketManager;
  private bufferedMessages: any = [];
  private callbacks: {
    [type: string]: CallbackInfo[];
  } = {};
  private initialized: boolean = false;
  private id: number;
  private constructor() {
    this.ws = new WebSocket(BASE_URL);
    this.id = 1;
    this.init();
    this.bufferedMessages = [];
    this.initialized = false;
  }

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return this.instance;
  }

  init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessages.forEach((message: any) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const type = message.data.e;
      if (this.callbacks[type]) {
        this.callbacks[type].forEach(({ callback }) => {
          if (type == IncomingMessage.ticker) {
            let message: TickerMessage = JSON.parse(event.data);
            const data: Partial<Ticker> = {
              lastPrice: message.data.c,
              high: message.data.h,
              low: message.data.l,
              volume: message.data.v,
              quoteVolume: message.data.V,
              symbol: message.data.s,
            };

            callback(data);
          }
          if (type == IncomingMessage.depth) {
            let message: DepthMessage = JSON.parse(event.data);

            const data: Partial<Depth> = {
              asks: message.data.a,
              bids: message.data.b,
            };

            callback(data);
          }
          if (type == IncomingMessage.trade) {
            let message: TradeMessage = JSON.parse(event.data);

            const data: Partial<Trade> = {
              isBuyerMaker: message.data.m,
              price: message.data.p,
              quantity: message.data.q,
              timestamp: message.data.E,
            };

            callback(data);
          }
        });
      }
    };
  }

  sendMessage(message: any) {
    const messageToSend = {
      ...message,
      id: this.id++,
    };
    if (!this.initialized) {
      this.bufferedMessages.push(message);
      return;
    }
    this.ws.send(JSON.stringify(messageToSend));
  }

  registerCallBack(
    type: string,
    callback: (...args: any[]) => void,
    id: string
  ) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({
      callback,
      id,
    });
  }

  deRegisterCallback(type: string, id: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type].findIndex(
        (callback) => callback.id === id
      );
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}
