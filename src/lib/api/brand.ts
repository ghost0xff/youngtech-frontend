"use server";

import { HttpClient, Result } from "./http";
import fromApi, { url } from "./utils";

export interface Brand {
    id: number,
    name: string,
}

export async function brandFromProduct(attr: string | number): Promise<Result<Brand>> {
  const type: "id" | "name" = typeof attr === "number" ? "id" : "name";
  const http = new HttpClient(); 
  const rs = http
          .get<Brand>(url(`/brands`, 
          [
            { name: "type", value: type },
            { name: "attr", value: typeof attr === 'number' ? attr.toString() : attr}
          ]
          ), { cache: "no-store" }  )
return rs;
}