import { UserData } from "./user-data";

export class Review{
  
  id: number;
  therapistId:number;
  userData:UserData;
  bookingId: string; 
  content: string;
  rating:number;
  date:any;
}