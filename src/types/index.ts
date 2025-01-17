export interface Comedian {
    _id: string;
    name: string;
    isActive: boolean;
    cities: {
      name: string;
      votes: number;
    }[];
  }
  
  export interface VotingSession {
    isActive: boolean;
    endTime: string;
    cities: string[];
  }
  
  export interface User {
    username: string;
    isAdmin: boolean;
  }