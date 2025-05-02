import { useNavigate } from "react-router-dom";

function OrderReceivedPage() {
  const navigator = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="font-playfairDisplay font-bold text-4xl">
        We’ve Got Your Order!
      </h1>
      <button
        className="underline font-lato font-bold text-xl"
        onClick={() => navigator("/home")}
      >
        Back to Home page
      </button>
    </div>
  );
}

export default OrderReceivedPage;
