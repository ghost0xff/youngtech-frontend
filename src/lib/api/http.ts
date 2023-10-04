
import { ProductImage } from "./product";

export interface Result<T> {
    value?: T,
    error: Error | null
}

export class HttpClient {

    constructor() {}

    async get<T>(url: string, reqOptions?: RequestInit): Promise<Result<T>> {
        try {
          const resp = await fetch(url, reqOptions);
          if(!resp.status.toString().startsWith("2")) {
            return {
              error: Error("Got a non OK response")
            }
          }
          const v:T = await resp.json() as T;
          return {
            value: v,
            error: null
          }
        } catch(err) {
            return {
              error: Error("Couldn't send request")
            }
        }
    }

}

