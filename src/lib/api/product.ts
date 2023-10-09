'use server';

import { HttpClient, } from "./http";
import fromApi, { url } from "./utils";

export interface Product {
    id: number
    name: string,
    price: number,
    stock: number,
    description?: string,
    discountPercentage: number,
    images?: ProductImage[]
}

export interface ProductImage {
    id: number,
    main: boolean,
    originalName?: string,
    mimeType?: string,
    sizeInBytes?: number
}


// TODO: how to NOT create this obj on each server action
export async function prods(): Promise<Product[] | null> {
  const http = new HttpClient(); 
  return  http
          .get<Product[]>(fromApi(`/products`),
            {
              // cache: "no-store",
              next: {revalidate: 120}
            } 
          )
}


export async function prodInfo(attr: number | string): Promise<Product | null> {
  const type: "id" | "name" = typeof attr === "number" ? "id" : "name";
  const http = new HttpClient();
  return await http
          .get<Product>(fromApi(`/products/${attr}?type=${type}` ), { cache: "no-store" });
}


export async function relatedProds(attr: number | string): Promise<Product[]> {
  const type: "id" | "name" = typeof attr === "number" ? "id" : "name";
  const rs = await fetch(fromApi(`/products/${attr}/related?type=${type}`), {
    cache: "no-store",
  });
  const prods:Product[] = await rs.json();
  return prods;
}

export async function prodImages(attr: number | string): Promise<ProductImage[] | null> {
  const type: "id" | "name" = typeof attr === "number" ? "id" : "name";
  const http = new HttpClient();
  const rs = await http.get<ProductImage[]>(url(`/products/${attr}/images`,
  [{ name: "type", value: type }]), 
                         {
    cache: "no-store",
  });
    return rs;
  }


export async function prodImageMain(id: number ): Promise<ProductImage> {
  const rs = await fetch(url(`/products/${id}/images/main`), {
    cache: "no-store",
  });
  const image: ProductImage = await rs.json();
  return image
}
