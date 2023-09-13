async function delay(milis: number) {
  new Promise((resolve, reject) => {
    setTimeout(() => 1 + 1, milis);
  });
}

export default function OrdersPage() {
  delay(5000);
  return <p>List of blogs</p>;
}
