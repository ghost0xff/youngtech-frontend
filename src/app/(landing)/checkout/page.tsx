import { CartItem, cartItems } from "@/lib/api/cart";

export default async function CheckoutPage() {
  const items: CartItem[] = await cartItems();
  console.log(items);
  return (
    <>
      {items.map((item) => (
        <>
          <p>{item.id}</p>
          <p>{item.quantity}</p>
          <p>{item.product.name}</p>
          <p>{item.product.price}</p>
        </>
      ))}
    </>
  );
}
