import { IProduct } from './product.interface';

export interface IOrder {
  nameClient: string;
  table: string;
  creationTime: Date;
  products: IProduct[];
}
