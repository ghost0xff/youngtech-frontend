import fromApi from "./utils";
import { Order } from "./order";
import { Sale } from "./sale";
import { User } from "./user";

export interface Person {
    id: number,
    user: User,
    firstnames: string,
    lastnames: string,
    age: number,
    birthdate: string,
    orders: Order[],
    sales: Sale[]
    
}

export async function personInfo(userId: string, access_token: string): Promise<Person | null> {
    "use server";
    const rs: Response = await fetch(
        fromApi(`/person/user/${userId}`),
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
    )
    if (!rs.ok) {
        return null;
    }
    console.log(`response status=> ${rs.status}`)
    return rs.json();
}