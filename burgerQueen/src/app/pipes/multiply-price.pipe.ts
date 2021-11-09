import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplyPrice'
})
export class MultiplyPricePipe implements PipeTransform {

  transform(value: number, quantity: number): unknown {
    return value* quantity;
  }

}
