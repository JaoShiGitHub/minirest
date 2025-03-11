import { useState } from "react";

function HomePage() {
  const handleMenuBtn = () => {};
  return (
    <div>
      <header>
        <h1>MINIREST</h1>
        <p>Welcome to Minirest</p>
      </header>
      <button onClick={handleMenuBtn}>MENU</button>
    </div>
  );
}

export default HomePage;
