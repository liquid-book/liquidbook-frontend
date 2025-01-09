export interface TickEvent {
    id: string;
    tick: number;
    timestamp: number;
  }
  
  export interface TickQueryData {
    setCurrentTick: TickEvent[];
  }
  
  export interface TickQueryVars {
    id: string;
  }