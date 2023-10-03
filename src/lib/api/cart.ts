'use server'

import { Session } from "next-auth";
import { getSafeServerSession } from "../auth/security";
import { Product } from "./product";
import fromApi, { bodyFromParams, url } from "./utils";

interface ShoppingCart {
}

export interface CartItem {
    id: number,
    product: Product,
    quantity: number,
    // createdAt: string,
    // updatedAt: string
}
enum CartErrors {
    NotLoggedIn = "Possibly need to be logged in to access cart or client error",
    FailedConnnection = "Couldn't connect to api to fetch items",
    FailedRequest = "Couldn't modify item, possibly out of stock, bad client req or some 500s error"
}


export async function calcTotal(items: CartItem[]): Promise<number> {
  let total = 0
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const price = item.product.price * item.quantity;
    total += price;
  }
  return total;
}


export async function cartItems(): Promise<CartItem[]>{
  const session: Session | null = await getSafeServerSession();
  if(session) {
    const accessToken = session.user.accessToken;
    try {
      const rs = await fetch(fromApi("/shopping-cart/items"), {
        cache: "no-store",
        method: "GET",
        headers: {
           "Authorization": `Bearer ${accessToken}`
        },
      });
      if(!rs.ok) {
        throw Error(CartErrors.FailedRequest);
      }
      const items: CartItem[] = await rs.json()
      return items;
    } catch (error) {
      console.error(CartErrors.FailedConnnection, error);
    }
  }
  return [];
  // throw Error(CartErrors.NotLoggedIn)
}


export async function addItem(productId: number, quantity: number): Promise<CartItem | null> {
  const session: Session | null = await getSafeServerSession();
  if(session) {
    const accessToken = session.user.accessToken;
    try {
      const rs = await fetch(fromApi("/shopping-cart/items"), {
        cache: "no-store",
        method: "POST",
        headers: {
           "Authorization": `Bearer ${accessToken}`,
           'Content-Type': 'application/x-www-form-urlencoded'

        },
        body: bodyFromParams([
          {name: "pid", value: productId.toString()},
          {name: "quantity", value: quantity.toString()}
        ])
      });
      if(rs.status !== 201) {
        // return null;
        throw Error(CartErrors.FailedRequest)
      }
      const item: CartItem = await rs.json();
      return item;
    } catch (error) {
      console.error(CartErrors.FailedConnnection, error);
      // return null
    }
  }
  throw Error(CartErrors.NotLoggedIn)
}

export async function removeItem(productId: number, quantity: number) {
  const session: Session | null = await getSafeServerSession();
  if(session) {
    const accessToken = session.user.accessToken;
    try {
      const apiUrl =  url("/shopping-cart/items", [
          {name: "pid", value: productId.toString()},
          {name: "quantity", value: quantity.toString()}
      ]);

      const rs = await fetch(apiUrl, {
        cache: "no-store",
        method: "DELETE",
        headers: {
           "Authorization": `Bearer ${accessToken}`
        },
      });
      if(rs.status !== 204) {
        throw Error(CartErrors.FailedRequest);
      }
      return;
    } catch (error) {
      console.error(CartErrors.FailedConnnection, error);
    }
  }
  throw Error(CartErrors.NotLoggedIn)
}


