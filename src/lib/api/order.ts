'use server'

import { Session } from "next-auth";
import { CartItem } from "./cart"
import { getSafeServerSession } from "../auth/security";
import fromApi, { url } from "./utils";
import { HttpClient } from "./http";

export interface Order {
    id: number,
    total: number,
    subtotal: number,
    totalDiscountCurrency: number
    ivaPercentage: number,
    isDelivered: number,
    isCanceled: number,
    orderDate: string,
    deliveryFrom: string,
    deliveryTo: string,
    items: CartItem[],
}

enum CheckoutErrors {
    NotLoggedIn = "Possibly need to be logged in to acces checkout info or client error",
}

export async function checkOutInfo(): Promise<Order | null> {
  const session: Session | null = await getSafeServerSession();
    if(session) {
        const accessToken = session.user.accessToken;
        const apiUrl =  fromApi("/orders/checkout")
        try {
            const rs = await fetch(apiUrl, {
                cache: "no-store",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            });
            if(rs.status.toString().startsWith("4")) {
                return null;
            }
            if(!rs.status.toString().startsWith("2")) {
                throw new Error("API server error when trying to fetch checkout info");
            }
            const info: Order = await rs.json()
            return info;
        } catch (err) {
            console.log("error while talking to API")
            throw Error()
        }
    }
    throw Error(CheckoutErrors.NotLoggedIn)
}


export async function makeOrder(): Promise<Order | null> {
// export async function makeOrder(milis: number): Promise<void> {
    // console.log("logged info from server")
    // return new Promise(resolve => setTimeout(resolve, milis));

    return null;
}