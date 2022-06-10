import { ProductWithQuantity } from "../orders/types";
import { Product } from "../products/types";

export function removeNullOrUndefined(update){
    for (const key in update) {
        if (update[key] === null || update[key] === undefined) {
          delete update[key];
        }
      }
      return update
}

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }

export  function createOrderedProductsList(productIdsAndQuantity,productsArray:Product[]):ProductWithQuantity[]{
    let map : Map<number,number> = new Map();
    for(let curr of productIdsAndQuantity){
        map.set(parseInt(curr.id),parseInt(curr.quantity))
    }

    return productsArray.map(product => {
        return {product,quantity:map.get(product.id) ?? 0}
    })
}
