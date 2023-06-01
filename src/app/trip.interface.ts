export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  maxSeats: number;
  price: number;
  shortDesc: string;
  imageLink: string[];
  currency: string;
  likes: number;
  dislikes: number;
}
