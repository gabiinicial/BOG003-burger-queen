import { Product } from "./orderProduct";

export class Order {
  nameClient: string = '';
  table: string = '';
  creationTime: Date = new Date(Date.now());
  endDate!: Date ;
  products: Product[] = [];
  id:string = "";
  status: string= '';
}
