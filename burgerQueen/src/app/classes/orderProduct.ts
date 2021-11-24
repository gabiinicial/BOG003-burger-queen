export class Product {

  nameProduct: string = '';
  price: number = 0;
  count: number = 0;

 toFirebase(){
   return{
    nameProduct: this.nameProduct,
    price: this.price,
    count: this.count,
 }

}
}
