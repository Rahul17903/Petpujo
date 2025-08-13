import { Link } from "react-router-dom";
export default function OrderSuccess() {
  return (
    <div style={{ padding: "50px" }}>
      <h1>✅ Payment Successful</h1>
      <p>Your order has been placed successfully.</p>
      <Link href="/order">View Orders</Link>
    </div>
  );
}
