import { useNavigate } from "react-router-dom";

function OrderReceivedPage() {
  const navigator = useNavigate();
  return (
    <div>
      <h1>We’ve Got Your Order!</h1>
      <button onClick={() => navigator("/home")}>HOME</button>
    </div>
  );
}

export default OrderReceivedPage;
