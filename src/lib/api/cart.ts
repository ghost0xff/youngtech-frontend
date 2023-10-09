'use server'

import { Session } from "next-auth";
import { getSafeServerSession } from "../auth/security";
import { Product } from "./product";
import fromApi, { bodyFromParams, url } from "./utils";
import { HttpClient } from "./http";

interface ShoppingCart {
}
export interface CartItem {
    id: number,
    product: Product,
    quantity: number,
}
enum CartErrors {
    NotLoggedIn = "Possibly need to be logged in to access cart or client error",
    FailedConnnection = "Couldn't connect to api to fetch items",
    FailedRequest = "Couldn't modify item, possibly out of stock, bad client req or some 500s error"
}


// export async function calcTotal(items: CartItem[]): Promise<number> {
// //   for (let index = 0; index < items.length; index++) {
//     const item = items[index];
//     const prod: Product = item.product;
//     let price = product.price;
//     if(prod.discountPercentage > 0) {
//       price -= product.price / 100 * product.discountPercentage
//     }
//     total += price * item.quantity;
//   }
//   return total;
// }



export async function cartItems(): Promise<CartItem[] | null>{
  const session: Session | null = await getSafeServerSession();
  if(session) {
    const accessToken = session.user.accessToken;
    const http = new HttpClient();
    return http.get<CartItem[]>(fromApi("/shopping-cart/items") , 
    { 
        cache: "no-store",
        method: "GET",
        headers: {
           "Authorization": `Bearer ${accessToken}`
        },
    });
  }
  return [];
}

export async function addItem(productId: number, quantity: number): Promise<CartItem | null> {
  const session: Session | null = await getSafeServerSession();
  if(session) {
    const accessToken = session.user.accessToken;
    const http = new HttpClient();
    return http.post<CartItem>(fromApi("/shopping-cart/items") , 
    { 
        cache: "no-store",
        headers: {
           "Authorization": `Bearer ${accessToken}`,
           'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyFromParams([
          {name: "pid", value: productId.toString()},
          {name: "quantity", value: quantity.toString()}
        ])
    });
  }
  throw Error(CartErrors.NotLoggedIn)
}

export async function removeItem(productId: number, quantity: number) {
  const session: Session | null = await getSafeServerSession();
  if(session) {
    const accessToken = session.user.accessToken;
      const apiUrl =  url("/shopping-cart/items", [
          {name: "pid", value: productId.toString()},
          {name: "quantity", value: quantity.toString()}
      ]);
      const http = new HttpClient();
      const rs = await http.delete(apiUrl, {
        cache: "no-store",
        headers: {
           "Authorization": `Bearer ${accessToken}`
        },
      });
    return
  }
  throw Error(CartErrors.NotLoggedIn)
}


