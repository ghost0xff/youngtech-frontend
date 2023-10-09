
import { ProductImage } from "./product";

// export interface Result<T> {
//     value?: T,
//     error: Error | undefined
// }

export class HttpClient {

    constructor() {}

    async get<T>(url: string, reqOptions?: RequestInit): Promise<T | null> {
        try {
          const resp = await fetch(url, reqOptions);
          // console.log(resp)
          if(!resp.status.toString().startsWith("2")) {
            // console.log(`status => ${resp.status}`)
            throw Error()
          }
          const v:T = await resp.json() as T;
          return v
        } catch(err) {
          console.log("error while talking to API")
          throw Error()
        }
    }

    async post<T>(url: string, reqOptions?: RequestInit): Promise<T | null> {
        try {
          const resp = await fetch(url, {
            method: "POST",
            ...reqOptions,
          });
          // console.log(resp)
          if(!resp.status.toString().startsWith("2")) {
            // console.log(`status => ${resp.status}`)
            throw Error()
          }
          const v:T = await resp.json() as T;
          return v
        } catch(err) {
            // console.log("error while talking to API")
              throw Error()
        }
    }

    async delete<T>(url: string, reqOptions?: RequestInit): Promise<void> {
        try {
          const resp = await fetch(url, {
            method: "DELETE",
            ...reqOptions,
          });
          // console.log(resp)
          if(!resp.status.toString().startsWith("2")) {
            // console.log(`status => ${resp.status}`)
            throw Error()
          }
          // const v:T = await resp.json() as T;
          return
        } catch(err) {
            // console.log("error while talking to API")
              throw Error()
        }
    }

}

